import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Fallback for local development or if env vars are not set
  // In a real app, you might want to throw an error or handle this more robustly
  console.warn('Missing Supabase environment variables. Supabase client may not function correctly.')
  // Provide dummy values to prevent immediate crash, but functionality will be broken
  // For production, these MUST be set.
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321', 
  supabaseAnonKey || 'dummy-anon-key'
)
