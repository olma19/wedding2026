-- Migration: Remove email column from rsvps table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new

-- Remove the email column from the rsvps table
ALTER TABLE rsvps DROP COLUMN IF EXISTS email;
