'use client'

import { useAdminRSVPs } from './useAdminRSVPs'
import AdminLoginForm from './components/AdminLoginForm'
import AdminCheckingAuth from './components/AdminCheckingAuth'
import AdminHeader from './components/AdminHeader'
import AdminStats from './components/AdminStats'
import AdminRSVPTable from './components/AdminRSVPTable'
import AdminRSVPModal from './components/AdminRSVPModal'
import { useColors } from '@/components/ColorSchemeProvider'

export default function AdminPage() {
  const colors = useColors()
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
    handleSortByName,
    handleSortByDate,
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
    <div className={`min-h-screen bg-gradient-to-b ${colors.gradientFrom} to-white py-8 px-4`} data-testid="admin-dashboard">
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
          statCardFilter={statCardFilter}
          uniqueSongs={uniqueSongs}
          rsvps={rsvps}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByName={handleSortByName}
          onSortByDate={handleSortByDate}
          onSelectRSVP={setSelectedRSVP}
          loading={loading}
        />

        {selectedRSVP && (
          <AdminRSVPModal
            rsvp={selectedRSVP}
            onClose={() => setSelectedRSVP(null)}
            onDelete={handleDeleteRSVP}
          />
        )}
      </div>
    </div>
  )
}
