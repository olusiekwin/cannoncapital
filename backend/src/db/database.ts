import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Supabase/PostgreSQL connection pool
// If SUPABASE_DB_URL is provided, use it; otherwise use individual connection params
const pool = process.env.SUPABASE_DB_URL
  ? new Pool({
      connectionString: process.env.SUPABASE_DB_URL,
      ssl: { rejectUnauthorized: false }, // Supabase requires SSL
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000, // Increased to 10 seconds for Supabase
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    })
  : new Pool({
      host: process.env.DB_HOST || process.env.SUPABASE_DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || process.env.SUPABASE_DB_PORT || '5432'),
      database: process.env.DB_NAME || process.env.SUPABASE_DB_NAME || 'postgres',
      user: process.env.DB_USER || process.env.SUPABASE_DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || process.env.SUPABASE_DB_PASSWORD || '',
      // SSL configuration: use DB_SSL env var, or default to false for VPS, true for Supabase
      ssl: process.env.DB_SSL === 'true' 
        ? { rejectUnauthorized: false } 
        : process.env.DB_SSL === 'false' 
        ? false 
        : process.env.SUPABASE_DB_HOST 
        ? { rejectUnauthorized: false } // Supabase requires SSL
        : false, // Default to no SSL for local/VPS connections
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000, // Increased to 10 seconds
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to Supabase/PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Helper function to execute queries
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    // Query logging removed for cleaner console output
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Helper function to get a client from the pool (for transactions)
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

export default pool;
