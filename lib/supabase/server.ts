import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  // In production, throw an error instead of using fallbacks
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in production.'
    )
  }
  // Fallback for local development only
  console.warn('Missing Supabase environment variables. Supabase admin client may not function correctly.')
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
