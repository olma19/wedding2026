'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   * Can be a Tailwind width class or 'full' for 100%
   */
  width?: string | 'full'
  /**
   * Height of the skeleton
   * Can be a Tailwind height class or number for pixels
   */
  height?: string | number
  /**
   * Shape of the skeleton
   */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /**
   * Animation speed
   */
  animation?: 'pulse' | 'wave' | 'none'
  /**
   * Number of lines for text variant
   */
  lines?: number
}

/**
 * Base Skeleton component
 * Provides loading placeholders with smooth animations
 * 
 * @example
 * ```tsx
 * <Skeleton width="w-48" height="h-4" />
 * <Skeleton variant="circular" width="w-12" height="h-12" />
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export default function Skeleton({
  width = 'w-full',
  height,
  variant = 'rectangular',
  animation = 'pulse',
  lines = 1,
  className = '',
  ...props
}: SkeletonProps) {
  // Determine height class
  let heightClass: string
  if (typeof height === 'number') {
    heightClass = `h-[${height}px]`
  } else if (height) {
    heightClass = height
  } else {
    // Default heights based on variant
    if (variant === 'text') {
      heightClass = 'h-4'
    } else if (variant === 'circular') {
      heightClass = 'w-full'
    } else {
      heightClass = 'h-4'
    }
  }

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-skeleton-pulse',
    wave: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:1000px_100%] animate-[shimmer_2s_infinite]',
    none: '',
  }

  const baseClasses = cn(
    'bg-gray-200 dark:bg-gray-700',
    'opacity-100', // Ensure visibility
    variantClasses[variant],
    animationClasses[animation],
    width === 'full' ? 'w-full' : width,
    heightClass,
    className
  )

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
          />
        ))}
      </div>
    )
  }

  return <div className={baseClasses} {...props} />
}
