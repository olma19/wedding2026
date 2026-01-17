// Database model
export interface RSVP {
  id?: string
  guest_name: string
  email?: string | null
  attending: boolean
  number_of_attendees: number
  food_allergies?: string | null
  dietary_restrictions?: string | null
  special_requests?: string | null
  created_at?: string
  updated_at?: string
}

// Re-export form data type from validation schema
export type { RSVPFormData } from '@/lib/validations/rsvp'
