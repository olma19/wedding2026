import type { RSVPFormData } from '@/lib/validations/rsvp'

/**
 * Build guest_name for storage when creating an RSVP.
 * Attending: comma-separated attendee names. Not attending: single name from first attendee or fallback.
 */
export function buildGuestName(rsvpData: RSVPFormData): string {
  if (rsvpData.attending && rsvpData.attendees?.length) {
    return rsvpData.attendees.map((a) => `${a.firstname} ${a.lastname}`).join(', ')
  }
  const first = rsvpData.attendees?.[0]
  const name = first
    ? `${(first.firstname ?? '').trim()} ${(first.lastname ?? '').trim()}`.trim()
    : ''
  return name || 'Ej deltagande'
}
