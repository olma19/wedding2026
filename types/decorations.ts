/**
 * Type definitions for decoration components
 */

export type DecorationSize = 'small' | 'medium' | 'large'
export type DecorationVariant = 'flower' | 'leaf' | 'branch'
export type LeafVariant = 'single' | 'pair'

export interface BaseDecorationProps {
  className?: string
  size?: DecorationSize
}

export interface FlowerDecorationProps extends BaseDecorationProps {
  variant?: DecorationVariant
  seed?: number | string
  forceLeafVariant?: LeafVariant
}

export interface LeafDecorationProps extends BaseDecorationProps {
  variant?: LeafVariant
}

export interface DecorationConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: DecorationSize
  variant?: DecorationVariant
  opacity?: number
  rotation?: number
  seed?: string | number
}
