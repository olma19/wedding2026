'use client'

import type { RSVP } from '@/types/rsvp'
import type { PersonRow } from './types'

type AdminStatFilter = 'total' | 'attending' | 'notAttending' | 'totalPeople' | 'busCount' | 'songRequests' | null

interface UniqueSong {
  song: string
  count: number
  requestedBy: string[]
}

interface AdminRSVPTableProps {
  sortedPersonRows: PersonRow[]
  personRowsLength: number
  isFiltered?: boolean
  statCardFilter?: AdminStatFilter
  uniqueSongs?: UniqueSong[]
  rsvps: RSVP[]
  sortBy: 'name' | null
  sortDirection: 'asc' | 'desc'
  onSortByName: () => void
  onSelectRSVP: (rsvp: RSVP) => void
  loading: boolean
}

function parseSongDisplay(song: string): { artist: string; title: string } {
  const sep = ' - '
  const i = song.indexOf(sep)
  if (i === -1) return { artist: '', title: song }
  return {
    artist: song.slice(0, i).trim(),
    title: song.slice(i + sep.length).trim(),
  }
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

  const isSongFilter = statCardFilter === 'songRequests'

  if (isSongFilter && uniqueSongs.length > 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Låt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Antal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Begärt av
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uniqueSongs.map((item, index) => {
                const { artist, title } = parseSongDisplay(item.song)
                return (
                  <tr key={`${item.song}-${index}`} className="hover:bg-pink-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {artist || '–'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      {title || item.song}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.count}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.requestedBy.join(', ')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          {uniqueSongs.length} låt{uniqueSongs.length !== 1 ? 'ar' : ''} begärda
        </div>
      </div>
    )
  }

  if (isSongFilter && uniqueSongs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Inga låtönskemål ännu</p>
      </div>
    )
  }

  if (sortedPersonRows.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">
          {personRowsLength === 0
            ? 'Inga personer ännu'
            : 'Inga resultat matchar dina filter'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-pink-100 transition-colors select-none"
                onClick={onSortByName}
              >
                <div className="flex items-center gap-2">
                  Namn
                  {sortBy === 'name' && (
                    <span className="text-pink-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Deltar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Allergier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Buss
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Låt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Datum
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPersonRows.map((person, index) => {
              const rsvp = rsvps.find((r) => r.id === person.rsvpId)
              return (
                <tr
                  key={`${person.rsvpId}-${index}`}
                  className="hover:bg-pink-50 transition-colors cursor-pointer"
                  onClick={() => rsvp && onSelectRSVP(rsvp)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.fullName || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {person.attending ? (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Ja
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Nej
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {person.allergies || ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {person.wantsBus ? (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Ja
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {person.songRequest || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.createdAt
                      ? new Date(person.createdAt).toLocaleDateString('sv-SE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {isFiltered && personRowsLength > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Visar {sortedPersonRows.length} av {personRowsLength} personer
        </div>
      )}
    </div>
  )
}
