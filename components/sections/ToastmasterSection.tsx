'use client'

import Image from 'next/image'
import SectionWrapper from './SectionWrapper'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts } from '@/config/section-texts'

export default function ToastmasterSection() {
  const { toastmaster } = weddingConfig
  const colors = useColors()
  const people = toastmaster.people ?? []

  return (
    <SectionWrapper
      title={sectionTexts.toastmaster.title}
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'bottom-right', size: 'small', variant: 'branch', opacity: 0.2 },
      ]}
      containerClassName="md:max-w-6xl"
      showScrollAnimation={false}
    >
      <ScrollAnimation delay={0}>
        <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {toastmaster.speechNote}
        </p>
      </ScrollAnimation>

      {/* Shared image */}
      {toastmaster.imageUrl && (
        <ScrollAnimation delay={100}>
          <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:h-[800px] rounded-lg overflow-hidden shadow-xl mb-8">
            <Image
              src={toastmaster.imageUrl}
              alt={toastmaster.title}
              fill
              className="object-cover object-top md:object-center"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
          </div>
        </ScrollAnimation>
      )}

      {/* People with names and contact */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {people.map((person, index) => (
          <ScrollAnimation key={`${person.firstName}-${person.lastName}-${index}`} delay={200 + index * 100}>
            <div className="text-center">
              <p className="font-semibold text-gray-800 text-lg mb-2">
                {person.firstName} {person.lastName}
              </p>
              <div className="text-gray-600 text-sm space-y-1">
                {person.phone && (
                  <p>
                    <a href={`tel:${person.phone.replace(/\s/g, '')}`} className={`${colors.textHover} transition-colors`}>
                      {person.phone}
                    </a>
                  </p>
                )}
                {person.email && (
                  <p>
                    <a href={`mailto:${person.email}`} className={`${colors.textHover} transition-colors`}>
                      {person.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </SectionWrapper>
  )
}
