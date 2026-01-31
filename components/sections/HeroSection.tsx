import Image from 'next/image'
import FlowerDecoration from '../FlowerDecoration'
import { weddingConfig } from '@/config/wedding'

const HERO_IMAGE_PLACEHOLDER = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&q=80'

export default function HeroSection() {
  const { date, couple } = weddingConfig

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src={weddingConfig.hero?.imageUrl ?? HERO_IMAGE_PLACEHOLDER}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      
      {/* Floral decorations - subtle on dark overlay */}
      <div className="absolute top-10 left-10 opacity-20 transform rotate-12 animate-float pointer-events-none">
        <FlowerDecoration size="large" variant="flower" />
      </div>
      <div className="absolute top-20 right-20 opacity-15 transform -rotate-12 animate-float-slow pointer-events-none" style={{ animationDelay: '1s' }}>
        <FlowerDecoration size="medium" variant="branch" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 transform rotate-45 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <FlowerDecoration size="medium" variant="leaf" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-15 transform -rotate-45 animate-float-slow pointer-events-none" style={{ animationDelay: '3s' }}>
        <FlowerDecoration size="large" variant="flower" />
      </div>
      
      <div className="relative z-10 text-center px-4 pb-24 md:pb-32">
        {/* Names in one row */}
        {couple.name1 && couple.name2 && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white drop-shadow-md">
                {couple.name1}
              </h2>
              <span className="text-2xl md:text-3xl text-white/90">&</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white drop-shadow-md">
                {couple.name2}
              </h2>
            </div>
          </div>
        )}
        
        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-md">
          Vi gifter oss!
        </h1>
        
        {/* Year */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-white/80"></div>
          <span className="text-2xl md:text-3xl font-light text-white/95 italic drop-shadow-sm">
            {date.fullDate}
          </span>
          <div className="h-px w-16 bg-white/80"></div>
        </div>
        
        {/* Intro text */}
        {weddingConfig.hero?.introText && (
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-sm">
            {weddingConfig.hero.introText}
          </p>
        )}
      </div>
    </section>
  )
}
