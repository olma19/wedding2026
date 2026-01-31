import type { AttendeeFormData } from '@/lib/validations/rsvp'

// Database model (rsvps table)
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

// Re-export form data type from validation schema
export type { RSVPFormData } from '@/lib/validations/rsvp'
