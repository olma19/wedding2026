import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rsvpSchema } from '@/lib/validations/rsvp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = rsvpSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const rsvpData = validationResult.data

    // Insert RSVP into Supabase
    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .insert({
        guest_name: rsvpData.guest_name,
        email: rsvpData.email || null,
        attending: rsvpData.attending,
        number_of_attendees: rsvpData.number_of_attendees,
        food_allergies: rsvpData.food_allergies || null,
        dietary_restrictions: rsvpData.dietary_restrictions || null,
        special_requests: rsvpData.special_requests || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
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
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve RSVPs (for admin use)
export async function GET(request: NextRequest) {
  try {
    // In production, you'd want to add authentication here
    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch RSVPs', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
