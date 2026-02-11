import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAdminAuthenticated } from '@/lib/auth/admin'
import { errorResponse, successResponse } from '@/lib/api/responseHelpers'
import { handleDatabaseError } from '@/lib/api/errorHandler'

/**
 * DELETE /api/admin/rsvp/[id]
 * Remove an RSVP. Requires admin authentication.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return errorResponse('Obehörig - Adminåtkomst krävs', undefined, 401)
    }

    const { id } = await params
    if (!id || id.trim() === '') {
      return errorResponse('Ogiltig RSVP-id', undefined, 400)
    }

    const { error } = await supabaseAdmin
      .from('rsvps')
      .delete()
      .eq('id', id.trim())

    if (error) {
      const dbErrorResponse = handleDatabaseError(error)
      return errorResponse(
        dbErrorResponse.error?.error || 'Kunde inte ta bort RSVP',
        dbErrorResponse.error?.details || error.message,
        500
      )
    }

    return successResponse({ message: 'RSVP borttagen' }, 200)
  } catch (error) {
    const unknownErrorResponse = handleDatabaseError(error)
    return errorResponse(
      unknownErrorResponse.error?.error || 'Internt serverfel',
      unknownErrorResponse.error?.details || (error instanceof Error ? error.message : 'Okänt fel'),
      500
    )
  }
}
