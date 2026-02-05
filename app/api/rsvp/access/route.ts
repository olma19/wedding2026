import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { isGuestAllowed, createGuestToken, COOKIE_NAME } from '@/lib/auth/guest'
import { errorResponse, successResponse } from '@/lib/api/responseHelpers'

const RSVP_INVITE_CODE = process.env.RSVP_INVITE_CODE

/**
 * GET: Check if the current request has guest access (for showing/hiding RSVP form).
 * Returns { gateEnabled, allowed } so the client only shows the code field when gateEnabled is true.
 */
export async function GET() {
  if (!RSVP_INVITE_CODE) {
    return successResponse({ gateEnabled: false, allowed: true })
  }
  const allowed = await isGuestAllowed()
  return successResponse({ gateEnabled: true, allowed })
}

/**
 * POST: Verify invite code and set guest access cookie.
 * Body: { code: string }
 */
export async function POST(request: NextRequest) {
  if (!RSVP_INVITE_CODE) {
    return successResponse({ success: true })
  }

  let body: { code?: string }
  try {
    body = await request.json()
  } catch {
    return errorResponse('Ogiltig begäran', undefined, 400)
  }

  const code = typeof body?.code === 'string' ? body.code.trim() : ''
  if (code !== RSVP_INVITE_CODE) {
    return errorResponse('Fel inbjudningskod', undefined, 401)
  }

  const token = createGuestToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  })

  return successResponse({ success: true })
}
