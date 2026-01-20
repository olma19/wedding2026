import FlowerDecoration from '../FlowerDecoration'
import CountdownTimer from '../CountdownTimer'
import { weddingConfig } from '@/config/wedding'

export default function HeroSection() {
  const { date, couple } = weddingConfig

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floral decorations */}
      <div className="absolute top-10 left-10 opacity-30 transform rotate-12 animate-float">
        <FlowerDecoration size="large" variant="flower" />
      </div>
      <div className="absolute top-20 right-20 opacity-25 transform -rotate-12 animate-float-slow" style={{ animationDelay: '1s' }}>
        <FlowerDecoration size="medium" variant="branch" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-30 transform rotate-45 animate-float" style={{ animationDelay: '2s' }}>
        <FlowerDecoration size="medium" variant="leaf" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-25 transform -rotate-45 animate-float-slow" style={{ animationDelay: '3s' }}>
        <FlowerDecoration size="large" variant="flower" />
      </div>
      
      <div className="relative z-10 text-center px-4 py-20">
        <div className="mb-6">
          {couple.name1 && couple.name2 && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-gray-700 mb-2">
                {couple.name1}
              </h2>
              <div className="flex items-center justify-center gap-3 my-4">
                <div className="h-px w-12 bg-pink-400"></div>
                <span className="text-2xl text-pink-500">&</span>
                <div className="h-px w-12 bg-pink-400"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-gray-700">
                {couple.name2}
              </h2>
            </div>
          )}
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
            Vi gifter oss!
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-pink-400"></div>
            <span className="text-2xl md:text-3xl font-light text-gray-700 italic">
              {date.year}
            </span>
            <div className="h-px w-16 bg-pink-400"></div>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
          Vi ser fram emot att dela denna speciella dag med dig
        </p>
        <CountdownTimer />
      </div>
    </section>
  )
}
