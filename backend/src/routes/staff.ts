import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const staffSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  image: z.string().url().optional().or(z.literal('')),
  orderIndex: z.number().optional(),
  published: z.boolean().optional(),
});

const formatStaff = (s: any) => ({
  id: s.id,
  name: s.name,
  role: s.role,
  bio: s.bio,
  image: s.image || undefined,
  orderIndex: s.order_index || 0,
  published: Boolean(s.published),
  createdAt: s.created_at,
  updatedAt: s.updated_at,
});

// Get all staff (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const queryText = publishedOnly
      ? 'SELECT * FROM staff WHERE published = true ORDER BY order_index ASC, created_at DESC'
      : 'SELECT * FROM staff ORDER BY order_index ASC, created_at DESC';
    
    const result = await query(queryText);
    const formatted = result.rows.map(formatStaff);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch staff',
    });
  }
});

// Get published staff only (public)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM staff WHERE published = true ORDER BY order_index ASC, created_at DESC'
    );
    const formatted = result.rows.map(formatStaff);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching published staff:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch staff',
    });
  }
});

// Get single staff member by id (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM staff WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found',
      });
    }

    const formatted = formatStaff(result.rows[0]);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch staff member',
    });
  }
});

// Create staff member (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = staffSchema.parse(req.body);
    
    const id = `staff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO staff (id, name, role, bio, image, order_index, published)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      id,
      validated.name,
      validated.role,
      validated.bio,
      validated.image || null,
      validated.orderIndex || 0,
      validated.published || false,
    ]);

    const staffResult = await query('SELECT * FROM staff WHERE id = $1', [id]);
    const formatted = formatStaff(staffResult.rows[0]);

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
    
    console.error('Error creating staff member:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create staff member',
    });
  }
});

// Update staff member (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM staff WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found',
      });
    }

    const validated = staffSchema.partial().parse(req.body);
    
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
    if (validated.bio !== undefined) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(validated.bio);
    }
    if (validated.image !== undefined) {
      updates.push(`image = $${paramIndex++}`);
      values.push(validated.image || null);
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
      `UPDATE staff SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const updatedResult = await query('SELECT * FROM staff WHERE id = $1', [req.params.id]);
    const formatted = formatStaff(updatedResult.rows[0]);

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
    
    console.error('Error updating staff member:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update staff member',
    });
  }
});

// Delete staff member (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM staff WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found',
      });
    }

    res.json({
      success: true,
      message: 'Staff member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete staff member',
    });
  }
});

export default router;
