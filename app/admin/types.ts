import type { RSVP } from '@/types/rsvp'

/** One row in the admin table (per person or per non-attending RSVP) */
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

export interface AdminStats {
  total: number
  totalPeople: number
  attending: number
  notAttending: number
  busCount: number
  songRequests: number
}
