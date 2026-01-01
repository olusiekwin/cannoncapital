# Cannon Capital Partners - Corporate Website

A modern, professional website for Cannon Capital Partners LLC, featuring financial advisory services, project showcases, insights, and a comprehensive admin panel.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Supabase recommended)
- SMTP email server credentials

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cannoncapital

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Environment Setup

**Frontend** (create `.env` in root):

```env
# Optional - defaults to remote API in production
VITE_USE_REMOTE_BACKEND=false
VITE_API_URL_LOCAL=http://localhost:3001/api
VITE_API_URL_REMOTE=https://api.cannoncapitalpartners.org/api
```

**Backend** (create `.env` in `backend/`):

```env
# Database
SUPABASE_DB_URL=postgresql://user:password@host:5432/postgres

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080,https://www.cannoncapitalpartners.org

# Authentication
JWT_SECRET=your-secret-key-here

# Email Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=465
SMTP_USER_NEWSLETTER=noreply@cannoncapitalpartners.org
SMTP_PASSWORD_NEWSLETTER=your-password
SMTP_USER_CONTACT=inquiries@cannoncapitalpartners.org
SMTP_PASSWORD_CONTACT=your-password
```

### Development

```bash
# Start frontend dev server (port 8080)
npm run dev

# Start backend API server (port 3001)
cd backend
npm run dev
```

Visit `http://localhost:8080` to view the application.

## 📁 Project Structure

```
cannoncapital/
├── src/                    # Frontend React application
│   ├── components/        # Reusable components
│   │   ├── admin/        # Admin panel components
│   │   ├── common/       # Shared components
│   │   ├── home/         # Home page sections
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # UI primitives (shadcn/ui)
│   ├── pages/            # Page components
│   ├── lib/              # Utilities and API client
│   └── hooks/            # Custom React hooks
├── backend/               # Backend API server
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── db/           # Database utilities
│   │   ├── services/     # Business logic services
│   │   └── middleware/   # Express middleware
│   └── keep-db-active.ts # Database activity script
└── public/               # Static assets
```

## 🌐 Features

### Public Pages
- **Home** - Hero section, services preview, stats, projects, insights
- **About** - Company information, team, mission
- **Services** - Detailed service offerings with capabilities
- **Projects** - Active and completed project showcases
- **Insights** - Articles and blog posts with reviews
- **Impact** - Impact stories and community initiatives
- **Careers** - Job postings and company culture
- **Contact** - Contact form and location information
- **FAQ** - Frequently asked questions
- **Compliance** - Regulatory disclosures
- **Fraud Prevention** - Security and fraud prevention information

### Admin Panel
- Full CRUD operations for all content types
- Content approval workflow (reviews, testimonials, comments)
- Analytics and statistics
- Newsletter subscription management
- Secure JWT-based authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Query** - Data fetching and caching

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database (via Supabase)
- **JWT** - Authentication
- **Zod** - Schema validation
- **Nodemailer** - Email service

## 📝 API Documentation

The backend API provides endpoints for:

- **Articles/Insights** - `/api/articles`
- **Services** - `/api/services`
- **Projects** - `/api/projects`
- **Testimonials** - `/api/testimonials`
- **Reviews** - `/api/reviews`
- **Comments** - `/api/comments`
- **Contact** - `/api/contact`
- **Newsletter** - `/api/newsletter`
- **Impact Stories** - `/api/impact`
- **Careers** - `/api/careers`
- **Staff** - `/api/staff`
- **FAQ** - `/api/faq`
- **Auth** - `/api/auth`

See `backend/README.md` for detailed API documentation.

## 🗄️ Database Setup

1. Set up a PostgreSQL database (Supabase recommended)
2. Update `SUPABASE_DB_URL` in backend `.env`
3. Run migrations:

```bash
cd backend
npm run migrate
```

4. Seed initial data (optional):

```bash
npm run seed
```

## 🔄 Keep Database Active

To prevent Supabase from pausing, run the activity script:

```bash
cd backend
npm run keep-active
```

Or run with PM2 for continuous operation:

```bash
pm2 start keep-db-active.ts --interpreter tsx --name db-activity
pm2 save
```

This script generates realistic user activity (likes, reviews, comments) to keep the database active.

## 🚢 Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. The app automatically uses the remote API in production builds

### Backend (VPS/Server)

1. Deploy to your server
2. Install PM2: `npm install -g pm2`
3. Start the server:

```bash
cd backend
npm run build
pm2 start dist/index.js --name cannoncapital-backend
pm2 save
pm2 startup
```

4. Set up reverse proxy (nginx) for HTTPS
5. Configure environment variables in `.env`

### Environment Variables for Production

**Frontend** (Vercel):
- Automatically defaults to remote API in production
- Optional: Set `VITE_USE_REMOTE_BACKEND=true` in Vercel dashboard

**Backend** (Server):
- Update `NODE_ENV=production`
- Set `FRONTEND_URL` to your production domain
- Ensure all SMTP credentials are correct

## 🔐 Admin Access

1. Create admin user via database or migration script
2. Login at `/admin`
3. Default credentials should be changed immediately

## 📧 Email Configuration

The application sends emails for:
- Contact form submissions
- Newsletter subscriptions (welcome emails)
- Admin notifications

Configure SMTP settings in backend `.env` file.

## 🐛 Troubleshooting

### API Connection Issues

- **Production uses remote API automatically** - no config needed
- Check browser console for API base URL
- Verify backend is running and accessible
- Check CORS configuration in backend

### Routing Issues (404 errors)

- Ensure `vercel.json` has proper rewrites configured
- All routes should redirect to `index.html` for SPA
- Rebuild and redeploy after route changes

### Database Connection

- Verify `SUPABASE_DB_URL` is correct
- Check database is accessible
- Run `npm run migrate` to ensure tables exist

## 📄 License

© 2024 Canon Capital Partners LLC. All rights reserved.

## 🤝 Support

For technical support, contact the development team or refer to the backend documentation in `backend/README.md`.
