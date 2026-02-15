'use client'

import { useColors } from '@/components/ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'
import { cn } from '@/lib/utils/classNames'

interface AdminHeaderProps {
  onRefresh: () => void
  onLogout: () => void
  onDeleteAll?: () => void
  loading: boolean
}

export default function AdminHeader({ onRefresh, onLogout, onDeleteAll, loading }: AdminHeaderProps) {
  const colors = useColors()
  return (
    <header className={cn('mb-8 rounded-xl shadow-sm border px-6 py-5', colors.bgLight, colors.borderLight)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={cn('text-2xl sm:text-3xl font-semibold tracking-tight', colors.textDark)}>
            {weddingConfig.couple.name1} & {weddingConfig.couple.name2}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            RSVP-lista · {weddingConfig.date.fullDate}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {onDeleteAll && (
            <button
              type="button"
              onClick={onDeleteAll}
              title="Ta bort alla RSVPs"
              aria-label="Ta bort alla RSVPs"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-red-300 text-red-700 bg-white hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Ta bort alla</span>
            </button>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Uppdatera"
            aria-label="Uppdatera RSVP-lista"
            className={cn('inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50', colors.borderMedium, colors.text, colors.borderHover)}
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>Uppdatera</span>
          </button>
          <button
            onClick={onLogout}
            title="Logga ut"
            aria-label="Logga ut"
            className={cn('inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg border border-transparent transition-colors', colors.bgDark, colors.bgDarkHover)}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logga ut</span>
          </button>
        </div>
      </div>
    </header>
  )
}
