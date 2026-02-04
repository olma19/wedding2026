'use client'

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">
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
              className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition placeholder:text-gray-400 hover:border-gray-500"
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
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  )
}
