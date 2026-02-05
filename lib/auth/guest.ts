import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'rsvp_guest_access'
const TOKEN_PREFIX = 'rsvp.'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

function getSecret(): string {
  return process.env.RSVP_ACCESS_SECRET || process.env.ADMIN_PASSWORD || 'rsvp-guest-secret'
}

function createPayload(): string {
  const exp = Date.now() + MAX_AGE_MS
  return JSON.stringify({ type: 'rsvp_guest', exp })
}

function sign(payload: string): string {
  const secret = getSecret()
  const hmac = createHmac('sha256', secret)
  hmac.update(payload)
  return hmac.digest('base64url')
}

/**
 * Create a signed token for guest RSVP access (set in cookie after correct invite code).
 */
export function createGuestToken(): string {
  const payload = createPayload()
  const signature = sign(payload)
  const encoded = Buffer.from(payload, 'utf-8').toString('base64url')
  return `${TOKEN_PREFIX}${encoded}.${signature}`
}

/**
 * Verify cookie value and return true if valid and not expired.
 */
function verifyToken(token: string): boolean {
  if (!token.startsWith(TOKEN_PREFIX)) return false
  const rest = token.slice(TOKEN_PREFIX.length)
  const dot = rest.indexOf('.')
  if (dot === -1) return false
  const encoded = rest.slice(0, dot)
  const signature = rest.slice(dot + 1)
  let payload: string
  try {
    payload = Buffer.from(encoded, 'base64url').toString('utf-8')
  } catch {
    return false
  }
  const expectedSig = sign(payload)
  const expectedBuf = Buffer.from(expectedSig, 'utf-8')
  const actualBuf = Buffer.from(signature, 'utf-8')
  if (expectedBuf.length !== actualBuf.length) return false
  if (!timingSafeEqual(expectedBuf, actualBuf)) return false
  let data: { type: string; exp: number }
  try {
    data = JSON.parse(payload) as { type: string; exp: number }
  } catch {
    return false
  }
  if (data.type !== 'rsvp_guest' || typeof data.exp !== 'number') return false
  if (Date.now() > data.exp) return false
  return true
}

/**
 * Check if the request has valid guest access (signed cookie).
 * Use this in API routes that should only accept submissions from guests who passed the invite gate.
 * If RSVP_INVITE_CODE is not set, the gate is disabled and this returns true.
 */
export async function isGuestAllowed(): Promise<boolean> {
  if (!process.env.RSVP_INVITE_CODE) return true
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  if (!cookie?.value) return false
  return verifyToken(cookie.value)
}

export { COOKIE_NAME }
