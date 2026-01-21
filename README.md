# Wedding Landing Page 2026

A beautiful, informative wedding landing page built with Next.js, featuring RSVP functionality and food allergy collection.

## Features

- **Informative Landing Page**: Beautiful design showcasing wedding details
- **RSVP System**: Guests can confirm their attendance
- **Food Allergy Collection**: Collect dietary restrictions and allergies
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI/UX**: Clean, elegant interface

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod
- **Backend**: Supabase (PostgreSQL database, Auth, Storage)

## Project Structure

```
wedding2026/
├── app/
│   ├── api/           # API routes for RSVP submission
│   ├── components/    # Reusable React components
│   ├── lib/           # Utility functions and helpers
│   ├── types/         # TypeScript type definitions
│   └── page.tsx       # Main landing page
├── public/            # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A Supabase account (free tier works)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up Supabase:**
   - Follow the instructions in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
   - Create your Supabase project and run the SQL schema
   - Get your API keys from Supabase dashboard

3. **Configure environment variables:**
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local and add your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your-project-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Quick Deploy to Vercel (Rekommenderat)

1. **Pusha till GitHub:**
   ```bash
   git push origin main
   ```

2. **Gå till [vercel.com](https://vercel.com)** och logga in med GitHub

3. **Klicka "New Project"** och välj ditt repository

4. **Lägg till Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. **Klicka "Deploy"** - Klart! 🎉

Se [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) för detaljerade instruktioner eller [`DEPLOYMENT.md`](./DEPLOYMENT.md) för fullständig guide.

### Andra Hosting-alternativ
- **Netlify**: Bra alternativ, se DEPLOYMENT.md
- **Railway**: Enkel setup för fullstack-appar
- **Render**: Gratis tier med automatiska deployments

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Email (if implementing notifications)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret, server-side only)

## License

Private project for personal use.
