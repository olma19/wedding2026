# Supabase Setup Guide

This guide will help you set up Supabase for the wedding landing page project.

## Initial Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: Wedding Landing Page (or your preferred name)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient for most weddings

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 3. Create the Database Schema

Run this SQL in the Supabase SQL Editor (SQL Editor > New Query):

```sql
-- Create RSVP table
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  email TEXT,
  attending BOOLEAN NOT NULL,
  number_of_attendees INTEGER NOT NULL DEFAULT 1,
  food_allergies TEXT,
  dietary_restrictions TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX idx_rsvps_attending ON rsvps(attending);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert RSVPs (public RSVP submission)
CREATE POLICY "Allow public RSVP insert" ON rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reading RSVPs (you may want to restrict this later)
-- For now, allowing authenticated users to read (you can add admin auth later)
CREATE POLICY "Allow authenticated read" ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_rsvps_updated_at
  BEFORE UPDATE ON rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Install Supabase Client

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

## Project Structure

Create the following files in your Next.js project:

```
lib/
  └── supabase/
      ├── client.ts      # Client-side Supabase client
      └── server.ts      # Server-side Supabase client
```

### Client-Side Client (`lib/supabase/client.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Server-Side Client (`lib/supabase/server.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role key for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

## Usage Examples

### Inserting an RSVP (Client-Side)

```typescript
import { supabase } from '@/lib/supabase/client'

const { data, error } = await supabase
  .from('rsvps')
  .insert({
    guest_name: 'John Doe',
    email: 'john@example.com',
    attending: true,
    number_of_attendees: 2,
    food_allergies: 'Peanuts, Shellfish',
    dietary_restrictions: 'Vegetarian'
  })
```

### Reading RSVPs (Server-Side)

```typescript
import { supabaseAdmin } from '@/lib/supabase/server'

// In an API route or server component
const { data, error } = await supabaseAdmin
  .from('rsvps')
  .select('*')
  .order('created_at', { ascending: false })
```

## Security Considerations

1. **Row Level Security (RLS)**: Enabled on the `rsvps` table
2. **Public Insert**: Anyone can submit an RSVP (appropriate for a wedding site)
3. **Read Access**: Currently restricted to authenticated users. You may want to:
   - Create an admin authentication system
   - Or use the service role key only in protected API routes
4. **Rate Limiting**: Consider adding rate limiting to prevent spam
5. **Input Validation**: Always validate on both client and server side

## Next Steps

1. Set up environment variables in `.env.local`
2. Create the Supabase client utilities
3. Build the RSVP form component
4. Create API routes for RSVP submission
5. (Optional) Set up admin authentication for viewing RSVPs
