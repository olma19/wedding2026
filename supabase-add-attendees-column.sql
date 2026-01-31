-- Add attendees column to rsvps table
-- Run this in Supabase SQL Editor if the column doesn't exist

ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS attendees JSONB;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'rsvps' AND column_name = 'attendees';
