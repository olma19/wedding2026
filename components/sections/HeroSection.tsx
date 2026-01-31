import Image from 'next/image'
import FlowerDecoration from '../FlowerDecoration'
import { weddingConfig } from '@/config/wedding'

const HERO_IMAGE_PLACEHOLDER = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&q=80'

export default function HeroSection() {
  const { date, couple } = weddingConfig

  return (
    <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 overflow-hidden">
      {/* Floral decorations */}
      <div className="absolute top-10 left-5 opacity-20 transform rotate-12 animate-float pointer-events-none">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute top-5 right-10 opacity-20 transform -rotate-12 animate-float-slow pointer-events-none" style={{ animationDelay: '1s' }}>
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Names in one row above image */}
        {couple.name1 && couple.name2 && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-800">
                {couple.name1}
              </h2>
              <span className="text-2xl md:text-3xl text-pink-500">&</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-800">
                {couple.name2}
              </h2>
            </div>
          </div>
        )}

        {/* Image - not full screen */}
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-lg overflow-hidden shadow-xl mb-6">
          <Image
            src={weddingConfig.hero?.imageUrl ?? HERO_IMAGE_PLACEHOLDER}
            alt={`${couple.name1} & ${couple.name2}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Text below image */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-3 tracking-tight">
            Vi gifter oss!
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <div className="h-px w-12 md:w-16 bg-pink-400"></div>
            <span className="text-xl md:text-2xl font-light text-gray-700 italic">
              {date.year}
            </span>
            <div className="h-px w-12 md:w-16 bg-pink-400"></div>
          </div>
          {weddingConfig.hero?.introText && (
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
              {weddingConfig.hero.introText}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
