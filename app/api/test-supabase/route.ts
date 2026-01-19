import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    environment: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...' || 'NOT SET',
    },
    serverConnection: {
      status: 'unknown',
      error: null as string | null,
      tableExists: false,
    },
    clientConnection: {
      status: 'unknown',
      error: null as string | null,
    },
  }

  // Test Server Connection (Admin)
  try {
    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .select('count')
      .limit(1)

    if (error) {
      results.serverConnection.status = 'error'
      results.serverConnection.error = error.message
      
      // Check if it's a table doesn't exist error
      if (error.message.includes('does not exist') || error.code === '42P01') {
        results.serverConnection.error = 'Table "rsvps" does not exist. Please run the SQL schema from SETUP_INSTRUCTIONS.md'
      }
    } else {
      results.serverConnection.status = 'success'
      results.serverConnection.tableExists = true
    }
  } catch (error: any) {
    results.serverConnection.status = 'error'
    results.serverConnection.error = error.message || 'Unknown error'
  }

  // Test Client Connection (Anon)
  try {
    // Just test if we can create a client connection
    // We won't try to query since RLS might block it
    const testUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const testKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (testUrl && testKey) {
      // Try a simple health check query that should work with anon key
      const { error } = await supabase.from('rsvps').select('id').limit(0)
      
      if (error) {
        // This is expected if RLS is blocking, but connection works
        if (error.message.includes('permission') || error.code === '42501') {
          results.clientConnection.status = 'connected (RLS blocking queries - this is expected)'
        } else {
          results.clientConnection.status = 'error'
          results.clientConnection.error = error.message
        }
      } else {
        results.clientConnection.status = 'success'
      }
    } else {
      results.clientConnection.status = 'error'
      results.clientConnection.error = 'Missing environment variables'
    }
  } catch (error: any) {
    results.clientConnection.status = 'error'
    results.clientConnection.error = error.message || 'Unknown error'
  }

  // Determine overall status
  const overallStatus = 
    results.serverConnection.status === 'success' && results.serverConnection.tableExists
      ? 'success'
      : results.serverConnection.status === 'error'
      ? 'error'
      : 'partial'

  return NextResponse.json(
    {
      status: overallStatus,
      ...results,
    },
    {
      status: overallStatus === 'success' ? 200 : overallStatus === 'error' ? 500 : 200,
    }
  )
}
