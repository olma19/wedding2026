# Wedding Landing Page 2026

A beautiful, informative wedding landing page built with Next.js, featuring RSVP functionality and food allergy collection.

## Features

- **Informative Landing Page**: Beautiful design showcasing wedding details
- **RSVP System**: Guests can confirm their attendance
- **Food Allergy Collection**: Collect dietary restrictions and allergies
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI/UX**: Clean, elegant interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) — use shadcn where possible for new and migrated UI (see [Component migration plan](docs/COMPONENT_MIGRATION_PLAN.md))
- **Form Management**: React Hook Form + Zod
- **Backend**: Supabase (PostgreSQL database)
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier

## Project Structure

```
wedding2026/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (RSVP, admin, test)
│   ├── decorations/          # Decoration showcase page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main landing page
├── components/               # React components
│   ├── forms/                # Form components
│   │   ├── FormField.tsx     # Reusable form input
│   │   ├── PersonFormSection.tsx
│   │   ├── GuestCountSelector.tsx
│   │   └── SuccessMessage.tsx
│   ├── sections/             # Page section components
│   │   ├── SectionWrapper.tsx  # Reusable section wrapper
│   │   ├── SectionRegistry.tsx  # Dynamic section rendering
│   │   ├── HeroSection.tsx
│   │   ├── RSVPSection.tsx
│   │   └── ...                # Other sections
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── LinkButton.tsx
│   │   ├── ContactLink.tsx
│   │   └── SectionDivider.tsx
│   ├── FlowerDecoration.tsx  # Decoration dispatcher
│   ├── LeafDecoration.tsx    # Leaf decoration component
│   ├── SectionTitle.tsx      # Section title with decorations
│   ├── CountdownTimer.tsx    # Countdown display
│   ├── StickyCountdown.tsx   # Sticky header countdown
│   └── ...                   # Other components
├── config/                   # Configuration files
│   ├── wedding.ts            # Wedding configuration
│   └── sections.ts           # Section configuration
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # Architecture overview
│   ├── COMPONENTS.md         # Component API docs
│   └── hooks.md              # Custom hooks documentation
├── hooks/                    # Custom React hooks
│   ├── useSectionColors.ts
│   ├── useFormGradients.ts
│   ├── useRSVPSubmission.ts
│   └── useDecorationCounter.ts
├── lib/                      # Library utilities
│   ├── api/                  # API utilities
│   │   ├── errorHandler.ts   # Error handling
│   │   └── responseHelpers.ts
│   ├── colors/               # Color scheme utilities
│   │   └── gradients.ts      # Form gradients
│   ├── decorations/          # Decoration utilities
│   │   └── variations.ts     # Decoration variation logic
│   └── utils/                # General utilities
│       ├── classNames.ts     # Class name utilities
│       ├── stringHelpers.ts  # String manipulation
│       ├── dateHelpers.ts    # Date formatting
│       ├── accessibility.ts  # Accessibility helpers
│       ├── validation.ts     # Validation functions
│       └── index.ts          # Barrel exports
├── types/                    # TypeScript type definitions
│   ├── sections.ts           # Section-related types
│   ├── decorations.ts        # Decoration types
│   ├── forms.ts              # Form types
│   ├── rsvp.ts               # RSVP types
│   └── wedding.ts            # Wedding config types
└── public/                   # Static assets
    └── decorations/          # SVG decoration assets
```

## Documentation

- **[Architecture Overview](./docs/ARCHITECTURE.md)** - Project structure and design decisions
- **[Component Documentation](./docs/COMPONENTS.md)** - Detailed component API documentation
- **[Component migration plan (shadcn)](./docs/COMPONENT_MIGRATION_PLAN.md)** - Use shadcn where possible; migration status and steps
- **[Hooks Documentation](./docs/hooks.md)** - Custom React hooks guide
- **[Image Patterns](./docs/IMAGE_PATTERNS.md)** - Next.js Image component patterns and best practices
- **[Improvements & Features](./IMPROVEMENTS_AND_FEATURES.md)** - Future enhancements
- **[Decoration Guide](./DECORATION_GUIDE.md)** - Decoration system documentation
- **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

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

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting without modifying files

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

### Type Checking

```bash
npx tsc --noEmit     # Check TypeScript types without building
```

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
   - `ADMIN_PASSWORD` (för /admin)
   - `RSVP_INVITE_CODE` (valfritt – om satt måste gäster ange koden för att RSVP:a)

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

# Email (Resend - for RSVP confirmations)
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@wedding2026.com"
RESEND_FROM_NAME="Kristian & Mimmi"

# Admin (optional – protects /admin)
ADMIN_PASSWORD="your-secure-admin-password"

# RSVP invite code (optional – when set, guests must enter this code to see/submit the RSVP form)
# Omit to allow anyone to RSVP without a code
# RSVP_INVITE_CODE="your-invite-code"
```

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret, server-side only)

### Getting Resend API Key (for Email Confirmations)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Go to API Keys section
3. Create a new API key
4. Copy the key (starts with `re_`)
5. For development, you can use `onboarding@resend.dev` as FROM_EMAIL
6. For production, verify your domain in Resend dashboard
7. See [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md) for detailed instructions

## License

Private project for personal use.
