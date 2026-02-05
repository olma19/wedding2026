'use client'

import type { RSVP } from '@/types/rsvp'
import type { PersonRow } from './types'

interface AdminPersonTableProps {
  sortedPersonRows: PersonRow[]
  personRowsLength: number
  isFiltered: boolean
  rsvps: RSVP[]
  sortBy: 'name' | null
  sortDirection: 'asc' | 'desc'
  onSortByName: () => void
  onSelectRSVP: (rsvp: RSVP) => void
}

export default function AdminPersonTable({
  sortedPersonRows,
  personRowsLength,
  isFiltered,
  rsvps,
  sortBy,
  sortDirection,
  onSortByName,
  onSelectRSVP,
}: AdminPersonTableProps) {
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
