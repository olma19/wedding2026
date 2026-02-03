'use client'

import SectionWrapper from './SectionWrapper'
import DetailCard from '../DetailCard'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts } from '@/config/section-texts'

export default function WeddingDetailsSection() {
  const { date, ceremony, location } = weddingConfig
  const colors = useColors()

  return (
    <SectionWrapper
      title={sectionTexts['wedding-details'].title}
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'top-right', size: 'small', variant: 'leaf', opacity: 0.2 },
        { position: 'bottom-left', size: 'small', variant: 'branch', opacity: 0.2 },
        { position: 'bottom-right', size: 'medium', opacity: 0.2 },
      ]}
      showScrollAnimation={false}
    >
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <ScrollAnimation delay={0}>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <DetailCard
              icon={
                <svg className={`w-8 h-8 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title={sectionTexts['wedding-details'].date.label}
              subtitle={date.day}
              mainText={date.fullDate}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <DetailCard
              icon={
                <svg className={`w-8 h-8 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Tid"
              subtitle={ceremony.description}
              mainText={ceremony.time}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <DetailCard
              icon={
                <svg className={`w-8 h-8 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title={sectionTexts['wedding-details'].location.label}
              subtitle={location.name}
              mainText={location.address}
            />
          </div>
        </ScrollAnimation>
      </div>
    </SectionWrapper>
  )
}
