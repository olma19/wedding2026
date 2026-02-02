/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Swedish phone number format
 * Accepts formats: +46XXXXXXXXX, 07XXXXXXXX, 07X-XXX XX XX, etc.
 */
export function isValidSwedishPhone(phone: string): boolean {
  // Remove all whitespace and dashes
  const cleaned = phone.replace(/[\s-]/g, '')
  // Check if it starts with +46 or 0, followed by 9 digits
  const phoneRegex = /^(\+46|0)[1-9]\d{8}$/
  return phoneRegex.test(cleaned)
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

/**
 * Validate minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Validate maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max
}
