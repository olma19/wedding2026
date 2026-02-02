/**
 * Hook to get color classes based on the wedding config color scheme
 * Usage: const colors = useColors()
 * Then use: className={colors.bgDark}
 */
'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { weddingConfig } from '@/config/wedding'
import { getColorClasses, type ColorSchemeName } from '@/lib/colors'

// Context for overriding color scheme (used in decorations page)
const ColorSchemeContext = createContext<ColorSchemeName | null>(null)

export function ColorSchemeProvider({ 
  children, 
  colorScheme 
}: { 
  children: ReactNode
  colorScheme?: ColorSchemeName 
}) {
  return (
    <ColorSchemeContext.Provider value={colorScheme || null}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export function useColors() {
  const overrideScheme = useContext(ColorSchemeContext)
  const scheme = (overrideScheme || weddingConfig.colorScheme || 'pink') as ColorSchemeName
  return getColorClasses(scheme)
}
