'use client'

import Image from 'next/image'
import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'

export default function ToastmasterSection() {
  const { toastmaster } = weddingConfig
  const colors = useColors()
  const people = toastmaster.people ?? []

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden scroll-mt-20">
      <div className="absolute top-10 left-5 opacity-20 transform rotate-12">
        <FlowerDecoration size="medium" />
      </div>
      <div className="absolute bottom-5 right-10 opacity-20 transform -rotate-45">
        <FlowerDecoration size="small" variant="branch" />
      </div>

      <div className="container mx-auto max-w-4xl md:max-w-6xl relative z-10">
        <SectionTitle title={toastmaster.title} />

        <ScrollAnimation delay={0}>
          <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            {toastmaster.speechNote}
          </p>
        </ScrollAnimation>

        {/* Shared image */}
        {toastmaster.imageUrl && (
          <ScrollAnimation delay={100}>
            <div className="relative w-full aspect-[4/3] md:h-[800px] rounded-lg overflow-hidden shadow-xl mb-8">
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
      </div>
    </section>
  )
}
