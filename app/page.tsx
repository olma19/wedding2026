import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import Footer from '@/components/Footer'
import SectionRegistry from '@/components/sections/SectionRegistry'

// Lazy load StickyCountdown - it's not critical for initial render
// Loads after initial page load to improve LCP
const StickyCountdown = dynamic(() => import('@/components/StickyCountdown'), {
  ssr: false,
})

/**
 * Main landing page component
 * Uses SectionRegistry for dynamic section rendering based on configuration
 * 
 * Bundle optimizations:
 * - StickyCountdown is lazy-loaded (not critical for initial render)
 * - Sections are lazy-loaded via SectionRegistry
 * - HeroSection and Footer are kept in initial bundle (above the fold)
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <StickyCountdown />
      <HeroSection />
      <SectionRegistry />
      <Footer />
    </main>
  )
}
