import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const articleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  author: z.string().min(1),
  authorRole: z.string().min(1),
  readTime: z.string().min(1),
  heroImage: z.string().url(),
  excerpt: z.string().min(1),
  content: z.array(z.string()),
  relatedTopics: z.array(z.string()),
  published: z.boolean().optional(),
});

const formatArticle = (a: any) => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  category: a.category,
  date: a.date,
  author: a.author,
  authorRole: a.author_role,
  readTime: a.read_time,
  heroImage: a.hero_image,
  excerpt: a.excerpt,
  // Handle JSONB (returns as object) or TEXT (needs parsing)
  content: typeof a.content === 'string' ? JSON.parse(a.content || '[]') : (a.content || []),
  relatedTopics: typeof a.related_topics === 'string' ? JSON.parse(a.related_topics || '[]') : (a.related_topics || []),
  likes: a.likes || 0,
  views: a.views || 0,
  published: a.published,
  createdAt: a.created_at,
  updatedAt: a.updated_at,
});

// Get all articles (public - only published)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const sql = publishedOnly
      ? 'SELECT * FROM articles WHERE published = true ORDER BY date DESC, created_at DESC'
      : 'SELECT * FROM articles ORDER BY date DESC, created_at DESC';
    
    const result = await query(sql);
    const formatted = result.rows.map(formatArticle);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
    });
  }
});

// Get published articles only (public)
router.get('/published', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM articles 
      WHERE published = true 
      ORDER BY date DESC, created_at DESC
    `);

    const formatted = result.rows.map(formatArticle);

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching published articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
    });
  }
});

// Get single article by slug (public - increments views)
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM articles WHERE slug = $1', [req.params.slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    const article = result.rows[0];

    // Increment views
    await query('UPDATE articles SET views = views + 1 WHERE slug = $1', [req.params.slug]);

    const formatted = {
      ...formatArticle(article),
      views: (article.views || 0) + 1,
    };

    res.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
    });
  }
});

// Like an article (public - uses IP or session identifier)
router.post('/:slug/like', async (req: Request, res: Response) => {
  try {
    const userIdentifier = req.headers['x-user-id'] || req.ip || 'anonymous';
    const slug = req.params.slug;

    // Check if already liked
    const existingResult = await query(`
      SELECT id FROM article_likes 
      WHERE article_slug = $1 AND user_identifier = $2
    `, [slug, userIdentifier]);

    if (existingResult.rows.length > 0) {
      const articleResult = await query('SELECT likes FROM articles WHERE slug = $1', [slug]);
      return res.json({
        success: true,
        message: 'Article already liked',
        liked: true,
        likes: articleResult.rows[0]?.likes || 0,
      });
    }

    // Add like
    const likeId = `like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await query(`
      INSERT INTO article_likes (id, article_slug, user_identifier)
      VALUES ($1, $2, $3)
    `, [likeId, slug, userIdentifier]);

    // Update article likes count
    await query('UPDATE articles SET likes = likes + 1 WHERE slug = $1', [slug]);

    const articleResult = await query('SELECT likes FROM articles WHERE slug = $1', [slug]);

    res.json({
      success: true,
      message: 'Article liked successfully',
      likes: articleResult.rows[0]?.likes || 0,
      liked: true,
    });
  } catch (error) {
    console.error('Error liking article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to like article',
    });
  }
});

// Create article (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validated = articleSchema.parse(req.body);
    
    // Check if slug exists
    const existingResult = await query('SELECT id FROM articles WHERE slug = $1', [validated.slug]);
    if (existingResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Article with this slug already exists',
      });
    }
    
    const id = `article_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await query(`
      INSERT INTO articles (
        id, slug, title, category, date, author, author_role, read_time,
        hero_image, excerpt, content, related_topics, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `, [
      id,
      validated.slug,
      validated.title,
      validated.category,
      validated.date,
      validated.author,
      validated.authorRole,
      validated.readTime,
      validated.heroImage,
      validated.excerpt,
      JSON.stringify(validated.content),
      JSON.stringify(validated.relatedTopics),
      validated.published || false,
    ]);

    const articleResult = await query('SELECT * FROM articles WHERE id = $1', [id]);
    const formatted = formatArticle(articleResult.rows[0]);

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
    
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create article',
    });
  }
});

// Update article (admin only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const existingResult = await query('SELECT id FROM articles WHERE id = $1', [req.params.id]);
    
    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    const validated = articleSchema.partial().parse(req.body);
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (validated.slug !== undefined) {
      const conflictResult = await query('SELECT id FROM articles WHERE slug = $1 AND id != $2', [validated.slug, req.params.id]);
      if (conflictResult.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Article with this slug already exists',
        });
      }
      updates.push(`slug = $${paramIndex++}`);
      values.push(validated.slug);
    }
    if (validated.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(validated.title);
    }
    if (validated.category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(validated.category);
    }
    if (validated.date !== undefined) {
      updates.push(`date = $${paramIndex++}`);
      values.push(validated.date);
    }
    if (validated.author !== undefined) {
      updates.push(`author = $${paramIndex++}`);
      values.push(validated.author);
    }
    if (validated.authorRole !== undefined) {
      updates.push(`author_role = $${paramIndex++}`);
      values.push(validated.authorRole);
    }
    if (validated.readTime !== undefined) {
      updates.push(`read_time = $${paramIndex++}`);
      values.push(validated.readTime);
    }
    if (validated.heroImage !== undefined) {
      updates.push(`hero_image = $${paramIndex++}`);
      values.push(validated.heroImage);
    }
    if (validated.excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex++}`);
      values.push(validated.excerpt);
    }
    if (validated.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(JSON.stringify(validated.content));
    }
    if (validated.relatedTopics !== undefined) {
      updates.push(`related_topics = $${paramIndex++}`);
      values.push(JSON.stringify(validated.relatedTopics));
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
    
    updates.push(`updated_at = NOW()`);
    values.push(req.params.id);
    
    await query(`
      UPDATE articles 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
    `, values);

    const updatedResult = await query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    const formatted = formatArticle(updatedResult.rows[0]);

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
    
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update article',
    });
  }
});

// Delete article (admin only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    // Get slug first for cascading deletes
    const articleResult = await query('SELECT slug FROM articles WHERE id = $1', [req.params.id]);
    
    if (articleResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    const slug = articleResult.rows[0].slug;

    // Delete related likes and comments
    await query('DELETE FROM article_likes WHERE article_slug = $1', [slug]);
    await query('DELETE FROM article_comments WHERE article_slug = $1', [slug]);
    
    // Delete article
    await query('DELETE FROM articles WHERE id = $1', [req.params.id]);

    res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete article',
    });
  }
});

export default router;
