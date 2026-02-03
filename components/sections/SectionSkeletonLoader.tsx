'use client'

import SectionSkeleton from '../ui/SectionSkeleton'
import CardSkeleton from '../ui/CardSkeleton'
import Skeleton from '../ui/Skeleton'

/**
 * Section-specific skeleton loaders
 * Maps section IDs to appropriate skeleton components
 */
const sectionSkeletonMap: Record<string, () => React.ReactNode> = {
  'good-to-know': () => (
    <SectionSkeleton showTitle showCards cardCount={2} />
  ),
  'wedding-details': () => (
    <div className="py-20 px-4 animate-in">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Skeleton width="w-64" height="h-10" variant="rounded" className="mx-auto mb-4" />
          <Skeleton width="w-48" height="h-1" variant="rounded" className="mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 animate-in fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Skeleton variant="circular" width="w-12" height={48} className="mx-auto" />
              <Skeleton width="w-24" height="h-4" className="mx-auto" />
              <Skeleton width="w-32" height="h-4" className="mx-auto" />
              <Skeleton width="w-40" height="h-6" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  'vigsel': () => (
    <div className="py-20 px-4 animate-in">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Skeleton width="w-64" height="h-10" variant="rounded" className="mx-auto mb-4" />
          <Skeleton width="w-48" height="h-1" variant="rounded" className="mx-auto" />
        </div>
        <div className="space-y-8">
          <Skeleton width="w-full" height="h-64" variant="rounded" className="rounded-lg animate-in" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 text-center animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Skeleton variant="circular" width="w-12" height={48} className="mx-auto" />
                <Skeleton width="w-20" height="h-4" className="mx-auto" />
                <Skeleton width="w-32" height="h-6" className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  'story': () => (
    <SectionSkeleton showTitle showContent contentLines={4} />
  ),
  'rsvp': () => (
    <div className="py-20 px-4 animate-in">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Skeleton width="w-64" height="h-10" variant="rounded" className="mx-auto mb-4" />
          <Skeleton width="w-48" height="h-1" variant="rounded" className="mx-auto" />
        </div>
        <div className="max-w-2xl mx-auto animate-in">
          <CardSkeleton showHeader showContent contentLines={5} />
        </div>
      </div>
    </div>
  ),
  'countdown': () => (
    <SectionSkeleton showTitle showContent contentLines={2} />
  ),
  'address': () => (
    <SectionSkeleton showTitle showContent contentLines={3} />
  ),
  'dinner-party': () => (
    <SectionSkeleton showTitle showContent contentLines={3} />
  ),
  'dress-code': () => (
    <SectionSkeleton showTitle showContent contentLines={2} />
  ),
  'toastmaster': () => (
    <SectionSkeleton showTitle showContent contentLines={3} />
  ),
}

/**
 * Get appropriate skeleton loader for a section
 */
export function getSectionSkeleton(sectionId: string): React.ReactNode {
  const SkeletonComponent = sectionSkeletonMap[sectionId]
  
  if (SkeletonComponent) {
    return <SkeletonComponent />
  }
  
  // Default skeleton for unknown sections
  return <SectionSkeleton showTitle showContent contentLines={3} />
}
