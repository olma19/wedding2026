-- Supabase Database Schema for Wedding RSVP
-- Copy and paste this entire file into Supabase SQL Editor
-- Location: https://supabase.com/dashboard/project/wvvkkbtmlmgiwkkqmfrm/sql/new

-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvps (
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
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_attending ON rsvps(attending);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow public RSVP insert" ON rsvps;
DROP POLICY IF EXISTS "Allow authenticated read" ON rsvps;

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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_rsvps_updated_at ON rsvps;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_rsvps_updated_at
  BEFORE UPDATE ON rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
