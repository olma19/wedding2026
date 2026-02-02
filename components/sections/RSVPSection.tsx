'use client'

import SectionWrapper from './SectionWrapper'
import SectionTitle from '../SectionTitle'
import RSVPForm from '../RSVPForm'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'

export default function RSVPSection() {
  const { rsvpDeadline } = weddingConfig
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
        <SectionTitle title="RSVP" showDivider={false} />
        <div className={`h-1 w-24 ${colors.bgMedium} mx-auto mb-4`}></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vänligen bekräfta din närvaro {rsvpDeadline.toLowerCase()}. 
          Vi ser fram emot att höra från dig!
        </p>
      </div>
      
      <div className="mt-12">
        <RSVPForm />
      </div>
    </SectionWrapper>
  )
}
