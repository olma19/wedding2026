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
  const [sortBy, setSortBy] = useState<'name' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAttending, setFilterAttending] = useState<'all' | 'attending' | 'not-attending'>('all')
  const [filterBus, setFilterBus] = useState<'all' | 'yes' | 'no'>('all')
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null)
  const [activeTab, setActiveTab] = useState<'rsvps' | 'songs'>('rsvps')

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

  const handleSortByName = () => {
    if (sortBy === 'name') {
      // Toggle direction if already sorting by name
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Start sorting by name
      setSortBy('name')
      setSortDirection('asc')
    }
  }
  
  // Transform RSVPs to person-level rows (moved up for use in sorting)
  const personRows = rsvps.flatMap((rsvp) => {
    if (!rsvp.attending || !rsvp.attendees || rsvp.attendees.length === 0) {
      // For non-attending RSVPs, show one row
      return [{
        rsvpId: rsvp.id,
        firstName: '',
        lastName: '',
        fullName: rsvp.guest_name,
        attending: rsvp.attending,
        allergies: '',
        wantsBus: false,
        songRequest: '',
        createdAt: rsvp.created_at,
      }]
    }
    
    // For attending RSVPs, create one row per attendee
    return rsvp.attendees.map((attendee: any) => ({
      rsvpId: rsvp.id,
      firstName: attendee.firstname || '',
      lastName: attendee.lastname || '',
      fullName: `${attendee.firstname} ${attendee.lastname}`.trim(),
      attending: rsvp.attending,
      allergies: attendee.allergies || '',
      wantsBus: attendee.wants_bus || false,
      songRequest: attendee.song_request || '',
      createdAt: rsvp.created_at,
    }))
  })

  // Filter person rows based on search and filters
  const filteredPersonRows = personRows.filter((person) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        person.fullName.toLowerCase().includes(query) ||
        person.allergies.toLowerCase().includes(query) ||
        person.songRequest.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Attending filter
    if (filterAttending === 'attending' && !person.attending) return false
    if (filterAttending === 'not-attending' && person.attending) return false

    // Bus filter
    if (filterBus === 'yes' && !person.wantsBus) return false
    if (filterBus === 'no' && person.wantsBus) return false

    return true
  })

  // Sort person rows based on current sort settings
  const sortedPersonRows = [...filteredPersonRows].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = (a.firstName + ' ' + a.lastName).toLowerCase().trim()
      const nameB = (b.firstName + ' ' + b.lastName).toLowerCase().trim()
      if (sortDirection === 'asc') {
        return nameA.localeCompare(nameB, 'sv')
      } else {
        return nameB.localeCompare(nameA, 'sv')
      }
    }
    return 0
  })

  // Extract song requests
  const songRequests = personRows
    .filter((p) => p.songRequest && p.songRequest.trim())
    .map((p) => p.songRequest.trim())

  // Remove duplicates and count occurrences
  const uniqueSongs = Array.from(new Set(songRequests.map(s => s.toLowerCase())))
    .map(lowerSong => {
      const originalSongs = songRequests.filter(s => s.toLowerCase() === lowerSong)
      return {
        song: originalSongs[0], // Use first occurrence as canonical version
        count: originalSongs.length,
        requestedBy: personRows
          .filter(p => p.songRequest && p.songRequest.toLowerCase() === lowerSong)
          .map(p => p.fullName)
      }
    })
    .sort((a, b) => b.count - a.count) // Sort by count descending

  const stats = {
    total: rsvps.length,
    totalPeople: personRows.filter(p => p.attending).length,
    attending: rsvps.filter(r => r.attending).length,
    notAttending: rsvps.filter(r => !r.attending).length,
    busCount: personRows.filter(p => p.attending && p.wantsBus).length,
    songRequests: uniqueSongs.length,
    attendanceRate: rsvps.length > 0 
      ? Math.round((rsvps.filter(r => r.attending).length / rsvps.length) * 100)
      : 0,
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-md p-5 border border-pink-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📋</span>
            </div>
            <div className="text-3xl font-bold text-pink-700">{stats.total}</div>
            <div className="text-sm text-gray-700 font-medium">Totalt RSVPs</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-5 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-700">{stats.attending}</div>
            <div className="text-sm text-gray-700 font-medium">Kommer</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-5 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">❌</span>
            </div>
            <div className="text-3xl font-bold text-red-700">{stats.notAttending}</div>
            <div className="text-sm text-gray-700 font-medium">Kommer inte</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-5 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-blue-700">{stats.totalPeople}</div>
            <div className="text-sm text-gray-700 font-medium">Totalt personer</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-5 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🚌</span>
            </div>
            <div className="text-3xl font-bold text-purple-700">{stats.busCount}</div>
            <div className="text-sm text-gray-700 font-medium">Buss</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-5 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🎵</span>
            </div>
            <div className="text-3xl font-bold text-yellow-700">{stats.songRequests}</div>
            <div className="text-sm text-gray-700 font-medium">Låtar</div>
          </div>
        </div>

        {/* Attendance Rate */}
        {stats.total > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Deltagande</h3>
              <span className="text-2xl font-bold text-gray-700">{stats.attendanceRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${stats.attendanceRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {stats.attending} av {stats.total} RSVPs kommer
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('rsvps')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'rsvps'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RSVPs ({personRows.length})
            </button>
            <button
              onClick={() => setActiveTab('songs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'songs'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Låtförslag ({uniqueSongs.length})
            </button>
          </nav>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={fetchRSVPs}
            disabled={loading}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Laddar...' : 'Uppdatera'}
          </button>
          {activeTab === 'rsvps' && (
            <button
              onClick={() => {
                const csv = [
                  ['Namn', 'Allergier', 'Buss', 'Låt', 'Datum'],
                  ...personRows.map(p => [
                    p.fullName || '',
                    p.allergies || '',
                    p.wantsBus ? 'Ja' : 'Nej',
                    p.songRequest || '',
                    p.createdAt ? new Date(p.createdAt).toLocaleDateString('sv-SE') : '',
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
          )}
          {activeTab === 'songs' && (
            <button
              onClick={() => {
                const songsText = uniqueSongs.map((s, i) => `${i + 1}. ${s.song}${s.count > 1 ? ` (${s.count}x)` : ''}`).join('\n')
                const blob = new Blob([songsText], { type: 'text/plain;charset=utf-8;' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = `lattforlag-${new Date().toISOString().split('T')[0]}.txt`
                link.click()
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Exportera låtar
            </button>
          )}
        </div>

        {/* Search and Filters */}
        {activeTab === 'rsvps' && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Sök
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Sök efter namn, allergier, låtar..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none"
                />
              </div>
              <div>
                <label htmlFor="filter-attending" className="block text-sm font-medium text-gray-700 mb-2">
                  Deltagande
                </label>
                <select
                  id="filter-attending"
                  value={filterAttending}
                  onChange={(e) => setFilterAttending(e.target.value as 'all' | 'attending' | 'not-attending')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none"
                >
                  <option value="all">Alla</option>
                  <option value="attending">Kommer</option>
                  <option value="not-attending">Kommer inte</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter-bus" className="block text-sm font-medium text-gray-700 mb-2">
                  Buss
                </label>
                <select
                  id="filter-bus"
                  value={filterBus}
                  onChange={(e) => setFilterBus(e.target.value as 'all' | 'yes' | 'no')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none"
                >
                  <option value="all">Alla</option>
                  <option value="yes">Ja</option>
                  <option value="no">Nej</option>
                </select>
              </div>
            </div>
            {(searchQuery || filterAttending !== 'all' || filterBus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterAttending('all')
                  setFilterBus('all')
                }}
                className="mt-4 text-sm text-pink-600 hover:text-pink-700 underline"
              >
                Rensa filter
              </button>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Content based on active tab */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Laddar...</p>
          </div>
        ) : activeTab === 'rsvps' ? (
          <>
            {sortedPersonRows.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">
                  {personRows.length === 0 
                    ? 'Inga personer ännu' 
                    : 'Inga resultat matchar dina filter'}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-pink-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-pink-100 transition-colors select-none"
                          onClick={handleSortByName}
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
                        const rsvp = rsvps.find(r => r.id === person.rsvpId)
                        return (
                          <tr 
                            key={`${person.rsvpId}-${index}`} 
                            className="hover:bg-pink-50 transition-colors cursor-pointer"
                            onClick={() => rsvp && setSelectedRSVP(rsvp)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {person.fullName || '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                              {person.allergies || ''}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {person.wantsBus ? (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  Ja
                                </span>
                              ) : '-'}
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
                {filteredPersonRows.length !== personRows.length && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                    Visar {sortedPersonRows.length} av {personRows.length} personer
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Song Requests Tab */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {uniqueSongs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">Inga låtförslag ännu</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {uniqueSongs.map((song, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-semibold text-gray-900">#{index + 1}</span>
                          <h3 className="text-lg font-semibold text-gray-900">{song.song}</h3>
                          {song.count > 1 && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {song.count}x
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Begärt av: {song.requestedBy.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RSVP Details Modal */}
        {selectedRSVP && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRSVP(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-pink-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
                <h2 className="text-xl font-bold">RSVP Detaljer</h2>
                <button
                  onClick={() => setSelectedRSVP(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <p className="text-lg">
                      {selectedRSVP.attending ? (
                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          Kommer
                        </span>
                      ) : (
                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                          Kommer inte
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Antal personer</h3>
                    <p className="text-lg">{selectedRSVP.number_of_attendees}</p>
                  </div>
                  {selectedRSVP.attendees && selectedRSVP.attendees.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Gäster</h3>
                      <div className="space-y-3">
                        {selectedRSVP.attendees.map((attendee: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-900">
                              {attendee.firstname} {attendee.lastname}
                            </p>
                            {attendee.allergies && (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Allergier:</span> {attendee.allergies}
                              </p>
                            )}
                            {attendee.wants_bus && (
                              <p className="text-sm text-blue-600 mt-1">🚌 Vill åka med buss</p>
                            )}
                            {attendee.song_request && (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Låt:</span> {attendee.song_request}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Inskickad</h3>
                    <p className="text-lg">
                      {selectedRSVP.created_at
                        ? new Date(selectedRSVP.created_at).toLocaleString('sv-SE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
