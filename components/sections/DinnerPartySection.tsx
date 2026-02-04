'use client'

import SectionWrapper from './SectionWrapper'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts } from '@/config/section-texts'

export default function DinnerPartySection() {
  const { dinnerParty } = weddingConfig
  const colors = useColors()

  return (
    <SectionWrapper
      title={sectionTexts['dinner-party'].title}
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'bottom-right', size: 'small', variant: 'leaf', opacity: 0.2 },
      ]}
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        {dinnerParty.time && (
          <p className={`text-xl font-semibold ${colors.text}`}>{dinnerParty.time}</p>
        )}
        {dinnerParty.place && (
          <p className="text-lg font-medium text-gray-800">{dinnerParty.place}</p>
        )}
        {dinnerParty.address && (
          <p className="text-lg text-gray-700">{dinnerParty.address}</p>
        )}
        {dinnerParty.mapUrl && (
          <a
            href={dinnerParty.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-sm font-medium underline ${colors.text} ${colors.textHover}`}
          >
            Visa på karta
          </a>
        )}
        <p className="text-lg text-gray-600 leading-relaxed">{dinnerParty.description}</p>
      </div>
    </SectionWrapper>
  )
}
