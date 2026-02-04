'use client'

import { weddingConfig } from '@/config/wedding'

interface AdminHeaderProps {
  onRefresh: () => void
  onLogout: () => void
  loading: boolean
}

export default function AdminHeader({ onRefresh, onLogout, loading }: AdminHeaderProps) {
  return (
    <header className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200/80 px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            RSVP Översikt
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Bröllop {weddingConfig.date.fullDate}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Uppdatera"
            aria-label="Uppdatera RSVP-lista"
            className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </button>
          <button
            onClick={onLogout}
            title="Logga ut"
            aria-label="Logga ut"
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
