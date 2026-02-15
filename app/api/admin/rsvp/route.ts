import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAdminAuthenticated } from '@/lib/auth/admin'
import { errorResponse, successResponse } from '@/lib/api/responseHelpers'
import { handleDatabaseError } from '@/lib/api/errorHandler'

/**
 * DELETE /api/admin/rsvp
 * Delete all RSVPs. Requires admin authentication.
 */
export async function DELETE(_request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return errorResponse('Obehörig - Adminåtkomst krävs', undefined, 401)
    }

    const { error } = await supabaseAdmin.from('rsvps').delete().not('id', 'is', null)

    if (error) {
      const dbErrorResponse = handleDatabaseError(error)
      return errorResponse(
        dbErrorResponse.error?.error || 'Kunde inte ta bort RSVPs',
        dbErrorResponse.error?.details || error.message,
        500
      )
    }

    return successResponse({ message: 'Alla RSVPs borttagna' }, 200)
  } catch (error) {
    const unknownErrorResponse = handleDatabaseError(error)
    return errorResponse(
      unknownErrorResponse.error?.error || 'Internt serverfel',
      unknownErrorResponse.error?.details ||
        (error instanceof Error ? error.message : 'Okänt fel'),
      500
    )
  }
}
