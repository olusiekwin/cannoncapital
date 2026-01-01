import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const reviewSchema = z.object({
  articleSlug: z.string().min(1, 'Article slug is required'),
  authorName: z.string().min(1, 'Author name is required'),
  authorEmail: z.string().email('Invalid email address'),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(1, 'Content is required'),
  approved: z.boolean().optional(),
});

const formatReview = (r: any) => ({
  id: r.id,
  articleSlug: r.article_slug,
  authorName: r.author_name,
  authorEmail: r.author_email,
  rating: r.rating,
  content: r.content,
  likes: r.likes || 0,
  approved: Boolean(r.approved),
  createdAt: r.created_at,
});

// Get all reviews (public - only approved by default)
router.get('/', async (req: Request, res: Response) => {
  try {
    const articleSlug = req.query.articleSlug as string | undefined;
    const approvedOnly = req.query.approved !== 'false';
    
    let queryText = 'SELECT * FROM article_reviews WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;
    
    if (articleSlug) {
      queryText += ` AND article_slug = $${paramIndex++}`;
      params.push(articleSlug);
    }
    
    if (approvedOnly) {
      queryText += ' AND approved = true';
    }
    
    queryText += ' ORDER BY created_at DESC';
    
    const result = await query(queryText, params.length > 0 ? params : undefined);
    const formatted = result.rows.map(formatReview);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
    });
  }
});

// Get approved reviews for a specific article (public)
router.get('/article/:slug', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM article_reviews 
      WHERE article_slug = $1 AND approved = true
      ORDER BY created_at DESC
    `, [req.params.slug]);
    const formatted = result.rows.map(formatReview);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching article reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
    });
  }
});

// Create review (public - requires approval)
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = reviewSchema.parse({
      ...req.body,
      approved: false, // Always false for public submissions
    });
    
    const id = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO article_reviews (
        id, article_slug, author_name, author_email, rating, content, approved
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      id,
      validated.articleSlug,
      validated.authorName,
      validated.authorEmail,
      validated.rating,
      validated.content,
      false, // approved = false
    ]);

    const reviewResult = await query('SELECT * FROM article_reviews WHERE id = $1', [id]);
    const formatted = formatReview(reviewResult.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. It will be published after admin approval.',
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
    
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create review',
    });
  }
});

// Update review (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM article_reviews WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }

    const validated = reviewSchema.partial().parse(req.body);
    
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
    if (validated.rating !== undefined) {
      updates.push(`rating = $${paramIndex++}`);
      values.push(validated.rating);
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
      `UPDATE article_reviews SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
      values
    );

    const updatedResult = await query('SELECT * FROM article_reviews WHERE id = $1', [req.params.id]);
    const formatted = formatReview(updatedResult.rows[0]);

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
    
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update review',
    });
  }
});

// Like a review (public - uses IP or session identifier)
router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    const userIdentifier = req.headers['x-user-id'] || req.ip || 'anonymous';
    const reviewId = req.params.id;

    // Check if review exists
    const reviewResult = await query('SELECT id FROM article_reviews WHERE id = $1', [reviewId]);
    if (reviewResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }

    // Check if already liked
    const existingResult = await query(`
      SELECT id FROM review_likes 
      WHERE review_id = $1 AND user_identifier = $2
    `, [reviewId, userIdentifier]);

    if (existingResult.rows.length > 0) {
      // Unlike - remove like
      await query('DELETE FROM review_likes WHERE review_id = $1 AND user_identifier = $2', [reviewId, userIdentifier]);
      await query('UPDATE article_reviews SET likes = GREATEST(likes - 1, 0) WHERE id = $1', [reviewId]);
      
      const updatedResult = await query('SELECT likes FROM article_reviews WHERE id = $1', [reviewId]);
      return res.json({
        success: true,
        message: 'Review unliked',
        liked: false,
        likes: updatedResult.rows[0]?.likes || 0,
      });
    }

    // Add like
    const likeId = `rev_like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await query(`
      INSERT INTO review_likes (id, review_id, user_identifier)
      VALUES ($1, $2, $3)
    `, [likeId, reviewId, userIdentifier]);

    // Update review likes count
    await query('UPDATE article_reviews SET likes = likes + 1 WHERE id = $1', [reviewId]);

    const updatedResult = await query('SELECT likes FROM article_reviews WHERE id = $1', [reviewId]);

    res.json({
      success: true,
      message: 'Review liked successfully',
      likes: updatedResult.rows[0]?.likes || 0,
      liked: true,
    });
  } catch (error) {
    console.error('Error liking review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to like review',
    });
  }
});

// Delete review (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('DELETE FROM article_reviews WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete review',
    });
  }
});

export default router;
