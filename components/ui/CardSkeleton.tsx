'use client'

import Skeleton from './Skeleton'

export interface CardSkeletonProps {
  /**
   * Show header skeleton
   */
  showHeader?: boolean
  /**
   * Show content skeleton
   */
  showContent?: boolean
  /**
   * Number of content lines
   */
  contentLines?: number
  /**
   * Show footer skeleton
   */
  showFooter?: boolean
}

/**
 * Card Skeleton component
 * Provides loading placeholder for Card components
 * Matches the structure of Card, CardHeader, CardContent, CardFooter
 * 
 * @example
 * ```tsx
 * <CardSkeleton showHeader showContent contentLines={3} />
 * ```
 */
export default function CardSkeleton({
  showHeader = true,
  showContent = true,
  contentLines = 2,
  showFooter = false,
}: CardSkeletonProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
      {showHeader && (
        <div className="p-4 pb-3 border-b border-gray-200">
          <Skeleton width="w-48" height="h-6" variant="rounded" />
        </div>
      )}
      {showContent && (
        <div className="p-4">
          <Skeleton variant="text" lines={contentLines} />
        </div>
      )}
      {showFooter && (
        <div className="p-4 pt-3 border-t border-gray-200">
          <Skeleton width="w-24" height="h-8" variant="rounded" />
        </div>
      )}
    </div>
  )
}
