'use client'

import { useState, useEffect, useMemo } from 'react'
import type { RSVP } from '@/types/rsvp'
import type { PersonRow, AdminStats } from './types'

function rsvpsToPersonRows(rsvps: RSVP[]): PersonRow[] {
  return (Array.isArray(rsvps) ? rsvps : []).flatMap((rsvp) => {
    if (!rsvp.attending || !rsvp.attendees || rsvp.attendees.length === 0) {
      return [{
        rsvpId: rsvp.id,
        firstName: '',
        lastName: '',
        fullName: rsvp.guest_name ?? '',
        attending: rsvp.attending,
        allergies: '',
        wantsBus: false,
        songRequest: '',
        createdAt: rsvp.created_at,
      }]
    }
    return (rsvp.attendees as { firstname?: string; lastname?: string; allergies?: string; wants_bus?: boolean; song_request?: string }[]).map((attendee) => ({
      rsvpId: rsvp.id,
      firstName: attendee.firstname ?? '',
      lastName: attendee.lastname ?? '',
      fullName: `${attendee.firstname ?? ''} ${attendee.lastname ?? ''}`.trim(),
      attending: rsvp.attending,
      allergies: attendee.allergies ?? '',
      wantsBus: attendee.wants_bus ?? false,
      songRequest: attendee.song_request ?? '',
      createdAt: rsvp.created_at,
    }))
  })
}

export function useAdminRSVPs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [statCardFilter, setStatCardFilter] = useState<keyof AdminStats | null>(null)
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null)

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
      const list = result.data?.data ?? result.data
      setRsvps(Array.isArray(list) ? list : [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod')
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch {
      setError('Ett fel uppstod. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' })
    } finally {
      setIsAuthenticated(false)
      setRsvps([])
    }
  }

  const handleSortByName = () => {
    if (sortBy === 'name') {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy('name')
      setSortDirection('asc')
    }
  }

  const personRows = useMemo(() => rsvpsToPersonRows(rsvps), [rsvps])

  const filteredPersonRows = useMemo(() => {
    if (!statCardFilter) return personRows
    switch (statCardFilter) {
      case 'total':
        return personRows
      case 'attending':
      case 'totalPeople':
        return personRows.filter((p) => p.attending)
      case 'notAttending':
        return personRows.filter((p) => !p.attending)
      case 'busCount':
        return personRows.filter((p) => p.wantsBus)
      case 'songRequests':
        return personRows.filter((p) => (p.songRequest ?? '').trim() !== '')
      default:
        return personRows
    }
  }, [personRows, statCardFilter])

  const sortedPersonRows = useMemo(() => {
    if (sortBy !== 'name') return [...filteredPersonRows]
    const name = (p: PersonRow) => `${p.firstName} ${p.lastName}`.toLowerCase().trim()
    return [...filteredPersonRows].sort((a, b) =>
      sortDirection === 'asc'
        ? name(a).localeCompare(name(b), 'sv')
        : name(b).localeCompare(name(a), 'sv')
    )
  }, [filteredPersonRows, sortBy, sortDirection])

  const handleStatCardClick = (key: keyof AdminStats) => {
    setStatCardFilter((prev) => (prev === key ? null : key))
  }

  const uniqueSongs = useMemo(() => {
    const list = personRows
      .filter((p) => p.songRequest?.trim())
      .map((p) => p.songRequest.trim())
    return Array.from(new Set(list.map((s) => s.toLowerCase())))
      .map((lower) => {
        const originals = list.filter((s) => s.toLowerCase() === lower)
        return {
          song: originals[0],
          count: originals.length,
          requestedBy: personRows
            .filter((p) => p.songRequest && p.songRequest.toLowerCase() === lower)
            .map((p) => p.fullName),
        }
      })
      .sort((a, b) => b.count - a.count)
  }, [personRows])

  const stats: AdminStats = useMemo(
    () => ({
      total: rsvps.length,
      totalPeople: personRows.filter((p) => p.attending).length,
      attending: rsvps.filter((r) => r.attending).length,
      notAttending: rsvps.filter((r) => !r.attending).length,
      busCount: personRows.filter((p) => p.attending && p.wantsBus).length,
      songRequests: uniqueSongs.length,
    }),
    [rsvps, personRows, uniqueSongs.length]
  )

  return {
    isAuthenticated,
    checkingAuth,
    password,
    setPassword,
    error,
    loading,
    rsvps,
    personRows,
    filteredPersonRows,
    sortedPersonRows,
    stats,
    uniqueSongs,
    sortBy,
    sortDirection,
    statCardFilter,
    handleStatCardClick,
    selectedRSVP,
    setSelectedRSVP,
    fetchRSVPs,
    handleLogin,
    handleLogout,
    handleSortByName,
  }
}
