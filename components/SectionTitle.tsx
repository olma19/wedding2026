'use client'

import FlowerDecoration from './FlowerDecoration'
import { useColors } from './ColorSchemeProvider'
import { useMemo } from 'react'
import { classNames } from '@/lib/utils/classNames'

interface SectionTitleProps {
  title: string
  flowerVariant?: 'flower' | 'leaf' | 'branch' | 'sage'
  showDivider?: boolean
  level?: 1 | 2 | 3
}

/**
 * Section Title Component
 * Displays a section title with decorative elements on both sides
 */
export default function SectionTitle({ 
  title, 
  flowerVariant,
  showDivider = true,
  level = 2
}: SectionTitleProps) {
  const colors = useColors()
  
  // Use a consistent seed based on title to ensure both decorations match
  const decorationSeed = useMemo(() => {
    return `section-title-${title}`
  }, [title])
  
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const headingClasses = classNames(
    'font-serif font-bold text-gray-800',
    level === 1 && 'text-4xl md:text-5xl',
    level === 2 && 'text-3xl md:text-4xl',
    level === 3 && 'text-2xl md:text-3xl'
  )
  
  // Filter out 'sage' variant as FlowerDecoration doesn't support it
  const decorationVariant = flowerVariant === 'sage' ? undefined : flowerVariant

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4" role="heading" aria-level={level}>
        <FlowerDecoration 
          size="small" 
          variant={decorationVariant} 
          className="opacity-50" 
          seed={decorationSeed}
          forceLeafVariant="single"
          aria-hidden="true"
        />
        <HeadingTag className={headingClasses}>
          {title}
        </HeadingTag>
        <FlowerDecoration 
          size="small" 
          variant={decorationVariant} 
          className="opacity-50" 
          seed={decorationSeed}
          forceLeafVariant="single"
          aria-hidden="true"
        />
      </div>
      {showDivider && (
        <div 
          className={classNames('h-1 w-24 mx-auto mb-8', colors.bgMedium)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
