import { neon, neonConfig } from '@neondatabase/serverless';

// Configure for serverless environments
neonConfig.fetchConnectionCache = true;

/**
 * Create a Neon database connection using the serverless driver
 * This is optimized for serverless environments like Vercel Edge Functions
 */
export function createNeonClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return neon(databaseUrl);
}

// Note: For most database operations, use Prisma instead of raw SQL.
// The neon() function uses tagged template literals for safe queries.
// Example usage:
//   const sql = createNeonClient();
//   const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
//
// For dynamic queries, use Prisma's query builder instead.
