import HeroSection from '@/components/sections/HeroSection'
import Footer from '@/components/Footer'
import StickyCountdown from '@/components/StickyCountdown'
import SectionRegistry from '@/components/sections/SectionRegistry'

/**
 * Main landing page component
 * Uses SectionRegistry for dynamic section rendering based on configuration
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
