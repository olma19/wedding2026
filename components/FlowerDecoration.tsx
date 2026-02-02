'use client'

import { memo, useMemo, useRef } from 'react'
import { useColors } from './ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'
import LeafDecoration from './LeafDecoration'
import { getVariedLeafDecoration } from '@/lib/decorations/variations'
import { useDecorationSeed } from '@/hooks/useDecorationCounter'
import { classNames } from '@/lib/utils/classNames'

/**
 * Props for FlowerDecoration component
 */
interface FlowerDecorationProps {
  /** Additional CSS classes */
  className?: string
  /** Size of the decoration */
  size?: 'small' | 'medium' | 'large'
  /** Type of decoration to render */
  variant?: 'flower' | 'leaf' | 'branch'
  /** Optional seed for consistent variation (e.g., index or position) */
  seed?: number | string
  /** Force a specific leaf variant (useful for symmetry in headers) */
  forceLeafVariant?: 'single' | 'pair'
}

/**
 * Decoration component that renders flowers, leaves, or branches
 * Acts as a dispatcher/factory pattern for different decoration types
 * Memoized to prevent unnecessary re-renders
 * 
 * @example
 * ```tsx
 * <FlowerDecoration size="medium" variant="flower" />
 * <FlowerDecoration size="small" variant="leaf" seed="header-left" />
 * ```
 */
const FlowerDecoration = memo(function FlowerDecoration({ 
  className = '', 
  size = 'medium',
  variant,
  seed,
  forceLeafVariant
}: FlowerDecorationProps) {
  const colors = useColors()
  const instanceIdRef = useRef<string | null>(null)
  
  // Auto-detect decoration type based on config if variant not specified
  const decorationType = variant || weddingConfig.decorationType || 'flower'
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  }

  // Initialize instance ID on first render for consistent variation
  if (instanceIdRef.current === null) {
    instanceIdRef.current = `decoration-${Date.now()}-${Math.random()}`
  }
  const defaultSeed = useDecorationSeed(instanceIdRef.current)

  // Generate varied leaf decoration when using leaf type
  const leafVariation = useMemo(() => {
    if (decorationType === 'leaf' && variant !== 'leaf') {
      // If forceLeafVariant is specified, use that with the base size
      if (forceLeafVariant) {
        return { size, variant: forceLeafVariant }
      }
      // Use provided seed, or use the default seed from instance ID
      const variationSeed = seed ?? defaultSeed
      return getVariedLeafDecoration(size, variationSeed)
    }
    return null
  }, [decorationType, variant, size, seed, forceLeafVariant, defaultSeed])

  // If decorationType is 'leaf' (from config), use LeafDecoration component with variants
  // But if variant='leaf' is explicitly passed, show the simple leaf
  if (decorationType === 'leaf' && variant !== 'leaf' && leafVariation) {
    // Use the separate LeafDecoration component with varied size and variant
    return <LeafDecoration className={className} size={leafVariation.size} variant={leafVariation.variant} />
  }

  // Simple leaf variant (when explicitly passed as variant="leaf")
  if (variant === 'leaf') {
    return (
      <div className={classNames(sizeClasses[size], className)}>
        <svg viewBox="0 0 100 100" className={classNames('w-full h-full opacity-60', colors.leaf)}>
          <path
            d="M50 20 Q30 40 35 60 Q40 80 50 85 Q60 80 65 60 Q70 40 50 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M50 20 L50 85"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    )
  }

  if (decorationType === 'branch') {
    return (
      <div className={classNames(sizeClasses[size], className)}>
        <svg viewBox="0 0 100 100" className={classNames('w-full h-full opacity-50', colors.branch)}>
          <path
            d="M20 50 Q40 30 60 50 Q80 70 90 60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="30" cy="45" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <circle cx="70" cy="55" r="4" fill="currentColor" />
        </svg>
      </div>
    )
  }

  // Default: flower - use color scheme colors
  return (
    <div className={classNames(sizeClasses[size], className)}>
      <svg viewBox="0 0 100 100" className={classNames('w-full h-full opacity-70', colors.flowerOuter)}>
        {/* Outer petals */}
        <ellipse cx="50" cy="25" rx="10" ry="15" fill="currentColor" />
        <ellipse cx="75" cy="50" rx="15" ry="10" fill="currentColor" />
        <ellipse cx="50" cy="75" rx="10" ry="15" fill="currentColor" />
        <ellipse cx="25" cy="50" rx="15" ry="10" fill="currentColor" />
        {/* Inner petals */}
        <ellipse cx="50" cy="30" rx="8" ry="12" className={colors.flowerInner} />
        <ellipse cx="70" cy="50" rx="12" ry="8" className={colors.flowerInner} />
        <ellipse cx="50" cy="70" rx="8" ry="12" className={colors.flowerInner} />
        <ellipse cx="30" cy="50" rx="12" ry="8" className={colors.flowerInner} />
        {/* Center */}
        <circle cx="50" cy="50" r="8" className={classNames('opacity-90', colors.flowerCenter)} />
        <circle cx="50" cy="50" r="4" className={colors.flowerCenter} />
      </svg>
    </div>
  )
})

FlowerDecoration.displayName = 'FlowerDecoration'

export default FlowerDecoration
