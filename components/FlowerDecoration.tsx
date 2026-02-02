'use client'

import { useColors } from './ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'
import LeafDecoration from './LeafDecoration'
import { useMemo, useRef } from 'react'

interface FlowerDecorationProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'flower' | 'leaf' | 'branch'
  // Optional seed for consistent variation (e.g., index or position)
  seed?: number | string
  // Force a specific leaf variant (useful for symmetry in headers)
  forceLeafVariant?: 'single' | 'pair'
}

// Module-level counter for automatic variation
let decorationCounter = 0

// Helper function to generate varied leaf decorations based on seed
function getVariedLeafDecoration(
  baseSize: 'small' | 'medium' | 'large',
  seed: number | string = Math.random()
): { size: 'small' | 'medium' | 'large'; variant: 'single' | 'pair' } {
  // Convert seed to number if it's a string
  const seedNum = typeof seed === 'string' 
    ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : seed
  
  // Create variations based on seed
  const sizeVariation = seedNum % 3
  const variantVariation = Math.floor(seedNum / 3) % 2
  
  // Map base size to index: small=0, medium=1, large=2
  const sizeIndex = baseSize === 'small' ? 0 : baseSize === 'medium' ? 1 : 2
  
  // Vary size: sometimes go up/down one step
  const sizeOptions: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large']
  let variedSizeIndex = sizeIndex + (sizeVariation === 0 ? -1 : sizeVariation === 1 ? 0 : 1)
  // Clamp to valid range
  variedSizeIndex = Math.max(0, Math.min(2, variedSizeIndex))
  
  const size = sizeOptions[variedSizeIndex]
  const variant: 'single' | 'pair' = variantVariation === 0 ? 'single' : 'pair'
  
  return { size, variant }
}

export default function FlowerDecoration({ 
  className = '', 
  size = 'medium',
  variant,
  seed,
  forceLeafVariant
}: FlowerDecorationProps) {
  const colors = useColors()
  const instanceIdRef = useRef<number | null>(null)
  
  // Auto-detect decoration type based on config if variant not specified
  const decorationType = variant || weddingConfig.decorationType || 'flower'
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  }

  // Generate varied leaf decoration when using leaf type
  const leafVariation = useMemo(() => {
    if (decorationType === 'leaf' && variant !== 'leaf') {
      // If forceLeafVariant is specified, use that with the base size
      if (forceLeafVariant) {
        return { size, variant: forceLeafVariant }
      }
      // Use provided seed, or generate one based on instance counter
      // Initialize instance ID on first render
      if (instanceIdRef.current === null) {
        instanceIdRef.current = decorationCounter++
      }
      const variationSeed = seed ?? instanceIdRef.current
      return getVariedLeafDecoration(size, variationSeed)
    }
    return null
  }, [decorationType, variant, size, seed, forceLeafVariant])

  // If decorationType is 'leaf' (from config), use LeafDecoration component with variants
  // But if variant='leaf' is explicitly passed, show the simple leaf
  if (decorationType === 'leaf' && variant !== 'leaf' && leafVariation) {
    // Use the separate LeafDecoration component with varied size and variant
    return <LeafDecoration className={className} size={leafVariation.size} variant={leafVariation.variant} />
  }

  // Simple leaf variant (when explicitly passed as variant="leaf")
  if (variant === 'leaf') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.leaf} opacity-60`}>
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
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.branch} opacity-50`}>
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
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.flowerOuter} opacity-70`}>
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
        <circle cx="50" cy="50" r="8" className={`${colors.flowerCenter} opacity-90`} />
        <circle cx="50" cy="50" r="4" className={colors.flowerCenter} />
      </svg>
    </div>
  )
}
