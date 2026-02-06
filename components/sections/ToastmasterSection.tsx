'use client'

import Image from 'next/image'
import SectionWrapper from './SectionWrapper'
import ScrollAnimation from '../ScrollAnimation'
import Card from '../ui/Card'
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

      {/* Two separate cards: Toastmadame and Toastmaster */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
        {(['toastmadame', 'toastmaster'] as const).map((role, cardIndex) => {
          const person = people.find((p) => p.role === role)
            ?? people[role === 'toastmadame' ? 0 : 1]
          if (!person) return null
          const cardTitle = role === 'toastmadame' ? 'Toastmadame' : 'Toastmaster'
          const iconRight = role === 'toastmaster'
          return (
            <ScrollAnimation key={role} delay={200 + cardIndex * 100}>
              <Card variant="default" className="rounded-xl overflow-hidden flex-1 min-w-0 w-full">
                {/* Full-width header with icon on side (opposite per card) */}
                <div className={`w-full py-4 px-6 flex items-center justify-center gap-3 ${colors.bgLight} ${iconRight ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/60" aria-hidden>
                    <span className="text-2xl">{role === 'toastmaster' ? '🍻' : '🥂'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 tracking-tight flex-1 text-center">
                    {cardTitle}
                  </h3>
                  <div className="w-10 flex-shrink-0" aria-hidden />
                </div>
                {/* Contact info */}
                <div className="p-6 flex flex-col justify-center text-center items-center">
                    <p className="font-semibold text-gray-800 text-lg mb-3">
                      {person.firstName} {person.lastName}
                    </p>
                    <div className="text-gray-600 text-sm space-y-2 flex flex-col items-center">
                      {person.phone && (
                        <a
                          href={`tel:${person.phone.replace(/\s/g, '')}`}
                          className={`inline-flex items-center gap-2 ${colors.textHover} transition-colors`}
                        >
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{person.phone}</span>
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className={`inline-flex items-center gap-2 ${colors.textHover} transition-colors`}
                        >
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{person.email}</span>
                        </a>
                      )}
                    </div>
                </div>
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
