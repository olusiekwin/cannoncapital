import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const serviceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  heroImage: z.string().url(),
  overview: z.string().min(1),
  capabilities: z.array(z.string()),
  approach: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })),
  icon: z.string().optional(),
  orderIndex: z.number().optional(),
  published: z.boolean().optional(),
});

const formatService = (s: any) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle || undefined,
      description: s.description,
      heroImage: s.hero_image,
      overview: s.overview,
  capabilities: typeof s.capabilities === 'string' ? JSON.parse(s.capabilities || '[]') : (s.capabilities || []),
  approach: typeof s.approach === 'string' ? JSON.parse(s.approach || '[]') : (s.approach || []),
  stats: typeof s.stats === 'string' ? JSON.parse(s.stats || '[]') : (s.stats || []),
      icon: s.icon || undefined,
      orderIndex: s.order_index || 0,
      published: Boolean(s.published),
      createdAt: s.created_at,
      updatedAt: s.updated_at,
});

// Get all services (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const queryText = publishedOnly
      ? 'SELECT * FROM services WHERE published = true ORDER BY order_index ASC, created_at DESC'
      : 'SELECT * FROM services ORDER BY order_index ASC, created_at DESC';
    
    const result = await query(queryText);
    const formatted = result.rows.map(formatService);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
    });
  }
});

// Get published services only (public)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM services WHERE published = true ORDER BY order_index ASC, created_at DESC'
    );
    const formatted = result.rows.map(formatService);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching published services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
    });
  }
});

// Get single service by slug (public)
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM services WHERE slug = $1', [req.params.slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    const formatted = formatService(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service',
    });
  }
});

// Create service (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = serviceSchema.parse(req.body);
    
    // Check if slug exists
    const existingResult = await query('SELECT id FROM services WHERE slug = $1', [validated.slug]);
    if (existingResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Service with this slug already exists',
      });
    }
    
    const id = `service_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO services (
        id, slug, title, subtitle, description, hero_image, overview,
        capabilities, approach, stats, icon, order_index, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `, [
      id,
      validated.slug,
      validated.title,
      validated.subtitle || null,
      validated.description,
      validated.heroImage,
      validated.overview,
      JSON.stringify(validated.capabilities),
      JSON.stringify(validated.approach),
      JSON.stringify(validated.stats),
      validated.icon || null,
      validated.orderIndex || 0,
      validated.published || false,
    ]);

    const serviceResult = await query('SELECT * FROM services WHERE id = $1', [id]);
    const formatted = formatService(serviceResult.rows[0]);

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
    
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service',
    });
  }
});

// Update service (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM services WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    const validated = serviceSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (validated.slug !== undefined) {
      const conflictResult = await query('SELECT id FROM services WHERE slug = $1 AND id != $2', [validated.slug, req.params.id]);
      if (conflictResult.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Service with this slug already exists',
        });
      }
      updates.push(`slug = $${paramIndex++}`);
      values.push(validated.slug);
    }
    if (validated.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(validated.title);
    }
    if (validated.subtitle !== undefined) {
      updates.push(`subtitle = $${paramIndex++}`);
      values.push(validated.subtitle || null);
    }
    if (validated.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(validated.description);
    }
    if (validated.heroImage !== undefined) {
      updates.push(`hero_image = $${paramIndex++}`);
      values.push(validated.heroImage);
    }
    if (validated.overview !== undefined) {
      updates.push(`overview = $${paramIndex++}`);
      values.push(validated.overview);
    }
    if (validated.capabilities !== undefined) {
      updates.push(`capabilities = $${paramIndex++}`);
      values.push(JSON.stringify(validated.capabilities));
    }
    if (validated.approach !== undefined) {
      updates.push(`approach = $${paramIndex++}`);
      values.push(JSON.stringify(validated.approach));
    }
    if (validated.stats !== undefined) {
      updates.push(`stats = $${paramIndex++}`);
      values.push(JSON.stringify(validated.stats));
    }
    if (validated.icon !== undefined) {
      updates.push(`icon = $${paramIndex++}`);
      values.push(validated.icon || null);
    }
    if (validated.orderIndex !== undefined) {
      updates.push(`order_index = $${paramIndex++}`);
      values.push(validated.orderIndex);
    }
    if (validated.published !== undefined) {
      updates.push(`published = $${paramIndex++}`);
      values.push(validated.published);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update',
      });
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(req.params.id);
    
    await query(
      `UPDATE services SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const updatedResult = await query('SELECT * FROM services WHERE id = $1', [req.params.id]);
    const formatted = formatService(updatedResult.rows[0]);

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
    
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service',
    });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service',
    });
  }
});

export default router;
