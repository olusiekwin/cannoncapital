import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const commentSchema = z.object({
  articleSlug: z.string().min(1),
  authorName: z.string().min(1),
  authorEmail: z.string().email(),
  content: z.string().min(1),
  approved: z.boolean().optional(),
});

const formatComment = (c: any) => ({
  id: c.id,
  articleSlug: c.article_slug,
  authorName: c.author_name,
  authorEmail: c.author_email,
  content: c.content,
  approved: Boolean(c.approved),
  createdAt: c.created_at,
});

// Get all comments for an article (public - only approved)
router.get('/article/:slug', async (req: Request, res: Response) => {
  try {
    const approvedOnly = req.query.approved !== 'false';
    const queryText = approvedOnly
      ? 'SELECT * FROM article_comments WHERE article_slug = $1 AND approved = true ORDER BY created_at DESC'
      : 'SELECT * FROM article_comments WHERE article_slug = $1 ORDER BY created_at DESC';
    
    const result = await query(queryText, [req.params.slug]);
    const formatted = result.rows.map(formatComment);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments',
    });
  }
});

// Get approved comments for an article (public)
router.get('/article/:slug/approved', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM article_comments 
      WHERE article_slug = $1 AND approved = true
      ORDER BY created_at DESC
    `, [req.params.slug]);
    const formatted = result.rows.map(formatComment);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching approved comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments',
    });
  }
});

// Create comment (public - requires approval)
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = commentSchema.parse({
      ...req.body,
      approved: false, // Always false for public submissions
    });
    
    const id = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO article_comments (
        id, article_slug, author_name, author_email, content, approved
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      id,
      validated.articleSlug,
      validated.authorName,
      validated.authorEmail,
      validated.content,
      false, // approved = false
    ]);

    const commentResult = await query('SELECT * FROM article_comments WHERE id = $1', [id]);
    const formatted = formatComment(commentResult.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Comment submitted successfully. It will be published after admin approval.',
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
    
    console.error('Error creating comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create comment',
    });
  }
});

// Get all comments (admin only)
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM article_comments
      ORDER BY created_at DESC
    `);
    const formatted = result.rows.map(formatComment);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments',
    });
  }
});

// Update comment (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM article_comments WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
    }

    const validated = commentSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (validated.articleSlug !== undefined) {
      updates.push(`article_slug = $${paramIndex++}`);
      values.push(validated.articleSlug);
    }
    if (validated.authorName !== undefined) {
      updates.push(`author_name = $${paramIndex++}`);
      values.push(validated.authorName);
    }
    if (validated.authorEmail !== undefined) {
      updates.push(`author_email = $${paramIndex++}`);
      values.push(validated.authorEmail);
    }
    if (validated.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(validated.content);
    }
    if (validated.approved !== undefined) {
      updates.push(`approved = $${paramIndex++}`);
      values.push(validated.approved);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update',
      });
    }
    
    values.push(req.params.id);
    
    await query(
      `UPDATE article_comments SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const updatedResult = await query('SELECT * FROM article_comments WHERE id = $1', [req.params.id]);
    const formatted = formatComment(updatedResult.rows[0]);

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
    
    console.error('Error updating comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update comment',
    });
  }
});

// Delete comment (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM article_comments WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
    }

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete comment',
    });
  }
});

export default router;
