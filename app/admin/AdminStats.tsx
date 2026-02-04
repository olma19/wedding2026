'use client'

import type { AdminStats as AdminStatsType } from './types'

interface AdminStatsProps {
  stats: AdminStatsType
  activeStatFilter: keyof AdminStatsType | null
  onCardClick: (key: keyof AdminStatsType) => void
}

const statCards: {
  key: keyof AdminStatsType
  label: string
  emoji: string
  cardClass: string
  valueClass: string
}[] = [
  { key: 'total', label: 'Totalt RSVPs', emoji: '📋', cardClass: 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200', valueClass: 'text-pink-700' },
  { key: 'attending', label: 'Kommer', emoji: '✅', cardClass: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200', valueClass: 'text-green-700' },
  { key: 'notAttending', label: 'Kommer inte', emoji: '❌', cardClass: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200', valueClass: 'text-red-700' },
  { key: 'totalPeople', label: 'Totalt personer', emoji: '👥', cardClass: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200', valueClass: 'text-blue-700' },
  { key: 'busCount', label: 'Buss', emoji: '🚌', cardClass: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200', valueClass: 'text-purple-700' },
  { key: 'songRequests', label: 'Låtar', emoji: '🎵', cardClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200', valueClass: 'text-yellow-700' },
]

export default function AdminStats({ stats, activeStatFilter, onCardClick }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map(({ key, label, emoji, cardClass, valueClass }) => {
        const isActive = activeStatFilter === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onCardClick(key)}
            className={`rounded-lg shadow-md p-5 border text-left transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${cardClass} ${isActive ? 'ring-2 ring-pink-500 ring-offset-2 shadow-lg' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{emoji}</span>
            </div>
            <div className={`text-3xl font-bold ${valueClass}`}>{stats[key]}</div>
            <div className="text-sm text-gray-700 font-medium">{label}</div>
          </button>
        )
      })}
    </div>
  )
}
