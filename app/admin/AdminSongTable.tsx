'use client'

import type { UniqueSong } from './types'
import { parseSongDisplay } from './lib/songUtils'

interface AdminSongTableProps {
  uniqueSongs: UniqueSong[]
}

export default function AdminSongTable({ uniqueSongs }: AdminSongTableProps) {
  if (uniqueSongs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Inga låtönskemål ännu</p>
      </div>
    )
  }

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
