# Migration to Neon Database

This project now uses **Neon Database** as the primary PostgreSQL database, while maintaining Supabase for authentication.

## Setup Instructions

### 1. Get Your Neon Database URL

1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy your connection string from the Neon dashboard
4. You'll get two URLs:
   - **Pooled connection** (for serverless): `DATABASE_URL`
   - **Direct connection** (for migrations): `DATABASE_URL_UNPOOLED`

### 2. Environment Variables

Update your `.env.local` file with the following variables:

```env
# Supabase (for authentication only)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Neon Database
DATABASE_URL=your_neon_pooled_connection_string
DATABASE_URL_UNPOOLED=your_neon_direct_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. Initialize Prisma

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or create migrations (for production)
npm run db:migrate
```

### 4. Database Access Methods

You have two options for accessing the Neon database:

#### Option A: Using Prisma (Recommended)

```typescript
import prisma from '@/utils/database/prisma';

// Example: Query users
const users = await prisma.user.findMany();

// Example: Create a user
const newUser = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});
```

#### Option B: Using Raw SQL

```typescript
import { executeQuery, executeQuerySingle } from '@/utils/database/neon';

// Example: Query all users
const users = await executeQuery('SELECT * FROM users');

// Example: Get single user
const user = await executeQuerySingle(
  'SELECT * FROM users WHERE email = $1',
  ['user@example.com']
);
```

## Database Schema

Define your database models in `prisma/schema.prisma`. Example:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Add your relations here
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (dev only)
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Architecture

- **Authentication**: Supabase Auth (existing)
- **Database**: Neon PostgreSQL (new)
- **ORM**: Prisma (recommended) or raw SQL queries
- **Driver**: @neondatabase/serverless (optimized for serverless)

## Migration Checklist

- [x] Install Neon dependencies
- [x] Update environment variables
- [x] Create database utilities
- [x] Set up Prisma ORM
- [ ] Define your database schema in Prisma
- [ ] Run database migrations
- [ ] Update API routes to use Neon
- [ ] Test authentication flow
- [ ] Deploy to production

## Best Practices

1. **Use Prisma** for type-safe database queries
2. **Use connection pooling** (DATABASE_URL) for serverless functions
3. **Use direct connection** (DATABASE_URL_UNPOOLED) for migrations only
4. **Keep Supabase** for authentication - it works great with Neon
5. **Version control** your migrations in `prisma/migrations/`

## Troubleshooting

### Connection Issues

If you encounter connection issues:
- Verify your DATABASE_URL is correct
- Ensure your IP is whitelisted in Neon (or enable "Allow all IPs")
- Check if you're using the pooled connection for serverless

### Prisma Issues

```bash
# Reset Prisma Client
rm -rf node_modules/.prisma
npm run db:generate

# Reset database (⚠️ This deletes all data!)
npx prisma migrate reset
```

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon + Next.js Guide](https://neon.tech/docs/guides/nextjs)
