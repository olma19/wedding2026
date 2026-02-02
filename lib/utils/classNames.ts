/**
 * Utility function to conditionally join class names
 * Similar to clsx but lightweight and built-in
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Alias for classNames (shorter name)
 */
export const cn = classNames
