import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rsvpSchema } from '@/lib/validations/rsvp'
import { isAdminAuthenticated } from '@/lib/auth/admin'

export async function POST(request: NextRequest) {
  try {
    // Check Supabase configuration first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error', details: 'Database not configured. Please check environment variables.' },
        { status: 500 }
      )
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body', details: parseError instanceof Error ? parseError.message : 'Unknown parse error' },
        { status: 400 }
      )
    }
    
    // Validate the request body
    const validationResult = rsvpSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.errors)
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const rsvpData = validationResult.data

    const guestName =
      rsvpData.attending && rsvpData.attendees?.length
        ? rsvpData.attendees.map((a) => `${a.firstname} ${a.lastname}`).join(', ')
        : 'Ej deltagande'

    let supabaseError: any = null
    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .insert({
        guest_name: guestName,
        attending: rsvpData.attending,
        number_of_attendees: rsvpData.number_of_attendees,
        food_allergies: null,
        dietary_restrictions: null,
        special_requests: null,
        attendees: rsvpData.attendees ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      supabaseError = error
      
      // Check for DNS/connection errors
      if (error.message?.includes('ENOTFOUND') || error.message?.includes('fetch failed')) {
        return NextResponse.json(
          { 
            error: 'Database connection error', 
            details: 'Cannot connect to Supabase. Please check: 1) Your Supabase project is active, 2) The URL in .env.local is correct, 3) Your internet connection is working.',
            hint: 'Visit your Supabase dashboard to verify the project URL: https://supabase.com/dashboard'
          },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to save RSVP', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'RSVP submitted successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error in POST:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage, stack: process.env.NODE_ENV === 'development' ? errorStack : undefined },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve RSVPs (for admin use only)
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      
      // Check for DNS/connection errors
      if (error.message?.includes('ENOTFOUND') || error.message?.includes('fetch failed')) {
        return NextResponse.json(
          { 
            error: 'Database connection error', 
            details: 'Cannot connect to Supabase. Please check: 1) Your Supabase project is active, 2) The URL in .env.local is correct, 3) Your internet connection is working.',
            hint: 'Visit your Supabase dashboard to verify the project URL: https://supabase.com/dashboard'
          },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch RSVPs', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error in GET:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}
