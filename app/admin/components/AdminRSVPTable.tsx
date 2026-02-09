'use client'

import type { RSVP } from '@/types/rsvp'
import type { PersonRow, UniqueSong, AdminStatFilter } from '../types'
import AdminPersonTable from './AdminPersonTable'
import AdminSongTable from './AdminSongTable'

interface AdminRSVPTableProps {
  sortedPersonRows: PersonRow[]
  personRowsLength: number
  isFiltered?: boolean
  statCardFilter?: AdminStatFilter
  uniqueSongs?: UniqueSong[]
  rsvps: RSVP[]
  sortBy: 'name' | 'date' | null
  sortDirection: 'asc' | 'desc'
  onSortByName: () => void
  onSortByDate: () => void
  onSelectRSVP: (rsvp: RSVP) => void
  loading: boolean
}

export default function AdminRSVPTable({
  sortedPersonRows,
  personRowsLength,
  isFiltered = false,
  statCardFilter = null,
  uniqueSongs = [],
  rsvps,
  sortBy,
  sortDirection,
  onSortByName,
  onSortByDate,
  onSelectRSVP,
  loading,
}: AdminRSVPTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600" />
        <p className="mt-4 text-gray-600">Laddar...</p>
      </div>
    )
  }

  if (statCardFilter === 'songRequests') {
    return <AdminSongTable uniqueSongs={uniqueSongs} />
  }

  return (
    <AdminPersonTable
      sortedPersonRows={sortedPersonRows}
      personRowsLength={personRowsLength}
      isFiltered={isFiltered}
      rsvps={rsvps}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSortByName={onSortByName}
      onSortByDate={onSortByDate}
      onSelectRSVP={onSelectRSVP}
    />
  )
}
