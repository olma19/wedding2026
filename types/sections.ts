import type { ReactNode } from 'react'

/**
 * Configuration for decorative elements in sections
 */
export interface DecorationConfig {
  /** Position of the decoration relative to the section */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Size of the decoration */
  size?: 'small' | 'medium' | 'large'
  /** Type of decoration */
  variant?: 'flower' | 'leaf' | 'branch'
  /** Opacity level (0-1) */
  opacity?: number
  /** Rotation angle (number in degrees) or Tailwind class (string) */
  rotation?: number | string
  /** Seed for consistent variation */
  seed?: string | number
}

/**
 * Props for SectionWrapper component
 * Provides consistent structure and styling for all page sections
 */
export interface SectionWrapperProps {
  /** Section content */
  children: ReactNode
  /** Optional section title */
  title?: string
  /** Decoration variant for the title */
  titleVariant?: 'flower' | 'leaf' | 'branch' | 'sage'
  /** Array of decorative elements to place around the section */
  decorations?: DecorationConfig[]
  /** Additional CSS classes for the section */
  className?: string
  /** Background type */
  background?: 'light' | 'white' | 'custom'
  /** Custom background CSS class */
  customBackground?: string
  /** Additional CSS classes for the inner container */
  containerClassName?: string
  /** Delay for scroll animation (in milliseconds) */
  scrollAnimationDelay?: number
  /** Whether to wrap content in scroll animation */
  showScrollAnimation?: boolean
  /** Whether to add scroll margin for navigation */
  scrollMargin?: boolean
  /** Section ID for anchor links */
  id?: string
}
