'use client'

import SectionWrapper from './SectionWrapper'
import { weddingConfig } from '@/config/wedding'

export default function DressCodeSection() {
  const dressCode = weddingConfig.dressCode
  if (!dressCode?.title || !dressCode?.description) return null

  return (
    <SectionWrapper
      title={dressCode.title}
      titleVariant="branch"
      decorations={[
        { position: 'top-right', size: 'medium', opacity: 0.2 },
        { position: 'bottom-left', size: 'small', variant: 'leaf', opacity: 0.2 },
      ]}
    >
      <p className="text-center text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
        {dressCode.description}
      </p>
    </SectionWrapper>
  )
}
