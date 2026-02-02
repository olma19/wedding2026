/**
 * Accessibility utility functions
 */

/**
 * Generate a unique ID for form fields
 * Useful for associating labels with inputs
 */
export function generateFieldId(prefix: string, index?: number): string {
  return index !== undefined ? `${prefix}-${index}` : `${prefix}-${Date.now()}`
}

/**
 * Get ARIA label for form fields
 */
export function getAriaLabel(label: string, required?: boolean): string {
  return required ? `${label} (obligatorisk)` : label
}

/**
 * Get ARIA described by IDs for error messages
 */
export function getAriaDescribedBy(fieldId: string, hasError: boolean): string | undefined {
  return hasError ? `${fieldId}-error` : undefined
}
