import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().int().min(1).max(5),
  image: z.string().url().optional().or(z.literal('')),
  approved: z.boolean().optional(),
});

// Helper to format testimonial
const formatTestimonial = (t: any) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  company: t.company || undefined,
  content: t.content,
  rating: t.rating,
  image: t.image || undefined,
  approved: t.approved,
  createdAt: t.created_at,
});

// Get all testimonials (public - only approved)
router.get('/', async (req: Request, res: Response) => {
  try {
    const approvedOnly = req.query.approved !== 'false';
    const sql = approvedOnly
      ? 'SELECT * FROM testimonials WHERE approved = TRUE ORDER BY created_at DESC'
      : 'SELECT * FROM testimonials ORDER BY created_at DESC';
    
    const result = await query(sql);
    const formatted = result.rows.map(formatTestimonial);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials',
    });
  }
});

// Get approved testimonials only (public)
router.get('/approved', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM testimonials 
      WHERE approved = TRUE 
      ORDER BY created_at DESC
    `);

    const formatted = result.rows.map(formatTestimonial);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching approved testimonials:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch approved testimonials',
    });
  }
});

// Create testimonial (public - requires approval)
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = testimonialSchema.parse(req.body);
    
    const id = `testimonial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(
      `INSERT INTO testimonials (
        id, name, role, company, content, rating, image, approved
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        validated.name,
        validated.role,
        validated.company || null,
        validated.content,
        validated.rating,
        validated.image || null,
        false, // Always requires approval
      ]
    );

    const result = await query('SELECT * FROM testimonials WHERE id = $1', [id]);
    const formatted = formatTestimonial(result.rows[0]);

    res.status(201).json({
      success: true,
      data: formatted,
      message: 'Testimonial submitted successfully. It will be published after admin approval.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    
    console.error('Error creating testimonial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create testimonial',
    });
  }
});

// Update testimonial (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM testimonials WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    const validated = testimonialSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (validated.name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(validated.name);
    }
    if (validated.role !== undefined) {
      updates.push(`role = $${paramIndex++}`);
      values.push(validated.role);
    }
    if (validated.company !== undefined) {
      updates.push(`company = $${paramIndex++}`);
      values.push(validated.company || null);
    }
    if (validated.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(validated.content);
    }
    if (validated.rating !== undefined) {
      updates.push(`rating = $${paramIndex++}`);
      values.push(validated.rating);
    }
    if (validated.image !== undefined) {
      updates.push(`image = $${paramIndex++}`);
      values.push(validated.image || null);
    }
    if (validated.approved !== undefined) {
      updates.push(`approved = $${paramIndex++}`);
      values.push(validated.approved);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update',
      });
    }
    
    values.push(req.params.id);
    await query(
      `UPDATE testimonials SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const result = await query('SELECT * FROM testimonials WHERE id = $1', [req.params.id]);
    const formatted = formatTestimonial(result.rows[0]);

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
    
    console.error('Error updating testimonial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update testimonial',
    });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete testimonial',
    });
  }
});

export default router;
