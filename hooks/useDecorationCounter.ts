'use client'

import { useRef } from 'react'
import { useId } from 'react'

/**
 * Hook to generate SSR-safe unique IDs for decorations
 * Uses React's useId() for SSR compatibility instead of module-level counter
 */
export function useDecorationCounter(): string {
  const id = useId()
  const counterRef = useRef(0)
  
  // Generate a unique identifier combining React ID with counter
  const uniqueId = `${id}-${counterRef.current++}`
  
  return uniqueId
}

/**
 * Hook to generate a seed from a string identifier
 * Useful for consistent decoration variations based on component position
 */
export function useDecorationSeed(identifier: string): number {
  return identifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}
