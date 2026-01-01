import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const projectSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  value: z.string().optional(),
  status: z.string().min(1),
  duration: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(1),
  heroImage: z.string().url(),
  challenge: z.string().optional(),
  strategy: z.string().optional(),
  outcomes: z.array(z.string()),
  tools: z.array(z.string()),
  isActive: z.boolean().optional(),
  published: z.boolean().optional(),
});

const formatProject = (p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      value: p.value || undefined,
      status: p.status,
      duration: p.duration || undefined,
      location: p.location || undefined,
      description: p.description,
      heroImage: p.hero_image,
      challenge: p.challenge || undefined,
      strategy: p.strategy || undefined,
  outcomes: typeof p.outcomes === 'string' ? JSON.parse(p.outcomes || '[]') : (p.outcomes || []),
  tools: typeof p.tools === 'string' ? JSON.parse(p.tools || '[]') : (p.tools || []),
      isActive: Boolean(p.is_active),
      published: Boolean(p.published),
      createdAt: p.created_at,
      updatedAt: p.updated_at,
});

// Get all projects (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const isActive = req.query.isActive;
    
    let queryText = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;
    
    if (publishedOnly) {
      queryText += ' AND published = true';
    }
    
    if (isActive !== undefined) {
      queryText += ` AND is_active = $${paramIndex++}`;
      params.push(isActive === 'true');
    }
    
    queryText += ' ORDER BY created_at DESC';
    
    const result = await query(queryText, params.length > 0 ? params : undefined);
    const formatted = result.rows.map(formatProject);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

// Get active projects (public)
router.get('/active', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM projects 
      WHERE is_active = true AND published = true
      ORDER BY created_at DESC
    `);
    const formatted = result.rows.map(formatProject);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching active projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

// Get completed projects (public)
router.get('/completed', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM projects 
      WHERE is_active = false AND published = true
      ORDER BY created_at DESC
    `);
    const formatted = result.rows.map(formatProject);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching completed projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

// Get single project by id (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const formatted = formatProject(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
    });
  }
});

// Create project (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = projectSchema.parse(req.body);
    
    const id = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO projects (
        id, title, category, value, status, duration, location,
        description, hero_image, challenge, strategy, outcomes, tools,
        is_active, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `, [
      id,
      validated.title,
      validated.category,
      validated.value || null,
      validated.status,
      validated.duration || null,
      validated.location || null,
      validated.description,
      validated.heroImage,
      validated.challenge || null,
      validated.strategy || null,
      JSON.stringify(validated.outcomes),
      JSON.stringify(validated.tools),
      validated.isActive || false,
      validated.published || false,
    ]);

    const projectResult = await query('SELECT * FROM projects WHERE id = $1', [id]);
    const formatted = formatProject(projectResult.rows[0]);

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
    
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project',
    });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM projects WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const validated = projectSchema.partial().parse(req.body);
    
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
    if (validated.value !== undefined) {
      updates.push(`value = $${paramIndex++}`);
      values.push(validated.value || null);
    }
    if (validated.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(validated.status);
    }
    if (validated.duration !== undefined) {
      updates.push(`duration = $${paramIndex++}`);
      values.push(validated.duration || null);
    }
    if (validated.location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      values.push(validated.location || null);
    }
    if (validated.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(validated.description);
    }
    if (validated.heroImage !== undefined) {
      updates.push(`hero_image = $${paramIndex++}`);
      values.push(validated.heroImage);
    }
    if (validated.challenge !== undefined) {
      updates.push(`challenge = $${paramIndex++}`);
      values.push(validated.challenge || null);
    }
    if (validated.strategy !== undefined) {
      updates.push(`strategy = $${paramIndex++}`);
      values.push(validated.strategy || null);
    }
    if (validated.outcomes !== undefined) {
      updates.push(`outcomes = $${paramIndex++}`);
      values.push(JSON.stringify(validated.outcomes));
    }
    if (validated.tools !== undefined) {
      updates.push(`tools = $${paramIndex++}`);
      values.push(JSON.stringify(validated.tools));
    }
    if (validated.isActive !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(validated.isActive);
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
      `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const updatedResult = await query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    const formatted = formatProject(updatedResult.rows[0]);

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
    
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update project',
    });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete project',
    });
  }
});

export default router;
