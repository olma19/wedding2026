'use client'

import { useColors } from '@/components/ColorSchemeProvider'

export default function AdminCheckingAuth() {
  const colors = useColors()
  return (
    <div className={`min-h-screen bg-gradient-to-b ${colors.gradientFrom} to-white flex items-center justify-center px-4`}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${colors.borderDark}`} />
        <p className="mt-4 text-gray-600">Kontrollerar autentisering...</p>
      </div>
    </div>
  )
}
