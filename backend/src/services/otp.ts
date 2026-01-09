import { query } from '../db/database';
import crypto from 'crypto';

const OTP_EXPIRY_MINUTES = 10; // OTP expires in 10 minutes
const MAX_OTP_ATTEMPTS = 3; // Maximum attempts to verify OTP

/**
 * Generate a random 6-digit OTP
 */
export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Create and store an OTP for an admin user
 */
export async function createOTP(adminId: string): Promise<string> {
  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const otpId = `otp_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;

  // Invalidate any existing unused OTPs for this admin
  await query(
    `UPDATE admin_otps SET used = TRUE WHERE admin_id = $1 AND used = FALSE`,
    [adminId]
  );

  // Create new OTP
  await query(
    `INSERT INTO admin_otps (id, admin_id, otp_code, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [otpId, adminId, otpCode, expiresAt]
  );

  return otpCode;
}

/**
 * Verify an OTP code for an admin user
 */
export async function verifyOTP(adminId: string, otpCode: string): Promise<boolean> {
  // Find valid, unused OTP
  const result = await query(
    `SELECT id, expires_at FROM admin_otps
     WHERE admin_id = $1 AND otp_code = $2 AND used = FALSE
     ORDER BY created_at DESC
     LIMIT 1`,
    [adminId, otpCode]
  );

  if (result.rows.length === 0) {
    return false;
  }

  const otp = result.rows[0];
  const expiresAt = new Date(otp.expires_at);
  const now = new Date();

  // Check if OTP has expired
  if (now > expiresAt) {
    // Mark as used to clean up
    await query(
      `UPDATE admin_otps SET used = TRUE WHERE id = $1`,
      [otp.id]
    );
    return false;
  }

  // Mark OTP as used
  await query(
    `UPDATE admin_otps SET used = TRUE WHERE id = $1`,
    [otp.id]
  );

  return true;
}

/**
 * Clean up expired OTPs (can be called periodically)
 */
export async function cleanupExpiredOTPs(): Promise<void> {
  await query(
    `UPDATE admin_otps SET used = TRUE WHERE expires_at < NOW() AND used = FALSE`
  );
}

/**
 * Get the number of failed OTP attempts for an admin in the last hour
 */
export async function getFailedOTPAttempts(adminId: string): Promise<number> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const result = await query(
    `SELECT COUNT(*) as count FROM admin_otps
     WHERE admin_id = $1 AND created_at > $2 AND used = FALSE`,
    [adminId, oneHourAgo]
  );
  return parseInt(result.rows[0].count) || 0;
}

