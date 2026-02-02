'use client'

import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'

export default function DinnerPartySection() {
  const { dinnerParty } = weddingConfig
  const colors = useColors()

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden scroll-mt-20">
      <div className="absolute top-10 left-5 opacity-20 transform rotate-45">
        <FlowerDecoration size="medium" />
      </div>
      <div className="absolute bottom-10 right-5 opacity-20 transform -rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title={dinnerParty.title} />
        <ScrollAnimation delay={0}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            {dinnerParty.time && (
              <p className={`text-xl font-semibold ${colors.text}`}>{dinnerParty.time}</p>
            )}
            {dinnerParty.place && (
              <p className="text-lg text-gray-700">{dinnerParty.place}</p>
            )}
            <p className="text-lg text-gray-600 leading-relaxed">{dinnerParty.description}</p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
