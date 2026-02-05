/** Re-export admin view models from RSVP domain layer */
export type { PersonRow, UniqueSong } from '@/lib/rsvp'

/** Stat card filter key; null = no filter */
export type AdminStatFilter =
  | 'total'
  | 'attending'
  | 'notAttending'
  | 'totalPeople'
  | 'busCount'
  | 'songRequests'
  | null

export interface AdminStats {
  total: number
  totalPeople: number
  attending: number
  notAttending: number
  busCount: number
  songRequests: number
}
