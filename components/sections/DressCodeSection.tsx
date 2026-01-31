import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import { weddingConfig } from '@/config/wedding'

export default function DressCodeSection() {
  const dressCode = weddingConfig.dressCode
  if (!dressCode?.title || !dressCode?.description) return null

  return (
    <section className="relative py-20 px-4 bg-pink-50 overflow-hidden scroll-mt-20">
      <div className="absolute top-10 right-5 opacity-20 transform -rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 transform rotate-45">
        <FlowerDecoration size="small" variant="leaf" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle title={dressCode.title} flowerVariant="branch" />
        <ScrollAnimation delay={0}>
          <p className="text-center text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            {dressCode.description}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  )
}
