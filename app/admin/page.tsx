'use client'

import { useState, useEffect } from 'react'
import { RSVP } from '@/types/rsvp'
import { weddingConfig } from '@/config/wedding'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check if already authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/rsvp')
      if (response.ok) {
        setIsAuthenticated(true)
        fetchRSVPs()
      } else {
        setIsAuthenticated(false)
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
        fetchRSVPs()
      } else {
        const result = await response.json()
        setError(result.error || 'Fel lösenord')
      }
    } catch (err: any) {
      setError('Ett fel uppstod. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', {
        method: 'DELETE',
      })
      setIsAuthenticated(false)
      setRsvps([])
    } catch {
      // Even if logout fails, clear local state
      setIsAuthenticated(false)
      setRsvps([])
    }
  }

  const fetchRSVPs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/rsvp')
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false)
          setError('Sessionen har gått ut. Logga in igen.')
          return
        }
        throw new Error('Kunde inte hämta RSVPs')
      }
      const result = await response.json()
      setRsvps(result.data || [])
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod')
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending).length,
    notAttending: rsvps.filter(r => !r.attending).length,
    totalAttendees: rsvps
      .filter(r => r.attending)
      .reduce((sum, r) => sum + (r.number_of_attendees || 0), 0),
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          <p className="mt-4 text-gray-600">Kontrollerar autentisering...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-serif font-bold text-gray-800">
              RSVP Översikt
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Logga ut
            </button>
          </div>
          <p className="text-gray-600">
            Bröllop: {weddingConfig.date.fullDate}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border border-pink-100">
            <div className="text-2xl font-bold text-pink-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Totalt RSVPs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
            <div className="text-sm text-gray-600">Kommer</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-red-100">
            <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
            <div className="text-sm text-gray-600">Kommer inte</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.totalAttendees}</div>
            <div className="text-sm text-gray-600">Totalt personer</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={fetchRSVPs}
            disabled={loading}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Laddar...' : 'Uppdatera'}
          </button>
          <button
            onClick={() => {
              const csv = [
                ['Namn', 'E-post', 'Kommer', 'Antal personer', 'Matallergier', 'Kostpreferenser', 'Övriga önskemål', 'Datum'],
                ...rsvps.map(r => [
                  r.guest_name,
                  r.email || '',
                  r.attending ? 'Ja' : 'Nej',
                  r.number_of_attendees.toString(),
                  r.food_allergies || '',
                  r.dietary_restrictions || '',
                  r.special_requests || '',
                  r.created_at ? new Date(r.created_at).toLocaleDateString('sv-SE') : '',
                ])
              ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
              
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = `rsvps-${new Date().toISOString().split('T')[0]}.csv`
              link.click()
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Exportera CSV
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* RSVP List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Laddar RSVPs...</p>
          </div>
        ) : rsvps.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Inga RSVPs ännu</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Namn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      E-post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Antal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Matallergier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Kostpreferenser
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Övrigt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Datum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rsvp.guest_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rsvp.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rsvp.attending
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rsvp.attending ? 'Kommer' : 'Kommer inte'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rsvp.attending ? rsvp.number_of_attendees : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {rsvp.food_allergies || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {rsvp.dietary_restrictions || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {rsvp.special_requests || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rsvp.created_at
                          ? new Date(rsvp.created_at).toLocaleDateString('sv-SE', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
