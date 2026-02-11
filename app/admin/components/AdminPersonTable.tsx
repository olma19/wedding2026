'use client'

import { useColors } from '@/components/ColorSchemeProvider'
import { cn } from '@/lib/utils/classNames'
import type { RSVP } from '@/types/rsvp'

import type { PersonRow } from '../types'

interface AdminPersonTableProps {
  sortedPersonRows: PersonRow[]
  personRowsLength: number
  isFiltered: boolean
  rsvps: RSVP[]
  sortBy: 'name' | 'date' | null
  sortDirection: 'asc' | 'desc'
  onSortByName: () => void
  onSortByDate: () => void
  onSelectRSVP: (rsvp: RSVP) => void
}

function formatDate(createdAt: string | null | undefined): string {
  if (!createdAt) return '–'
  return new Date(createdAt).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminPersonTable({
  sortedPersonRows,
  personRowsLength,
  isFiltered,
  rsvps,
  sortBy,
  sortDirection,
  onSortByName,
  onSortByDate,
  onSelectRSVP,
}: AdminPersonTableProps) {
  const colors = useColors()

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
      {/* Mobile: card list */}
      <div className="md:hidden divide-y divide-gray-200">
        <div className={cn('flex border-b border-gray-200', colors.bgLight)}>
          <button
            type="button"
            onClick={onSortByName}
            className={cn('flex-1 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2', colors.bgLightHover)}
          >
            Namn
            {sortBy === 'name' && (
              <span className={colors.text}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            type="button"
            onClick={onSortByDate}
            className={cn('flex-1 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2', colors.bgLightHover)}
          >
            Datum
            {sortBy === 'date' && (
              <span className={colors.text}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
        {sortedPersonRows.map((person, index) => {
          const rsvp = rsvps.find((r) => r.id === person.rsvpId)
          return (
            <button
              key={`${person.rsvpId}-${index}`}
              type="button"
              onClick={() => rsvp && onSelectRSVP(rsvp)}
              className={cn('w-full text-left px-4 py-4 transition-colors active:opacity-90', colors.bgLightHover)}
            >
              <div className="font-medium text-gray-900">
                {person.fullName || '–'}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {person.attending ? (
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Deltar
                  </span>
                ) : (
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Deltar inte
                  </span>
                )}
                {person.wantsBus && (
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Buss
                  </span>
                )}
              </div>
              {(person.allergies || person.songRequest) && (
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  {person.allergies && (
                    <p className="truncate">
                      <span className="text-gray-400">Allergier:</span>{' '}
                      {person.allergies}
                    </p>
                  )}
                  {person.songRequest && (
                    <p className="truncate">
                      <span className="text-gray-400">Låt:</span>{' '}
                      {person.songRequest}
                    </p>
                  )}
                </div>
              )}
              <p className="mt-1 text-xs text-gray-400">
                {formatDate(person.createdAt)}
              </p>
            </button>
          )
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={colors.bgLight}>
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none hover:opacity-80 transition-opacity"
                onClick={onSortByName}
              >
                <div className="flex items-center gap-2">
                  Namn
                  {sortBy === 'name' && (
                    <span className={colors.text}>
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
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none hover:opacity-80 transition-opacity"
                onClick={onSortByDate}
              >
                <div className="flex items-center gap-2">
                  Datum
                  {sortBy === 'date' && (
                    <span className={colors.text}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPersonRows.map((person, index) => {
              const rsvp = rsvps.find((r) => r.id === person.rsvpId)
              return (
                <tr
                  key={`${person.rsvpId}-${index}`}
                  className={cn('transition-colors cursor-pointer', colors.bgLightHover)}
                  onClick={() => rsvp && onSelectRSVP(rsvp)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.fullName || '–'}
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
                      '–'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {person.songRequest || '–'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(person.createdAt)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {isFiltered && personRowsLength > 0 && (
        <div className="px-4 md:px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Visar {sortedPersonRows.length} av {personRowsLength} personer
        </div>
      )}
    </div>
  )
}
