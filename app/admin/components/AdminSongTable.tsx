'use client'

import type { UniqueSong } from '../types'
import { parseSongDisplay } from '../lib/songUtils'
import { useColors } from '@/components/ColorSchemeProvider'

interface AdminSongTableProps {
  uniqueSongs: UniqueSong[]
}

export default function AdminSongTable({ uniqueSongs }: AdminSongTableProps) {
  const colors = useColors()

  if (uniqueSongs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Inga låtönskemål ännu</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Mobile: card list */}
      <div className="md:hidden divide-y divide-gray-200">
        {uniqueSongs.map((item, index) => {
          const { artist, title } = parseSongDisplay(item.song)
          return (
            <div
              key={`${item.song}-${index}`}
              className="px-4 py-4"
            >
              <div className="font-medium text-gray-900">
                {title || item.song}
              </div>
              {artist && (
                <p className="text-sm text-gray-500 mt-0.5">{artist}</p>
              )}
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                  {item.count}
                </span>
                <span className="truncate">
                  Begärt av {item.requestedBy.join(', ')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={colors.bgLight}>
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
                <tr
                  key={`${item.song}-${index}`}
                  className={`transition-colors ${colors.bgLightHover}`}
                >
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

      <div className="px-4 md:px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
        {uniqueSongs.length} låt{uniqueSongs.length !== 1 ? 'ar' : ''} begärda
      </div>
    </div>
  )
}
