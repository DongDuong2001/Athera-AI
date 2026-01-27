# Athera AI Project

A mental wellness companion built with Next.js 15, TypeScript, and AI integration.

## Project Overview

Athera AI offers a personalized dashboard for mental wellness, featuring:

- AI-powered chatbot (Groq / Llama 3.3) for emotional support.
- Guided meditations and workout plans.
- Mood tracking.
- Secure authentication with custom JWT and Neon Database.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **AI**: Groq SDK (Llama 3.3 70B)
- **Auth**: Custom JWT with secure session cookies

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or higher) or Bun
  - **Windows Users**: To install Bun, open PowerShell and run:

    ```powershell
    powershell -c "irm bun.sh/install.ps1 | iex"
    ```

- Git

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/DongDuong2001/Athera-AI.git
cd Athera-AI
```

### 2. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

Or if you prefer Bun:

```bash
bun install
```

### 3. Configure Environment Variables

1. Create a new file named .env in the root directory.
2. Copy the contents of .env.example into .env.
3. Fill in the required values:

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

# AI Service (Groq)
GROQ_API_KEY="your_groq_api_key_here"

# Authentication
JWT_SECRET="your_secure_random_string_min_32_chars"
```

### 4. Setup Database

Run the Prisma migration to create the database tables:

```bash
npx prisma migrate dev --name init
```

This command will connect to your Neon database using the DATABASE_URL and create the User, Session, and OtpVerification tables.

### 5. Run Development Server

Start the application in development mode:

```bash
npm run dev
```

The application will be available at <http://localhost:3000>.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the production build.
- `npm run lint`: Runs ESLint checks.
- `npx prisma studio`: Opens a visual interface to view and edit database records.

## Troubleshooting

- **Database Connection Error**: Ensure your DATABASE_URL is correct and includes ?sslmode=require if using Neon.
- **Build Failed**: Check if your .env file is correctly set up.
- **Auth Errors**: Verify that JWT_SECRET is set in your environment variables.
