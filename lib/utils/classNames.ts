import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind-aware override (same as shadcn cn).
 * Use this or cn for all className composition.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** @deprecated Prefer cn from '@/lib/utils' for new code. Kept for backward compatibility. */
export const classNames = cn
