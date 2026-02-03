'use client'

import Skeleton from './Skeleton'

export interface SectionSkeletonProps {
  /**
   * Show title skeleton
   */
  showTitle?: boolean
  /**
   * Show content skeleton
   */
  showContent?: boolean
  /**
   * Number of content lines
   */
  contentLines?: number
  /**
   * Show card grid skeleton (for sections with cards)
   */
  showCards?: boolean
  /**
   * Number of cards in grid
   */
  cardCount?: number
}

/**
 * Section Skeleton component
 * Provides loading placeholder for section components
 * Matches the structure of SectionWrapper
 * 
 * @example
 * ```tsx
 * <SectionSkeleton showTitle showContent contentLines={3} />
 * <SectionSkeleton showTitle showCards cardCount={3} />
 * ```
 */
export default function SectionSkeleton({
  showTitle = true,
  showContent = true,
  contentLines = 3,
  showCards = false,
  cardCount = 2,
}: SectionSkeletonProps) {
  return (
    <div className="py-20 px-4 animate-in">
      <div className="container mx-auto max-w-4xl">
        {/* Title skeleton */}
        {showTitle && (
          <div className="mb-12 text-center">
            <Skeleton width="w-64" height="h-10" variant="rounded" className="mx-auto mb-4" />
            <Skeleton width="w-48" height="h-1" variant="rounded" className="mx-auto" />
          </div>
        )}

        {/* Content skeleton */}
        {showContent && !showCards && (
          <div className="space-y-4">
            <Skeleton variant="text" lines={contentLines} />
          </div>
        )}

        {/* Card grid skeleton */}
        {showCards && (
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: cardCount }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Skeleton width="w-32" height="h-6" variant="rounded" className="mb-4" />
                <Skeleton variant="text" lines={2} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
