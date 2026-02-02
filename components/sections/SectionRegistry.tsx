'use client'

import { lazy, Suspense } from 'react'
import { getEnabledSections } from '@/config/sections'
import type { ComponentType } from 'react'
import LoadingSpinner from '../LoadingSpinner'

// Lazy load heavy sections for code splitting
const CountdownSection = lazy(() => import('./CountdownSection'))
const StorySection = lazy(() => import('./StorySection'))
const WeddingDetailsSection = lazy(() => import('./WeddingDetailsSection'))
const VigselSection = lazy(() => import('./VigselSection'))
const AddressSection = lazy(() => import('./AddressSection'))
const DinnerPartySection = lazy(() => import('./DinnerPartySection'))
const DressCodeSection = lazy(() => import('./DressCodeSection'))
const GoodToKnowSection = lazy(() => import('./GoodToKnowSection'))
const ToastmasterSection = lazy(() => import('./ToastmasterSection'))
const OSASection = lazy(() => import('./OSASection'))
const RSVPSection = lazy(() => import('./RSVPSection'))

// Component mapping
const componentMap: Record<string, ComponentType<any>> = {
  'countdown': CountdownSection,
  'story': StorySection,
  'wedding-details': WeddingDetailsSection,
  'vigsel': VigselSection,
  'address': AddressSection,
  'dinner-party': DinnerPartySection,
  'dress-code': DressCodeSection,
  'good-to-know': GoodToKnowSection,
  'toastmaster': ToastmasterSection,
  'osa': OSASection,
  'rsvp': RSVPSection,
}

/**
 * Component that renders all enabled sections in order
 * Uses the section configuration system for dynamic rendering
 */
export default function SectionRegistry() {
  const sections = getEnabledSections()

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = componentMap[section.id]
        if (!SectionComponent) {
          console.warn(`Section component not found for id: ${section.id}`)
          return null
        }
        return (
          <Suspense
            key={section.id}
            fallback={
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <SectionComponent />
          </Suspense>
        )
      })}
    </>
  )
}
