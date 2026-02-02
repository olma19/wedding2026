'use client'

import { getEnabledSections } from '@/config/sections'
import type { ComponentType } from 'react'

// Import all section components directly
import CountdownSection from './CountdownSection'
import StorySection from './StorySection'
import WeddingDetailsSection from './WeddingDetailsSection'
import VigselSection from './VigselSection'
import AddressSection from './AddressSection'
import DinnerPartySection from './DinnerPartySection'
import DressCodeSection from './DressCodeSection'
import GoodToKnowSection from './GoodToKnowSection'
import ToastmasterSection from './ToastmasterSection'
import OSASection from './OSASection'
import RSVPSection from './RSVPSection'

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
        return <SectionComponent key={section.id} />
      })}
    </>
  )
}
