import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { sendContactConfirmation, sendContactNotification } from '../services/email';

const router = Router();

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  inquiryType: z.string().min(1, 'Inquiry type is required'),
  message: z.string().optional(),
});

// Submit contact form
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = contactSchema.parse(req.body);
    
    const id = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(
      `INSERT INTO contact_submissions (
        id, first_name, last_name, email, phone, company, inquiry_type, message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        validated.firstName,
        validated.lastName,
        validated.email,
        validated.phone || null,
        validated.company || null,
        validated.inquiryType,
        validated.message || null
      ]
    );

    // Send confirmation email to user (non-blocking)
    sendContactConfirmation({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      inquiryType: validated.inquiryType,
    }).catch((emailError) => {
      console.error('Failed to send contact confirmation email:', emailError);
    });

    // Send notification email to admin (non-blocking)
    sendContactNotification({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      phone: validated.phone,
      company: validated.company,
      inquiryType: validated.inquiryType,
      message: validated.message,
    }).catch((emailError) => {
      console.error('Failed to send contact notification email:', emailError);
    });

    res.status(201).json({
      success: true,
      message: 'Contact submission received successfully',
      id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
    });
  }
});

// Get all contact submissions (admin only)
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        id,
        first_name as "firstName",
        last_name as "lastName",
        email,
        phone,
        company,
        inquiry_type as "inquiryType",
        message,
        created_at as "createdAt"
      FROM contact_submissions
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions',
    });
  }
});

// Get single contact submission (admin only)
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT 
        id,
        first_name as "firstName",
        last_name as "lastName",
        email,
        phone,
        company,
        inquiry_type as "inquiryType",
        message,
        created_at as "createdAt"
      FROM contact_submissions
      WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submission',
    });
  }
});

export default router;
