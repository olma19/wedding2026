'use client'

import { useColors } from '@/components/ColorSchemeProvider'

interface AdminLoginFormProps {
  password: string
  setPassword: (value: string) => void
  error: string | null
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function AdminLoginForm({
  password,
  setPassword,
  error,
  loading,
  onSubmit,
}: AdminLoginFormProps) {
  const colors = useColors()
  return (
    <div className={`min-h-screen bg-gradient-to-b ${colors.gradientFrom} to-white flex items-center justify-center px-4`}>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className={`text-3xl font-serif font-bold mb-6 text-center ${colors.textDark}`}>
          Admin Login
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-400 rounded-lg outline-none transition placeholder:text-gray-400 hover:border-gray-500 focus:ring-2 focus:ring-offset-0 ${colors.ring}`}
              placeholder="Ange lösenord"
              autoFocus
              disabled={loading}
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${colors.bgDark} ${colors.bgDarkHover} ${colors.ring}`}
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  )
}
