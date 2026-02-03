'use client'

import SectionWrapper from './SectionWrapper'
import SectionTitle from '../SectionTitle'
import RSVPForm from '../RSVPForm'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts, formatSectionText } from '@/config/section-texts'

export default function RSVPSection() {
  const { rsvp } = weddingConfig
  const colors = useColors()

  return (
    <SectionWrapper
      id="rsvp"
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'top-right', size: 'small', variant: 'leaf', opacity: 0.2 },
        { position: 'bottom-right', size: 'medium', opacity: 0.2 },
      ]}
      scrollMargin={false}
      showScrollAnimation={false}
    >
      <div className="text-center mb-12">
        <SectionTitle title={sectionTexts.rsvp.title} showDivider={false} />
        <div className={`h-1 w-24 ${colors.bgMedium} mx-auto mb-4`}></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {formatSectionText(sectionTexts.rsvp.description, { deadline: rsvp.deadline.toLowerCase() })}
        </p>
      </div>
      
      <div className="mt-12">
        <RSVPForm />
      </div>
    </SectionWrapper>
  )
}
