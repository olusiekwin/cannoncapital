import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const impactStorySchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  impact: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  orderIndex: z.number().optional(),
  published: z.boolean().optional(),
});

const formatImpactStory = (s: any) => ({
  id: s.id,
  title: s.title,
  category: s.category,
  location: s.location,
  impact: s.impact,
  description: s.description,
  image: s.image,
  metrics: typeof s.metrics === 'string' ? JSON.parse(s.metrics || '[]') : (s.metrics || []),
  orderIndex: s.order_index || 0,
  published: s.published,
  createdAt: s.created_at,
  updatedAt: s.updated_at,
});

// Get all impact stories (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const queryText = publishedOnly
      ? 'SELECT * FROM impact_stories WHERE published = true ORDER BY order_index ASC, created_at DESC'
      : 'SELECT * FROM impact_stories ORDER BY order_index ASC, created_at DESC';
    
    const result = await query(queryText);
    const formatted = result.rows.map(formatImpactStory);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching impact stories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch impact stories',
    });
  }
});

// Get published impact stories only (public)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM impact_stories WHERE published = true ORDER BY order_index ASC, created_at DESC'
    );
    const formatted = result.rows.map(formatImpactStory);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching published impact stories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch impact stories',
    });
  }
});

// Get single impact story by id (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM impact_stories WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Impact story not found',
      });
    }

    const formatted = formatImpactStory(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching impact story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch impact story',
    });
  }
});

// Create impact story (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = impactStorySchema.parse(req.body);
    
    const id = `impact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO impact_stories (
        id, title, category, location, impact, description, image, metrics, order_index, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      id,
      validated.title,
      validated.category,
      validated.location,
      validated.impact,
      validated.description,
      validated.image,
      JSON.stringify(validated.metrics),
      validated.orderIndex || 0,
      validated.published || false,
    ]);

    const result = await query('SELECT * FROM impact_stories WHERE id = $1', [id]);
    const formatted = formatImpactStory(result.rows[0]);

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
    
    console.error('Error creating impact story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create impact story',
    });
  }
});

// Update impact story (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM impact_stories WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Impact story not found',
      });
    }

    const validated = impactStorySchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (validated.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(validated.title);
    }
    if (validated.category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(validated.category);
    }
    if (validated.location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      values.push(validated.location);
    }
    if (validated.impact !== undefined) {
      updates.push(`impact = $${paramIndex++}`);
      values.push(validated.impact);
    }
    if (validated.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(validated.description);
    }
    if (validated.image !== undefined) {
      updates.push(`image = $${paramIndex++}`);
      values.push(validated.image);
    }
    if (validated.metrics !== undefined) {
      updates.push(`metrics = $${paramIndex++}`);
      values.push(JSON.stringify(validated.metrics));
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
      `UPDATE impact_stories SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const result = await query('SELECT * FROM impact_stories WHERE id = $1', [req.params.id]);
    const formatted = formatImpactStory(result.rows[0]);

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
    
    console.error('Error updating impact story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update impact story',
    });
  }
});

// Delete impact story (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM impact_stories WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Impact story not found',
      });
    }

    res.json({
      success: true,
      message: 'Impact story deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting impact story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete impact story',
    });
  }
});

export default router;

