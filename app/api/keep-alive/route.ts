import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

/**
 * Keep-alive endpoint to prevent Supabase free tier from pausing after 7 days of inactivity.
 * Call this endpoint every 5–6 days via GitHub Actions or cron-job.org.
 *
 * Requires KEEP_ALIVE_SECRET in Authorization header or ?secret= query param.
 * Set KEEP_ALIVE_SECRET in your hosting env vars and GitHub Actions secrets.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const urlSecret = new URL(request.url).searchParams.get('secret')
  const secret = process.env.KEEP_ALIVE_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const providedSecret = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : urlSecret

  if (providedSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Minimal query - counts as Supabase activity to prevent pause
    await supabaseAdmin.from('rsvps').select('id').limit(1)
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Keep-alive Supabase query failed:', error)
    return NextResponse.json(
      { error: 'Database check failed' },
      { status: 500 }
    )
  }
}
