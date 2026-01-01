import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { sendNewsletterWelcome, sendNewsletter } from '../services/email';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Subscribe to newsletter
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = newsletterSchema.parse(req.body);
    
    // Check if email already exists
    const existingResult = await query(
      'SELECT id FROM newsletter_subscriptions WHERE email = $1',
      [validated.email]
    );
    
    if (existingResult.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Email is already subscribed',
      });
    }
    
    const id = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(
      `INSERT INTO newsletter_subscriptions (id, email)
       VALUES ($1, $2)`,
      [id, validated.email]
    );

    // Send welcome email (non-blocking - don't fail subscription if email fails)
    sendNewsletterWelcome(validated.email).catch((emailError) => {
      console.error('Failed to send welcome email:', emailError);
      // Log but don't throw - subscription was successful
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    // Handle unique constraint violation (PostgreSQL error code)
    if (error.code === '23505') {
      return res.status(200).json({
        success: true,
        message: 'Email is already subscribed',
      });
    }
    
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to newsletter',
    });
  }
});

// Get all newsletter subscribers (admin only)
router.get('/subscribers', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, email, created_at FROM newsletter_subscriptions ORDER BY created_at DESC',
      []
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscribers',
    });
  }
});

// Send newsletter to all subscribers (admin only)
const sendNewsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
});

router.post('/send', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = sendNewsletterSchema.parse(req.body);

    // Get all subscribers
    const subscribersResult = await query(
      'SELECT email FROM newsletter_subscriptions',
      []
    );

    const subscribers = subscribersResult.rows;
    
    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No subscribers found',
      });
    }

    // Send newsletter to each subscriber
    const results = {
      total: subscribers.length,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Send emails in batches to avoid overwhelming the email server
    const batchSize = 10;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const batchPromises = batch.map(async (subscriber: { email: string }) => {
        try {
          const success = await sendNewsletter(
            subscriber.email,
            validated.subject,
            validated.content
          );
          if (success) {
            results.success++;
          } else {
            results.failed++;
            results.errors.push(`Failed to send to ${subscriber.email}`);
          }
        } catch (error: any) {
          results.failed++;
          results.errors.push(`Error sending to ${subscriber.email}: ${error.message}`);
        }
      });

      await Promise.all(batchPromises);
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    res.json({
      success: true,
      data: results,
      message: `Newsletter sent to ${results.success} of ${results.total} subscribers`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Error sending newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send newsletter',
    });
  }
});

export default router;
