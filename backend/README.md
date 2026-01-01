# Cannon Capital Partners - Backend API

Node.js/Express backend API server for Cannon Capital Partners website.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
# Database (Supabase recommended)
SUPABASE_DB_URL=postgresql://user:password@host:5432/postgres

# Server Configuration
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://www.cannoncapitalpartners.org

# Authentication
JWT_SECRET=your-secret-key-change-in-production

# Email Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=465
SMTP_USER_NEWSLETTER=noreply@cannoncapitalpartners.org
SMTP_PASSWORD_NEWSLETTER=your-password
SMTP_USER_CONTACT=inquiries@cannoncapitalpartners.org
SMTP_PASSWORD_CONTACT=your-password
```

### Database Setup

1. Run migrations to create tables:
```bash
npm run migrate
```

2. (Optional) Seed initial data:
```bash
npm run seed
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### Production

```bash
npm run build
npm start
```

Or use PM2:
```bash
pm2 start dist/index.js --name cannoncapital-backend
pm2 save
```

## 📡 API Endpoints

### Public Endpoints

#### Articles/Insights
- `GET /api/articles` - Get all published articles
- `GET /api/articles/published` - Get published articles only
- `GET /api/articles/:slug` - Get single article (increments views)
- `POST /api/articles/:slug/like` - Like an article

#### Services
- `GET /api/services` - Get all published services
- `GET /api/services/published` - Get published services only
- `GET /api/services/:slug` - Get single service

#### Projects
- `GET /api/projects` - Get all published projects
- `GET /api/projects/active` - Get active projects only
- `GET /api/projects/completed` - Get completed projects only
- `GET /api/projects/:id` - Get single project

#### Testimonials
- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials/approved` - Get approved testimonials only

#### Reviews
- `GET /api/reviews` - Get all approved reviews
- `GET /api/reviews/article/:slug` - Get reviews for an article
- `POST /api/reviews` - Submit a review (requires approval)

#### Comments
- `GET /api/comments/article/:slug/approved` - Get approved comments for an article
- `POST /api/comments` - Submit a comment (requires approval)

#### Contact
- `POST /api/contact` - Submit contact form

#### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter

#### Impact Stories
- `GET /api/impact` - Get all published impact stories
- `GET /api/impact/published` - Get published impact stories only
- `GET /api/impact/:id` - Get single impact story

#### Careers
- `GET /api/careers` - Get all published career postings
- `GET /api/careers/published` - Get published careers only

#### Staff
- `GET /api/staff` - Get all published staff members
- `GET /api/staff/published` - Get published staff only

#### FAQ
- `GET /api/faq` - Get all published FAQs
- `GET /api/faq/published` - Get published FAQs only

### Admin Endpoints (Requires Authentication)

All admin endpoints require a valid JWT token in the `Authorization: Bearer <token>` header.

#### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

#### Admin CRUD Operations
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

Similar endpoints exist for:
- Services (`/api/services`)
- Projects (`/api/projects`)
- Testimonials (`/api/testimonials`)
- Reviews (`/api/reviews`)
- Comments (`/api/comments`)
- Impact Stories (`/api/impact`)
- Careers (`/api/careers`)
- Staff (`/api/staff`)
- FAQ (`/api/faq`)

#### Newsletter Subscriptions
- `GET /api/newsletter/subscribers` - Get all subscribers
- `DELETE /api/newsletter/subscribers/:id` - Delete subscriber

#### Contact Submissions
- `GET /api/contact` - Get all contact submissions

## 🔐 Authentication

Admin authentication uses JWT tokens:

1. Login: `POST /api/auth/login` with `{ username, password }`
2. Receive token in response
3. Include token in subsequent requests: `Authorization: Bearer <token>`

## 📊 Database Schema

Key tables:
- `articles` - Blog posts and insights
- `services` - Service offerings
- `projects` - Project showcases
- `testimonials` - Client testimonials
- `article_reviews` - Article reviews
- `article_comments` - Article comments
- `article_likes` - Article likes tracking
- `impact_stories` - Impact stories
- `careers` - Job postings
- `staff` - Team members
- `faq_items` - FAQ items
- `contact_submissions` - Contact form submissions
- `newsletter_subscriptions` - Newsletter subscribers
- `admin_users` - Admin users

See `src/db/migrate.ts` for complete schema.

## 🔄 Keep Database Active

To prevent Supabase from pausing, use the activity script:

```bash
npm run keep-active
```

Or with PM2:
```bash
pm2 start keep-db-active.ts --interpreter tsx --name db-activity
```

See `KEEP_DB_ACTIVE.md` for details.

## 📧 Email Service

The backend sends emails for:
- Contact form submissions (to inquiries@cannoncapitalpartners.org)
- Newsletter subscription confirmations (welcome emails)

Configure SMTP settings in `.env` file.

## 🛡️ CORS Configuration

CORS is configured to allow requests from:
- Production domain: `https://www.cannoncapitalpartners.org`
- Development: `http://localhost:8080`, `http://localhost:5173`
- Set via `FRONTEND_URL` environment variable

## 🔒 Security

- JWT authentication for admin endpoints
- Password hashing with bcrypt
- Input validation with Zod
- SQL injection protection via parameterized queries
- CORS enabled for specified origins
- Environment variables for sensitive data

## 🐛 Troubleshooting

### Database Connection
- Verify `SUPABASE_DB_URL` is correct
- Check database is accessible
- Run migrations: `npm run migrate`

### Email Issues
- Verify SMTP credentials
- Check firewall allows SMTP port (465)
- Test connection: `npm run test-email` (if script exists)

### CORS Errors
- Ensure `FRONTEND_URL` includes your frontend domain
- Check CORS configuration in `src/index.ts`

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed initial data
- `npm run keep-active` - Run database activity script

## 📄 License

© 2024 Canon Capital Partners LLC. All rights reserved.
