import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'

export default function StorySection() {
  const { couple, story } = weddingConfig

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 opacity-15 transform -translate-x-1/2">
        <FlowerDecoration size="large" variant="branch" />
      </div>
      <div className="absolute bottom-20 right-0 opacity-15 transform translate-x-1/2 rotate-180">
        <FlowerDecoration size="large" variant="branch" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title="Vår berättelse" flowerVariant="leaf" />
        
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
      </div>
    </section>
  )
}
