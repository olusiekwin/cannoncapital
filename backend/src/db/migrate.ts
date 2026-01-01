import { query } from './database';
import bcrypt from 'bcryptjs';

console.log('Running database migrations...');

async function runMigrations() {
  try {
    // Create tables
    await query(`
      -- Contact Submissions
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id VARCHAR(255) PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        company VARCHAR(255),
        inquiry_type VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Testimonials
      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        content TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        image TEXT,
        approved BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Article Reviews
      CREATE TABLE IF NOT EXISTS article_reviews (
        id VARCHAR(255) PRIMARY KEY,
        article_slug VARCHAR(255) NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        approved BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Review Likes (track user likes by IP or session)
      CREATE TABLE IF NOT EXISTS review_likes (
        id VARCHAR(255) PRIMARY KEY,
        review_id VARCHAR(255) NOT NULL,
        user_identifier VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(review_id, user_identifier)
      );

      -- Newsletter Subscriptions
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Admin Users
      CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Articles/Insights
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        author_role VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        hero_image TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content JSONB NOT NULL DEFAULT '[]'::jsonb,
        related_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
        likes INTEGER NOT NULL DEFAULT 0,
        views INTEGER NOT NULL DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Services
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        description TEXT NOT NULL,
        hero_image TEXT NOT NULL,
        overview TEXT NOT NULL,
        capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
        approach JSONB NOT NULL DEFAULT '[]'::jsonb,
        stats JSONB NOT NULL DEFAULT '[]'::jsonb,
        icon VARCHAR(255),
        order_index INTEGER DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Projects
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        value VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        duration VARCHAR(255),
        location VARCHAR(255),
        description TEXT NOT NULL,
        hero_image TEXT NOT NULL,
        challenge TEXT,
        strategy TEXT,
        outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
        tools JSONB NOT NULL DEFAULT '[]'::jsonb,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Staff/Leadership
      CREATE TABLE IF NOT EXISTS staff (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image TEXT,
        order_index INTEGER DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Article Likes (track user likes by IP or session)
      CREATE TABLE IF NOT EXISTS article_likes (
        id VARCHAR(255) PRIMARY KEY,
        article_slug VARCHAR(255) NOT NULL,
        user_identifier VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(article_slug, user_identifier)
      );

      -- Article Comments
      CREATE TABLE IF NOT EXISTS article_comments (
        id VARCHAR(255) PRIMARY KEY,
        article_slug VARCHAR(255) NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        approved BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Impact Stories
      CREATE TABLE IF NOT EXISTS impact_stories (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        impact VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
        order_index INTEGER DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Career/Job Postings
      CREATE TABLE IF NOT EXISTS careers (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT,
        responsibilities TEXT,
        order_index INTEGER DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- FAQ Items
      CREATE TABLE IF NOT EXISTS faq_items (
        id VARCHAR(255) PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
      CREATE INDEX IF NOT EXISTS idx_reviews_article_slug ON article_reviews(article_slug);
      CREATE INDEX IF NOT EXISTS idx_reviews_approved ON article_reviews(approved);
      CREATE INDEX IF NOT EXISTS idx_review_likes_review_id ON review_likes(review_id);
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
      CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
      CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
      CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
      CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
      CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
      CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
      CREATE INDEX IF NOT EXISTS idx_staff_published ON staff(published);
      CREATE INDEX IF NOT EXISTS idx_article_likes_slug ON article_likes(article_slug);
      CREATE INDEX IF NOT EXISTS idx_article_comments_slug ON article_comments(article_slug);
      CREATE INDEX IF NOT EXISTS idx_article_comments_approved ON article_comments(approved);
      CREATE INDEX IF NOT EXISTS idx_impact_stories_published ON impact_stories(published);
      CREATE INDEX IF NOT EXISTS idx_careers_published ON careers(published);
      CREATE INDEX IF NOT EXISTS idx_careers_department ON careers(department);
      CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
      CREATE INDEX IF NOT EXISTS idx_faq_items_published ON faq_items(published);
    `);

    // Create default admin user if it doesn't exist
    const defaultAdminUsername = 'admin';
    const defaultAdminPassword = 'admin123'; // Change this in production!

    const existingAdminResult = await query(
      'SELECT id FROM admin_users WHERE username = $1',
      [defaultAdminUsername]
    );

    if (existingAdminResult.rows.length === 0) {
      const passwordHash = bcrypt.hashSync(defaultAdminPassword, 10);
      const adminId = `admin_${Date.now()}`;

      await query(
        `INSERT INTO admin_users (id, username, password_hash)
         VALUES ($1, $2, $3)`,
        [adminId, defaultAdminUsername, passwordHash]
      );

      console.log(`\n✅ Default admin user created:`);
      console.log(`   Username: ${defaultAdminUsername}`);
      console.log(`   Password: ${defaultAdminPassword}`);
      console.log(`   ⚠️  Please change this password in production!\n`);
    }

    console.log('✅ Database migrations completed!');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default runMigrations;
