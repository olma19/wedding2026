/**
 * Section Configuration System
 * Defines which sections are enabled, their order, and metadata
 * 
 * Note: Component imports are done in SectionRegistry.tsx to avoid
 * server/client component mixing issues
 */

export interface SectionConfig {
  id: string
  enabled: boolean
  order: number
  title?: string
  metadata?: Record<string, unknown>
}

/**
 * Section registry - defines all available sections
 * Sections are rendered in order based on the `order` property
 * Note: HeroSection is excluded as it's rendered separately in page.tsx
 */
export const sectionRegistry: SectionConfig[] = [
  {
    id: 'countdown',
    enabled: true,
    order: 2,
    title: 'Countdown',
  },
  {
    id: 'story',
    enabled: true,
    order: 3,
    title: 'Vår berättelse',
  },
  {
    id: 'ceremony',
    enabled: true,
    order: 4,
    title: 'Vigsel',
  },
  {
    id: 'dinner-party',
    enabled: true,
    order: 5,
    title: 'Middag & Fest',
  },
  {
    id: 'good-to-know',
    enabled: true,
    order: 6,
    title: 'Bra att veta',
  },
  {
    id: 'toastmaster',
    enabled: true,
    order: 7,
    title: 'Toastmaster',
  },
  {
    id: 'rsvp',
    enabled: true,
    order: 8,
    title: 'OSA',
  },
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
 * Enable/disable a section
 */
export function setSectionEnabled(id: string, enabled: boolean): void {
  const section = getSectionById(id)
  if (section) {
    section.enabled = enabled
  }
}

/**
 * Update section order
 */
export function setSectionOrder(id: string, order: number): void {
  const section = getSectionById(id)
  if (section) {
    section.order = order
  }
}
