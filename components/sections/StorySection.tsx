'use client'

import SectionWrapper from './SectionWrapper'
import FlowerDecoration from '../FlowerDecoration'
import ScrollAnimation from '../ScrollAnimation'
import { useColors } from '../ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'
import { sectionTexts } from '@/config/section-texts'

export default function StorySection() {
  const { couple, story } = weddingConfig
  const colors = useColors()

  return (
    <SectionWrapper
      title={sectionTexts.story.title}
      titleVariant="leaf"
      customBackground={`bg-gradient-to-b from-white ${colors.bgLight}`}
      decorations={[]}
      showScrollAnimation={false}
      className="relative"
    >
      {/* Special decorative elements for StorySection */}
      <div className="absolute top-20 left-0 opacity-15 transform -translate-x-1/2 pointer-events-none">
        <FlowerDecoration size="large" variant="branch" />
      </div>
      <div className="absolute bottom-20 right-0 opacity-15 transform translate-x-1/2 rotate-180 pointer-events-none">
        <FlowerDecoration size="large" variant="branch" />
      </div>
      <div className="prose prose-lg max-w-none text-center">
        {couple.name1 && couple.name2 && (
          <ScrollAnimation delay={0}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {couple.name1} & {couple.name2}
            </p>
          </ScrollAnimation>
        )}
        {story.paragraphs.map((paragraph, index) => (
          <ScrollAnimation key={index} delay={index * 200}>
            <p 
              className={`text-lg md:text-xl text-gray-700 leading-relaxed ${
                index < story.paragraphs.length - 1 ? 'mb-6' : ''
              }`}
            >
              {paragraph}
            </p>
          </ScrollAnimation>
        ))}
      </div>
    </SectionWrapper>
  )
}
