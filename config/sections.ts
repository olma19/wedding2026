/**
 * Section Configuration System
 * Defines which sections are enabled, their order, and metadata.
 * Section titles are not stored here – use getSectionTitle(sectionId) from section-texts.
 *
 * Note: Component imports are done in SectionRegistry.tsx to avoid
 * server/client component mixing issues.
 */

export interface SectionConfig {
  id: string
  enabled: boolean
  order: number
  metadata?: Record<string, unknown>
}

/**
 * Section registry - defines all available sections
 * Sections are rendered in order based on the `order` property
 * Note: HeroSection is excluded as it's rendered separately in page.tsx
 */
export const sectionRegistry: SectionConfig[] = [
  { id: 'countdown', enabled: true, order: 2 },
  { id: 'story', enabled: true, order: 3 },
  { id: 'ceremony', enabled: true, order: 4 },
  { id: 'dinner-party', enabled: true, order: 5 },
  { id: 'good-to-know', enabled: true, order: 6 },
  { id: 'toastmaster', enabled: true, order: 7 },
  { id: 'rsvp', enabled: true, order: 8 },
]

/**
 * Get enabled sections sorted by order
 */
export function getEnabledSections(): SectionConfig[] {
  return sectionRegistry
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order)
}

/**
 * Get a section by ID
 */
export function getSectionById(id: string): SectionConfig | undefined {
  return sectionRegistry.find((section) => section.id === id)
}

/**
 * Enable/disable a section. Mutates the sectionRegistry in place.
 */
export function setSectionEnabled(id: string, enabled: boolean): void {
  const section = getSectionById(id)
  if (section) {
    section.enabled = enabled
  }
}

/**
 * Update section order. Mutates the sectionRegistry in place.
 */
export function setSectionOrder(id: string, order: number): void {
  const section = getSectionById(id)
  if (section) {
    section.order = order
  }
}
