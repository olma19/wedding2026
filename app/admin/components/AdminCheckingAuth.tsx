'use client'

import { useColors } from '@/components/ColorSchemeProvider'
import { cn } from '@/lib/utils/classNames'

export default function AdminCheckingAuth() {
  const colors = useColors()
  return (
    <div className={cn('min-h-screen bg-gradient-to-b to-white flex items-center justify-center px-4', colors.gradientFrom)}>
      <div className="text-center">
        <div className={cn('inline-block animate-spin rounded-full h-8 w-8 border-b-2', colors.borderDark)} />
        <p className="mt-4 text-gray-600">Kontrollerar autentisering...</p>
      </div>
    </div>
  )
}
