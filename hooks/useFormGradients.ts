'use client'

import { weddingConfig } from '@/config/wedding'
import { getFormGradients } from '@/lib/colors/gradients'
import type { ColorSchemeName } from '@/lib/colors'

/**
 * Hook to get form gradient classes based on current color scheme
 * @returns Object with outer and inner gradient classes for forms
 */
export function useFormGradients() {
  const colorScheme = (weddingConfig.colorScheme || 'pink') as ColorSchemeName
  return getFormGradients(colorScheme)
}
