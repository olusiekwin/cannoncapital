import { Router, Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { query } from '../db/database';
import { createOTP, verifyOTP } from '../services/otp';
import { sendOTPEmail } from '../services/email';
import { otpRequestRateLimiter, otpVerifyRateLimiter } from '../middleware/rateLimit';

const router = Router();

const otpRequestSchema = z.object({
  email: z.string().email('Valid email is required'),
});

const otpVerifySchema = z.object({
  email: z.string().email('Valid email is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 30;

/**
 * Check if account is locked
 */
async function isAccountLocked(user: any): Promise<boolean> {
  if (!user.locked_until) {
    return false;
  }
  const lockedUntil = new Date(user.locked_until);
  const now = new Date();
  return now < lockedUntil;
}

/**
 * Increment failed login attempts and lock account if needed
 */
async function incrementFailedAttempts(userId: string, currentAttempts: number): Promise<void> {
  const newAttempts = currentAttempts + 1;
  let updateQuery = 'UPDATE admin_users SET failed_login_attempts = $1';
  const params: any[] = [newAttempts, userId];

  if (newAttempts >= MAX_FAILED_ATTEMPTS) {
    const lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000);
    updateQuery += ', locked_until = $2';
    params.push(lockoutUntil);
  }

  updateQuery += ' WHERE id = $' + (params.length);
  await query(updateQuery, params);
}

/**
 * Reset failed login attempts on successful login
 */
async function resetFailedAttempts(userId: string): Promise<void> {
  await query(
    'UPDATE admin_users SET failed_login_attempts = 0, locked_until = NULL WHERE id = $1',
    [userId]
  );
}

// Request OTP for login (step 1: send OTP to email)
router.post('/request-otp', otpRequestRateLimiter, async (req: Request, res: Response) => {
  try {
    const validated = otpRequestSchema.parse(req.body);
    
    // Normalize email to lowercase for consistent comparison
    const normalizedEmail = validated.email.toLowerCase().trim();
    
    // Find user by email
    const result = await query(
      'SELECT * FROM admin_users WHERE LOWER(TRIM(email)) = $1',
      [normalizedEmail]
    );
    
    const user = result.rows[0];
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If the email exists, an OTP has been sent to the registered email.',
      });
    }

    // Check if account is locked
    if (await isAccountLocked(user)) {
      const lockedUntil = new Date(user.locked_until);
      const minutesLeft = Math.ceil((lockedUntil.getTime() - Date.now()) / (1000 * 60));
      return res.status(423).json({
        success: false,
        error: `Account is locked due to too many failed attempts. Please try again in ${minutesLeft} minutes.`,
      });
    }

    // Check if user has email configured
    if (!user.email) {
      return res.status(400).json({
        success: false,
        error: 'Admin email not configured. Please contact system administrator.',
      });
    }

    // Generate and send OTP
    const otpCode = await createOTP(user.id);
    
    // Send OTP via email
    const emailSent = await sendOTPEmail(user.email, otpCode, user.username || user.email);
    
    if (!emailSent) {
      console.error('Failed to send OTP email to:', user.email);
      return res.status(500).json({
        success: false,
        error: 'Failed to send OTP. Please try again later.',
      });
    }

    res.json({
      success: true,
      message: 'OTP has been sent to your registered email address.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error during OTP request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process OTP request',
    });
  }
});

// Verify OTP and complete login (step 2: verify OTP and issue token)
router.post('/verify-otp', otpVerifyRateLimiter, async (req: Request, res: Response) => {
  try {
    const validated = otpVerifySchema.parse(req.body);
    
    // Normalize email to lowercase for consistent comparison
    const normalizedEmail = validated.email.toLowerCase().trim();
    
    // Find user by email
    const result = await query(
      'SELECT * FROM admin_users WHERE LOWER(TRIM(email)) = $1',
      [normalizedEmail]
    );
    
    const user = result.rows[0];
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or OTP',
      });
    }

    // Check if account is locked
    if (await isAccountLocked(user)) {
      const lockedUntil = new Date(user.locked_until);
      const minutesLeft = Math.ceil((lockedUntil.getTime() - Date.now()) / (1000 * 60));
      return res.status(423).json({
        success: false,
        error: `Account is locked due to too many failed attempts. Please try again in ${minutesLeft} minutes.`,
      });
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(user.id, validated.otp);
    
    if (!isValidOTP) {
      await incrementFailedAttempts(user.id, user.failed_login_attempts || 0);
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired OTP',
      });
    }

    // All checks passed - generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Reset failed attempts on successful login
    await resetFailedAttempts(user.id);
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error during OTP verification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP',
    });
  }
});

// Legacy login endpoint (deprecated - password-based login removed)
router.post('/login', async (req: Request, res: Response) => {
  return res.status(400).json({
    success: false,
    error: 'Password-based login is no longer supported. Please use /request-otp and /verify-otp endpoints with email only.',
  });
});

// Verify token
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }
    
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'Invalid or expired token',
        });
      }
      
      res.json({
        success: true,
        data: decoded,
      });
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify token',
    });
  }
});

export default router;
