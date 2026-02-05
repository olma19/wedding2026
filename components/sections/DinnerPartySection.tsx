'use client'

import SectionWrapper from './SectionWrapper'
import DetailCard from '../DetailCard'
import ScrollAnimation from '../ScrollAnimation'
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
      <div className="flex flex-col justify-center items-center gap-6 text-center max-w-2xl mx-auto">
        {dinnerParty.time && (
          <ScrollAnimation delay={0}>
            <div className="transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <DetailCard
                icon={
                  <svg className={`w-6 h-6 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Tid"
                subtitle="Middag och fest"
                mainText={dinnerParty.time}
              />
            </div>
          </ScrollAnimation>
        )}

        {(dinnerParty.place || dinnerParty.address) && (
          <ScrollAnimation delay={200}>
            <div className="transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <DetailCard
                icon={
                  <svg className={`w-6 h-6 ${colors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Plats"
                subtitle={dinnerParty.place ?? ''}
                mainText={dinnerParty.address ?? ''}
              />
              {dinnerParty.mapUrl && (
                <a
                  href={dinnerParty.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white shadow-md transition-all ${colors.bgDark} hover:shadow-lg ${colors.bgDarkHover}`}
                >
                  Visa på karta
                </a>
              )}
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation delay={300}>
          <div className="text-lg text-gray-600 leading-relaxed w-full mt-2">
            {dinnerParty.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </SectionWrapper>
  )
}
