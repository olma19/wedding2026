'use client'

import FlowerDecoration from './FlowerDecoration'
import { useColors } from './ColorSchemeProvider'
import { useMemo } from 'react'

interface SectionTitleProps {
  title: string
  flowerVariant?: 'flower' | 'leaf' | 'branch' | 'sage'
  showDivider?: boolean
}

export default function SectionTitle({ 
  title, 
  flowerVariant,
  showDivider = true 
}: SectionTitleProps) {
  const colors = useColors()
  
  // Use a consistent seed based on title to ensure both decorations match
  const decorationSeed = useMemo(() => {
    return `section-title-${title}`
  }, [title])
  
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <FlowerDecoration 
          size="small" 
          variant={flowerVariant} 
          className="opacity-50" 
          seed={decorationSeed}
          forceLeafVariant="single"
        />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          {title}
        </h2>
        <FlowerDecoration 
          size="small" 
          variant={flowerVariant} 
          className="opacity-50" 
          seed={decorationSeed}
          forceLeafVariant="single"
        />
      </div>
      {showDivider && <div className={`h-1 w-24 ${colors.bgMedium} mx-auto mb-8`}></div>}
    </div>
  )
}
