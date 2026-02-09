'use client'

import { lazy, Suspense } from 'react'
import { getEnabledSections } from '@/config/sections'
import type { ComponentType } from 'react'
import { getSectionSkeleton } from './SectionSkeletonLoader'
import { SectionIndexProvider } from './SectionIndexContext'

// Lazy load heavy sections for code splitting
const CountdownSection = lazy(() => import('./CountdownSection'))
const StorySection = lazy(() => import('./StorySection'))
const CeremonySection = lazy(() => import('./CeremonySection'))
const DinnerPartySection = lazy(() => import('./DinnerPartySection'))
const GoodToKnowSection = lazy(() => import('./GoodToKnowSection'))
const ToastmasterSection = lazy(() => import('./ToastmasterSection'))
const RSVPSection = lazy(() => import('./RSVPSection'))

/** Section components receive no props; they read from config/context. */
const componentMap: Record<string, ComponentType<object>> = {
  'countdown': CountdownSection,
  'story': StorySection,
  'ceremony': CeremonySection,
  'dinner-party': DinnerPartySection,
  'good-to-know': GoodToKnowSection,
  'toastmaster': ToastmasterSection,
  'rsvp': RSVPSection,
}

/**
 * Component that renders all enabled sections in order
 * Uses the section configuration system for dynamic rendering
 * 
 * Uses skeleton loaders instead of spinners for better perceived performance
 */
export default function SectionRegistry() {
  const sections = getEnabledSections()

  return (
    <>
      {sections.map((section, index) => {
        const SectionComponent = componentMap[section.id]
        if (!SectionComponent) {
          console.warn(`Section component not found for id: ${section.id}`)
          return null
        }
        return (
          <SectionIndexProvider key={section.id} index={index}>
            <Suspense fallback={getSectionSkeleton(section.id)}>
              <SectionComponent />
            </Suspense>
          </SectionIndexProvider>
        )
      })}
    </>
  )
}
