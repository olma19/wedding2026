'use client'

import SectionWrapper from './SectionWrapper'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts } from '@/config/section-texts'

export default function AddressSection() {
  const { location } = weddingConfig
  const colors = useColors()
  const mapUrl = location.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`

  return (
    <SectionWrapper
      title="Adress"
      decorations={[
        { position: 'top-right', size: 'small', opacity: 0.2 },
      ]}
      className="py-16"
    >
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
          {sectionTexts.address.openInMaps}
        </a>
      </div>
    </SectionWrapper>
  )
}
