'use client'

import SectionWrapper from './SectionWrapper'
import DetailCard from '../DetailCard'
import Icon from '../ui/Icon'
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
                icon={<Icon name="schedule" variant="plain" size="lg" className={colors.icon} />}
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
                icon={<Icon name="location_on" variant="plain" size="lg" className={colors.icon} />}
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
