'use client'

import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

interface SectionDividerProps {
  className?: string
  width?: 'sm' | 'md' | 'lg'
  height?: 'sm' | 'md' | 'lg'
}

const widthClasses = {
  sm: 'w-16',
  md: 'w-24',
  lg: 'w-32',
}

const heightClasses = {
  sm: 'h-0.5',
  md: 'h-1',
  lg: 'h-2',
}

/**
 * Section divider component
 * Consistent divider used across sections (RSVP, OSA, etc.)
 */
export default function SectionDivider({
  className = '',
  width = 'md',
  height = 'md',
}: SectionDividerProps) {
  const colors = useColors()

  return (
    <div
      className={classNames(
        'mx-auto mb-4',
        widthClasses[width],
        heightClasses[height],
        colors.bgMedium,
        className
      )}
      aria-hidden="true"
    />
  )
}
