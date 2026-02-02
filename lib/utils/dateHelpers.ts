/**
 * Date utility functions
 */

/**
 * Format a date to Swedish format (YYYY-MM-DD)
 */
export function formatDateSwedish(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('sv-SE')
}

/**
 * Format a date to a readable Swedish format
 */
export function formatDateReadable(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get relative time string (e.g., "in 2 days", "3 weeks ago")
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'idag'
  if (diffDays === 1) return 'imorgon'
  if (diffDays === -1) return 'igår'
  if (diffDays > 0) return `om ${diffDays} dagar`
  return `${Math.abs(diffDays)} dagar sedan`
}
