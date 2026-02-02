import type { ColorSchemeName } from '../colors'

export interface FormGradients {
  outer: string
  inner: string
}

/**
 * Get gradient classes for form backgrounds based on color scheme
 * @param scheme - Color scheme name
 * @returns Object with outer and inner gradient classes
 */
export function getFormGradients(scheme: ColorSchemeName): FormGradients {
  const gradients: Record<ColorSchemeName, FormGradients> = {
    pink: {
      outer: 'from-pink-50 via-pink-100/50 to-pink-50',
      inner: 'from-pink-100 via-pink-50 to-pink-100',
    },
    rose: {
      outer: 'from-rose-50 via-rose-100/50 to-rose-50',
      inner: 'from-rose-100 via-rose-50 to-rose-100',
    },
    purple: {
      outer: 'from-purple-50 via-purple-100/50 to-purple-50',
      inner: 'from-purple-100 via-purple-50 to-purple-100',
    },
    blue: {
      outer: 'from-blue-50 via-blue-100/50 to-blue-50',
      inner: 'from-blue-100 via-blue-50 to-blue-100',
    },
    teal: {
      outer: 'from-teal-50 via-teal-100/50 to-teal-50',
      inner: 'from-teal-100 via-teal-50 to-teal-100',
    },
    green: {
      outer: 'from-green-50 via-green-100/50 to-green-50',
      inner: 'from-green-100 via-green-50 to-green-100',
    },
    sage: {
      outer: 'from-slate-50 via-emerald-50/50 to-slate-50',
      inner: 'from-emerald-50 via-slate-50 to-emerald-50',
    },
    red: {
      outer: 'from-red-50 via-red-100/50 to-red-50',
      inner: 'from-red-100 via-red-50 to-red-100',
    },
  }
  return gradients[scheme] || gradients.pink
}
