'use client'

import SectionWrapper from './SectionWrapper'
import CountdownTimer from '../CountdownTimer'

export default function CountdownSection() {
  return (
    <SectionWrapper
      className="pt-8 pb-10 md:pt-10 md:pb-12"
      decorations={[
        { position: 'top-right', size: 'medium', opacity: 0.2 },
        { position: 'bottom-left', size: 'small', variant: 'leaf', opacity: 0.2 },
      ]}
      showScrollAnimation={false}
    >
      <CountdownTimer />
    </SectionWrapper>
  )
}
