import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const faqSchema = z.object({
  category: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  orderIndex: z.number().optional(),
  published: z.boolean().optional(),
});

const formatFAQ = (f: any) => ({
  id: f.id,
  category: f.category,
  question: f.question,
  answer: f.answer,
  orderIndex: f.order_index || 0,
  published: f.published,
  createdAt: f.created_at,
  updatedAt: f.updated_at,
});

// Get all FAQs (public - only published, grouped by category)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const queryText = publishedOnly
      ? 'SELECT * FROM faq_items WHERE published = true ORDER BY category ASC, order_index ASC, created_at ASC'
      : 'SELECT * FROM faq_items ORDER BY category ASC, order_index ASC, created_at ASC';
    
    const result = await query(queryText);
    const formatted = result.rows.map(formatFAQ);

    // Group by category
    const grouped = formatted.reduce((acc: any, faq: any) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.json({
      success: true,
      data: formatted,
      grouped: grouped,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQs',
    });
  }
});

// Get published FAQs only (public, grouped by category)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM faq_items WHERE published = true ORDER BY category ASC, order_index ASC, created_at ASC'
    );
    const formatted = result.rows.map(formatFAQ);

    // Group by category
    const grouped = formatted.reduce((acc: any, faq: any) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.json({
      success: true,
      data: formatted,
      grouped: grouped,
    });
  } catch (error) {
    console.error('Error fetching published FAQs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQs',
    });
  }
});

// Get FAQs by category (public)
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM faq_items WHERE category = $1 AND published = true ORDER BY order_index ASC, created_at ASC',
      [req.params.category]
    );
    const formatted = result.rows.map(formatFAQ);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching FAQs by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQs',
    });
  }
});

// Get single FAQ by id (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM faq_items WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found',
      });
    }

    const formatted = formatFAQ(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQ',
    });
  }
});

// Create FAQ (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = faqSchema.parse(req.body);
    
    const id = `faq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO faq_items (
        id, category, question, answer, order_index, published
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      id,
      validated.category,
      validated.question,
      validated.answer,
      validated.orderIndex || 0,
      validated.published || false,
    ]);

    const result = await query('SELECT * FROM faq_items WHERE id = $1', [id]);
    const formatted = formatFAQ(result.rows[0]);

    res.status(201).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error creating FAQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create FAQ',
    });
  }
});

// Update FAQ (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM faq_items WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found',
      });
    }

    const validated = faqSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (validated.category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(validated.category);
    }
    if (validated.question !== undefined) {
      updates.push(`question = $${paramIndex++}`);
      values.push(validated.question);
    }
    if (validated.answer !== undefined) {
      updates.push(`answer = $${paramIndex++}`);
      values.push(validated.answer);
    }
    if (validated.orderIndex !== undefined) {
      updates.push(`order_index = $${paramIndex++}`);
      values.push(validated.orderIndex);
    }
    if (validated.published !== undefined) {
      updates.push(`published = $${paramIndex++}`);
      values.push(validated.published);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.params.id);

    await query(
      `UPDATE faq_items SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const result = await query('SELECT * FROM faq_items WHERE id = $1', [req.params.id]);
    const formatted = formatFAQ(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error updating FAQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update FAQ',
    });
  }
});

// Delete FAQ (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM faq_items WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found',
      });
    }

    res.json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete FAQ',
    });
  }
});

export default router;

