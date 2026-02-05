import type { RSVP, RsvpListApiResponse } from '@/types/rsvp'

/**
 * Parse GET /api/rsvp JSON response into an array of RSVPs.
 * Handles both { data: RSVP[] } and legacy { data: { data: RSVP[] } } shapes.
 */
export function parseRsvpListResponse(json: unknown): RSVP[] {
  if (json === null || typeof json !== 'object') return []
  const obj = json as Record<string, unknown>
  const data = obj.data
  if (Array.isArray(data)) return data as RSVP[]
  if (data !== null && typeof data === 'object' && Array.isArray((data as RsvpListApiResponse).data)) {
    return (data as RsvpListApiResponse).data
  }
  return []
}
