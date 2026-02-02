'use client'

import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'

export default function AddressSection() {
  const { location } = weddingConfig
  const colors = useColors()
  const mapUrl = location.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`

  return (
    <section className={`relative py-16 px-4 ${colors.bgLight} overflow-hidden scroll-mt-20`}>
      <div className="absolute top-5 right-10 opacity-20 transform -rotate-12">
        <FlowerDecoration size="small" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title="Adress" />
        <ScrollAnimation delay={0}>
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">{location.fullAddress ?? location.address}</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 ${colors.bgDark} text-white font-medium rounded-lg ${colors.bgDarkHover} transition-colors shadow-md hover:shadow-lg`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Öppna i Google Maps
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
