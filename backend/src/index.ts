import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';
import testimonialRoutes from './routes/testimonials';
import reviewRoutes from './routes/reviews';
import newsletterRoutes from './routes/newsletter';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import serviceRoutes from './routes/services';
import projectRoutes from './routes/projects';
import staffRoutes from './routes/staff';
import commentRoutes from './routes/comments';
import impactRoutes from './routes/impact';
import careerRoutes from './routes/careers';
import faqRoutes from './routes/faq';
import { verifyEmailConnection } from './services/email';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Allowed origins for CORS
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
  'https://www.cannoncapitalpartners.org',
  'https://cannoncapitalpartners.org',
  'https://api.cannoncapitalpartners.org',
  'http://159.198.43.149',
  'http://159.198.43.149:3001',
  'https://159.198.43.149',
  'https://159.198.43.149:3001',
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/faq', faqRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Initialize database and start server
const init = async () => {
  try {
    // Run migrations
    const runMigrations = require('./db/migrate').default;
    await runMigrations();

    // Verify email connection (non-blocking - server will start even if email fails)
    verifyEmailConnection().catch((error) => {
      console.warn('⚠️  Email service not configured or unavailable:', error.message);
      console.warn('   Newsletter welcome emails will not be sent until email is configured.');
    });

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
      console.log(`🗄️  Database: PostgreSQL\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

init();

export default app;

