'use client'

import Image from 'next/image'
import SectionWrapper from './SectionWrapper'
import DetailCard from '../DetailCard'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts } from '@/config/section-texts'

export default function CeremonySection() {
  const { date, ceremony, location } = weddingConfig
  const colors = useColors()

  return (
    <SectionWrapper
      title={sectionTexts.ceremony.title}
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'bottom-right', size: 'medium', opacity: 0.2 },
      ]}
      showScrollAnimation={false}
    >
      <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src="/images/kyrka.jpg"
          alt="Kyrka"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-6 text-center">
        <ScrollAnimation delay={0}>
          <div className="transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <DetailCard
              icon={<Icon name="calendar_today" variant="plain" size="lg" className={colors.icon} />}
              title={sectionTexts.ceremony.date.label}
              subtitle={date.day}
              mainText={date.fullDate}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <DetailCard
              icon={<Icon name="schedule" variant="plain" size="lg" className={colors.icon} />}
              title={sectionTexts.ceremony.time.label}
              subtitle={ceremony.description}
              mainText={ceremony.time}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <div className="transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <DetailCard
              icon={<Icon name="location_on" variant="plain" size="lg" className={colors.icon} />}
              title={sectionTexts.ceremony.location.label}
              subtitle={location.name}
              mainText={location.address}
            />
            {location.mapUrl && (
              <Button asChild className="mt-3">
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visa på karta
                </a>
              </Button>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </SectionWrapper>
  )
}
