'use client'

import { useState, useEffect, useMemo } from 'react'
import type { RSVP } from '@/types/rsvp'
import { rsvpsToPersonRows, getUniqueSongs, parseRsvpListResponse } from '@/lib/rsvp'
import type { PersonRow, AdminStats } from './types'

export function useAdminRSVPs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'date' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [statCardFilter, setStatCardFilter] = useState<keyof AdminStats | null>(null)
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null)
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
  const [deleteAllConfirmText, setDeleteAllConfirmText] = useState('')
  const [deleteAllLoading, setDeleteAllLoading] = useState(false)

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
      setRsvps(parseRsvpListResponse(result))
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
        const message =
          typeof result.error === 'string'
            ? result.error
            : result.error?.error ?? 'Fel lösenord'
        setError(message)
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

  const handleDeleteAllRSVPs = async (): Promise<void> => {
    setDeleteAllLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/rsvp', { method: 'DELETE' })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        const message =
          typeof result?.error === 'string'
            ? result.error
            : result?.error?.error ?? 'Kunde inte ta bort alla RSVPs'
        setError(message)
        return
      }
      setRsvps([])
      setShowDeleteAllModal(false)
      setDeleteAllConfirmText('')
      setSelectedRSVP(null)
      setError(null)
    } catch {
      setError('Ett fel uppstod. Försök igen.')
    } finally {
      setDeleteAllLoading(false)
    }
  }

  const handleDeleteRSVP = async (rsvpId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/rsvp/${encodeURIComponent(rsvpId)}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        const message =
          typeof result?.error === 'string'
            ? result.error
            : result?.error?.error ?? 'Kunde inte ta bort RSVP'
        setError(message)
        return false
      }
      setRsvps((prev) => prev.filter((r) => r.id !== rsvpId))
      setSelectedRSVP(null)
      setError(null)
      return true
    } catch {
      setError('Ett fel uppstod. Försök igen.')
      return false
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

  const handleSortByDate = () => {
    if (sortBy === 'date') {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy('date')
      setSortDirection('desc')
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
    const rows = [...filteredPersonRows]
    if (sortBy === 'name') {
      const name = (p: PersonRow) => `${p.firstName} ${p.lastName}`.toLowerCase().trim()
      return rows.sort((a, b) =>
        sortDirection === 'asc'
          ? name(a).localeCompare(name(b), 'sv')
          : name(b).localeCompare(name(a), 'sv')
      )
    }
    if (sortBy === 'date') {
      const date = (p: PersonRow) => (p.createdAt ? new Date(p.createdAt).getTime() : 0)
      return rows.sort((a, b) =>
        sortDirection === 'asc' ? date(a) - date(b) : date(b) - date(a)
      )
    }
    return rows
  }, [filteredPersonRows, sortBy, sortDirection])

  const handleStatCardClick = (key: keyof AdminStats) => {
    setStatCardFilter((prev) => (prev === key ? null : key))
  }

  const uniqueSongs = useMemo(() => getUniqueSongs(personRows), [personRows])

  const stats: AdminStats = useMemo(
    () => {
      const attendingPeople = personRows.filter((p) => p.attending).length
      return {
        total: rsvps.length,
        totalPeople: attendingPeople,
        // Show person count so "Kommer" matches the filtered list when clicked
        attending: attendingPeople,
        notAttending: rsvps.filter((r) => !r.attending).length,
        busCount: personRows.filter((p) => p.attending && p.wantsBus).length,
        songRequests: uniqueSongs.length,
      }
    },
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
    handleDeleteRSVP,
    handleDeleteAllRSVPs,
    handleSortByName,
    handleSortByDate,
    showDeleteAllModal,
    setShowDeleteAllModal,
    deleteAllConfirmText,
    setDeleteAllConfirmText,
    deleteAllLoading,
  }
}
