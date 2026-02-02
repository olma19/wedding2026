import type { ReactNode } from 'react'

export interface DecorationConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'small' | 'medium' | 'large'
  variant?: 'flower' | 'leaf' | 'branch'
  opacity?: number
  rotation?: number
  seed?: string | number
}

export interface SectionWrapperProps {
  children: ReactNode
  title?: string
  titleVariant?: 'flower' | 'leaf' | 'branch' | 'sage'
  decorations?: DecorationConfig[]
  className?: string
  background?: 'light' | 'white' | 'custom'
  customBackground?: string
  containerClassName?: string
  scrollAnimationDelay?: number
  showScrollAnimation?: boolean
  scrollMargin?: boolean
}
