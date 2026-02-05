import type { RSVP } from '@/types/rsvp'

/** One row in the admin person table (per person or per non-attending RSVP) */
export interface PersonRow {
  rsvpId: string | undefined
  firstName: string
  lastName: string
  fullName: string
  attending: boolean
  allergies: string
  wantsBus: boolean
  songRequest: string
  createdAt: string | undefined
}

/** Unique song with request count and requester names */
export interface UniqueSong {
  song: string
  count: number
  requestedBy: string[]
}

function isAttendeeLike(
  a: unknown
): a is { firstname?: string; lastname?: string; allergies?: string; wants_bus?: boolean; song_request?: string } {
  return typeof a === 'object' && a !== null
}

/**
 * Map API RSVPs to admin person rows (one row per attendee, or one row per non-attending RSVP).
 */
export function rsvpsToPersonRows(rsvps: RSVP[]): PersonRow[] {
  return (Array.isArray(rsvps) ? rsvps : []).flatMap((rsvp) => {
    if (!rsvp.attending || !rsvp.attendees || rsvp.attendees.length === 0) {
      return [
        {
          rsvpId: rsvp.id,
          firstName: '',
          lastName: '',
          fullName: rsvp.guest_name ?? '',
          attending: rsvp.attending,
          allergies: '',
          wantsBus: false,
          songRequest: '',
          createdAt: rsvp.created_at,
        },
      ]
    }
    return (rsvp.attendees as unknown[]).map((attendee) => {
      if (!isAttendeeLike(attendee)) {
        return {
          rsvpId: rsvp.id,
          firstName: '',
          lastName: '',
          fullName: rsvp.guest_name ?? '',
          attending: rsvp.attending,
          allergies: '',
          wantsBus: false,
          songRequest: '',
          createdAt: rsvp.created_at,
        }
      }
      return {
        rsvpId: rsvp.id,
        firstName: attendee.firstname ?? '',
        lastName: attendee.lastname ?? '',
        fullName: `${attendee.firstname ?? ''} ${attendee.lastname ?? ''}`.trim(),
        attending: rsvp.attending,
        allergies: attendee.allergies ?? '',
        wantsBus: attendee.wants_bus ?? false,
        songRequest: attendee.song_request ?? '',
        createdAt: rsvp.created_at,
      }
    })
  })
}

/**
 * Derive unique songs (case-insensitive) with count and requester names from person rows.
 */
export function getUniqueSongs(personRows: PersonRow[]): UniqueSong[] {
  const list = personRows
    .filter((p) => p.songRequest?.trim())
    .map((p) => p.songRequest.trim())
  return Array.from(new Set(list.map((s) => s.toLowerCase())))
    .map((lower) => {
      const originals = list.filter((s) => s.toLowerCase() === lower)
      return {
        song: originals[0],
        count: originals.length,
        requestedBy: personRows
          .filter((p) => p.songRequest && p.songRequest.toLowerCase() === lower)
          .map((p) => p.fullName),
      }
    })
    .sort((a, b) => b.count - a.count)
}
