import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const careerSchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  orderIndex: z.number().optional(),
  published: z.boolean().optional(),
});

const formatCareer = (c: any) => ({
  id: c.id,
  title: c.title,
  department: c.department,
  location: c.location,
  type: c.type,
  description: c.description,
  requirements: c.requirements || undefined,
  responsibilities: c.responsibilities || undefined,
  orderIndex: c.order_index || 0,
  published: c.published,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});

// Get all careers (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const queryText = publishedOnly
      ? 'SELECT * FROM careers WHERE published = true ORDER BY order_index ASC, created_at DESC'
      : 'SELECT * FROM careers ORDER BY order_index ASC, created_at DESC';
    
    const result = await query(queryText);
    const formatted = result.rows.map(formatCareer);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch careers',
    });
  }
});

// Get published careers only (public)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM careers WHERE published = true ORDER BY order_index ASC, created_at DESC'
    );
    const formatted = result.rows.map(formatCareer);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching published careers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch careers',
    });
  }
});

// Get single career by id (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM careers WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Career not found',
      });
    }

    const formatted = formatCareer(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching career:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch career',
    });
  }
});

// Create career (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = careerSchema.parse(req.body);
    
    const id = `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO careers (
        id, title, department, location, type, description, requirements, responsibilities, order_index, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      id,
      validated.title,
      validated.department,
      validated.location,
      validated.type,
      validated.description,
      validated.requirements || null,
      validated.responsibilities || null,
      validated.orderIndex || 0,
      validated.published || false,
    ]);

    const result = await query('SELECT * FROM careers WHERE id = $1', [id]);
    const formatted = formatCareer(result.rows[0]);

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
    
    console.error('Error creating career:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create career',
    });
  }
});

// Update career (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM careers WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Career not found',
      });
    }

    const validated = careerSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (validated.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(validated.title);
    }
    if (validated.department !== undefined) {
      updates.push(`department = $${paramIndex++}`);
      values.push(validated.department);
    }
    if (validated.location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      values.push(validated.location);
    }
    if (validated.type !== undefined) {
      updates.push(`type = $${paramIndex++}`);
      values.push(validated.type);
    }
    if (validated.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(validated.description);
    }
    if (validated.requirements !== undefined) {
      updates.push(`requirements = $${paramIndex++}`);
      values.push(validated.requirements || null);
    }
    if (validated.responsibilities !== undefined) {
      updates.push(`responsibilities = $${paramIndex++}`);
      values.push(validated.responsibilities || null);
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
      `UPDATE careers SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const result = await query('SELECT * FROM careers WHERE id = $1', [req.params.id]);
    const formatted = formatCareer(result.rows[0]);

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
    
    console.error('Error updating career:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update career',
    });
  }
});

// Delete career (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM careers WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Career not found',
      });
    }

    res.json({
      success: true,
      message: 'Career deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete career',
    });
  }
});

export default router;

