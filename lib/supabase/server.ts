import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  // Fallback for local development or if env vars are not set
  // In a real app, you might want to throw an error or handle this more robustly
  console.warn('Missing Supabase environment variables. Supabase admin client may not function correctly.')
  // Provide dummy values to prevent immediate crash, but functionality will be broken
  // For production, these MUST be set.
}

// Use service role key for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(
  supabaseUrl || 'http://localhost:54321', 
  supabaseServiceKey || 'dummy-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
