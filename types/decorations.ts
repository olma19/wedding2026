/**
 * Type definitions for decoration components
 */

/** Size options for decorations */
export type DecorationSize = 'small' | 'medium' | 'large'

/** Variant types for decorations */
export type DecorationVariant = 'flower' | 'leaf' | 'branch'

/** Variant types specifically for leaf decorations */
export type LeafVariant = 'single' | 'pair'

/**
 * Base props shared by all decoration components
 */
export interface BaseDecorationProps {
  /** Additional CSS classes */
  className?: string
  /** Size of the decoration */
  size?: DecorationSize
}

/**
 * Props for FlowerDecoration component
 */
export interface FlowerDecorationProps extends BaseDecorationProps {
  /** Type of decoration to render */
  variant?: DecorationVariant
  /** Seed for consistent variation */
  seed?: number | string
  /** Force a specific leaf variant (for symmetry) */
  forceLeafVariant?: LeafVariant
}

/**
 * Props for LeafDecoration component
 */
export interface LeafDecorationProps extends BaseDecorationProps {
  /** Leaf variant to display */
  variant?: LeafVariant
}

/**
 * Configuration for decorative elements
 * @deprecated Use DecorationConfig from types/sections.ts instead
 */
export interface DecorationConfig {
  /** Position of the decoration */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Size of the decoration */
  size?: DecorationSize
  /** Type of decoration */
  variant?: DecorationVariant
  /** Opacity level (0-1) */
  opacity?: number
  /** Rotation angle in degrees */
  rotation?: number
  /** Seed for consistent variation */
  seed?: string | number
}
