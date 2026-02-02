import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rsvpSchema } from '@/lib/validations/rsvp'
import { isAdminAuthenticated } from '@/lib/auth/admin'
import { errorResponse, successResponse } from '@/lib/api/responseHelpers'
import { handleDatabaseError } from '@/lib/api/errorHandler'

export async function POST(request: NextRequest) {
  try {
    // Check Supabase configuration first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return errorResponse(
        'Serverkonfigurationsfel',
        'Databasen är inte konfigurerad. Kontrollera miljövariabler.',
        500
      )
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return errorResponse(
        'Ogiltig JSON i request body',
        parseError instanceof Error ? parseError.message : 'Okänt parse-fel',
        400
      )
    }
    
    // Validate the request body
    const validationResult = rsvpSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.errors)
      const errorMessage = validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      return errorResponse('Valideringsfel', errorMessage, 400)
    }

    const rsvpData = validationResult.data

    const guestName =
      rsvpData.attending && rsvpData.attendees?.length
        ? rsvpData.attendees.map((a) => `${a.firstname} ${a.lastname}`).join(', ')
        : 'Ej deltagande'

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
      // Check for DNS/connection errors
      if (error.message?.includes('ENOTFOUND') || error.message?.includes('fetch failed')) {
        return errorResponse(
          'Databasanslutningsfel',
          'Kan inte ansluta till Supabase. Kontrollera: 1) Ditt Supabase-projekt är aktivt, 2) URL:en i .env.local är korrekt, 3) Din internetanslutning fungerar.',
          503
        )
      }
      
      // Use handleDatabaseError for consistent error handling
      const dbErrorResponse = handleDatabaseError(error)
      return errorResponse(
        dbErrorResponse.error?.error || 'Kunde inte spara OSA',
        dbErrorResponse.error?.details || error.message,
        500
      )
    }

    return successResponse({ message: 'OSA skickad framgångsrikt', data }, 201)
  } catch (error) {
    const unknownErrorResponse = handleDatabaseError(error)
    return errorResponse(
      unknownErrorResponse.error?.error || 'Internt serverfel',
      unknownErrorResponse.error?.details || (error instanceof Error ? error.message : 'Okänt fel'),
      500
    )
  }
}

// GET endpoint to retrieve RSVPs (for admin use only)
export async function GET(_request: NextRequest) {
  try {
    // Require admin authentication
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return errorResponse('Obehörig - Adminåtkomst krävs', undefined, 401)
    }

    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      // Check for DNS/connection errors
      if (error.message?.includes('ENOTFOUND') || error.message?.includes('fetch failed')) {
        return errorResponse(
          'Databasanslutningsfel',
          'Kan inte ansluta till Supabase. Kontrollera: 1) Ditt Supabase-projekt är aktivt, 2) URL:en i .env.local är korrekt, 3) Din internetanslutning fungerar.',
          503
        )
      }
      
      // Use handleDatabaseError for consistent error handling
      const dbErrorResponse = handleDatabaseError(error)
      return errorResponse(
        dbErrorResponse.error?.error || 'Kunde inte hämta OSA',
        dbErrorResponse.error?.details || error.message,
        500
      )
    }

    return successResponse({ data }, 200)
  } catch (error) {
    const unknownErrorResponse = handleDatabaseError(error)
    return errorResponse(
      unknownErrorResponse.error?.error || 'Internt serverfel',
      unknownErrorResponse.error?.details || (error instanceof Error ? error.message : 'Okänt fel'),
      500
    )
  }
}
