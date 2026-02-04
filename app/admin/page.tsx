'use client'

import { useAdminRSVPs } from './useAdminRSVPs'
import AdminLoginForm from './AdminLoginForm'
import AdminCheckingAuth from './AdminCheckingAuth'
import AdminHeader from './AdminHeader'
import AdminStats from './AdminStats'
import AdminRSVPTable from './AdminRSVPTable'
import AdminRSVPModal from './AdminRSVPModal'

export default function AdminPage() {
  const {
    isAuthenticated,
    checkingAuth,
    password,
    setPassword,
    error,
    loading,
    rsvps,
    personRows,
    sortedPersonRows,
    stats,
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
  } = useAdminRSVPs()

  if (checkingAuth) {
    return <AdminCheckingAuth />
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        password={password}
        setPassword={setPassword}
        error={error}
        loading={loading}
        onSubmit={handleLogin}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <AdminHeader
          onRefresh={fetchRSVPs}
          onLogout={handleLogout}
          loading={loading}
        />

        <AdminStats
          stats={stats}
          activeStatFilter={statCardFilter}
          onCardClick={handleStatCardClick}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <AdminRSVPTable
          sortedPersonRows={sortedPersonRows}
          personRowsLength={personRows.length}
          isFiltered={statCardFilter !== null}
          rsvps={rsvps}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByName={handleSortByName}
          onSelectRSVP={setSelectedRSVP}
          loading={loading}
        />

        {selectedRSVP && (
          <AdminRSVPModal
            rsvp={selectedRSVP}
            onClose={() => setSelectedRSVP(null)}
          />
        )}
      </div>
    </div>
  )
}
