import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { errorResponse, successResponse } from '@/lib/api/responseHelpers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026'

// Simple session token (in production, use a proper JWT or session library)
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (password !== ADMIN_PASSWORD) {
      return errorResponse('Fel lösenord', undefined, 401)
    }

    // Create session token
    const token = generateSessionToken()
    const cookieStore = await cookies()
    
    // Set secure cookie (httpOnly, secure in production)
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return successResponse({ success: true })
  } catch (error) {
    return errorResponse(
      'Internt serverfel',
      error instanceof Error ? error.message : 'Okänt fel',
      500
    )
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    return successResponse({ success: true })
  } catch (error) {
    return errorResponse(
      'Kunde inte logga ut',
      error instanceof Error ? error.message : 'Okänt fel',
      500
    )
  }
}
