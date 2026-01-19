# Supabase Setup Instructions - Step by Step

Follow these steps to set up Supabase for your wedding landing page.

## Step 1: Create a Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"** if you don't have an account
3. Sign up with GitHub, Google, or email
4. Once logged in, click **"New Project"**
5. Fill in the project details:
   - **Name**: `wedding-landing-page` (or your preferred name)
   - **Database Password**: Create a strong password (⚠️ **SAVE THIS** - you'll need it!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Select **Free** (sufficient for most weddings)
6. Click **"Create new project"** and wait 2-3 minutes for setup

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, click **Settings** (gear icon in the left sidebar)
2. Click **API** in the settings menu
3. You'll see three important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (long string starting with `eyJ...` - ⚠️ **KEEP THIS SECRET!**)

## Step 3: Set Up Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Copy the contents from `env.example` and fill in your actual values:

```bash
# Copy this template and replace with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:**
- Replace `your-project-id`, `your-anon-key-here`, and `your-service-role-key-here` with your actual values from Step 2
- The `.env.local` file is already in `.gitignore`, so it won't be committed to git
- Never share your `SUPABASE_SERVICE_ROLE_KEY` publicly!

## Step 4: Create the Database Schema

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy and paste the following SQL:

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

-- Create policy to allow reading RSVPs (restricted to authenticated users)
-- Note: For admin access, you'll need to set up authentication later
CREATE POLICY "Allow authenticated read" ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
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

4. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
5. You should see a success message: "Success. No rows returned"

## Step 5: Verify the Setup

1. In Supabase dashboard, click **Table Editor** in the left sidebar
2. You should see the `rsvps` table listed
3. Click on it to see the table structure

## Step 6: Test Your Connection

1. Make sure your `.env.local` file is set up correctly
2. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
3. The server should start without errors
4. Your Supabase client files are already configured in:
   - `lib/supabase/client.ts` (for client-side)
   - `lib/supabase/server.ts` (for server-side)

## Troubleshooting

### Issue: "Missing Supabase environment variables" warning
**Solution**: Make sure your `.env.local` file exists and has all three variables set correctly.

### Issue: "Failed to save RSVP" error
**Solution**: 
- Check that you ran the SQL schema in Step 4
- Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check the Supabase dashboard logs (Settings > Logs)

### Issue: Can't see the rsvps table
**Solution**: 
- Make sure you ran the SQL query successfully
- Refresh the Table Editor page
- Check for any error messages in the SQL Editor

## Next Steps

Once Supabase is set up:
1. ✅ Your RSVP API route (`app/api/rsvp/route.ts`) is ready to use
2. ✅ You can start building your RSVP form component
3. ✅ Test submitting an RSVP through your API

## Security Notes

- The `NEXT_PUBLIC_*` variables are safe to expose (they're public)
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - keep it secret!
- Currently, anyone can submit RSVPs (which is fine for a wedding site)
- Reading RSVPs requires authentication (you can add admin auth later)

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Check `SUPABASE_SETUP.md` for more detailed information
