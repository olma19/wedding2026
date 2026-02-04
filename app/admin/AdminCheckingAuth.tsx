'use client'

export default function AdminCheckingAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600" />
        <p className="mt-4 text-gray-600">Kontrollerar autentisering...</p>
      </div>
    </div>
  )
}
