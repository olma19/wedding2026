import type { AttendeeFormData } from '@/lib/validations/rsvp'

/**
 * Naming: API and DB use snake_case (guest_name, created_at, firstname in attendees).
 * Form and validation use camelCase (RSVPFormData). Mapping happens at the API boundary.
 */

/** Database / API model (rsvps table, GET response items) */
export interface RSVP {
  id?: string
  guest_name: string
  attending: boolean
  number_of_attendees: number
  food_allergies?: string | null
  dietary_restrictions?: string | null
  special_requests?: string | null
  attendees?: AttendeeFormData[] | null
  created_at?: string
  updated_at?: string
}

/** GET /api/rsvp success response shape */
export interface RsvpListApiResponse {
  data: RSVP[]
}

/** POST body and form: camelCase (RSVPFormData from validation). API maps to DB shape. */
export type { RSVPFormData } from '@/lib/validations/rsvp'
