'use client'

import { useColors } from '../components/ColorSchemeProvider'

/**
 * Hook to get colors with section-specific defaults
 * Wrapper around useColors() for consistency
 */
export function useSectionColors() {
  return useColors()
}

/**
 * Get background color class for a section
 */
export function getSectionBackground(
  background: 'light' | 'white' | 'custom',
  customBackground?: string,
  colors?: ReturnType<typeof useColors>
): string {
  if (customBackground) return customBackground
  if (background === 'white') return 'bg-white'
  return colors?.bgLight || 'bg-gray-50'
}
