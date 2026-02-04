import HeroSection from '@/components/sections/HeroSection'
import Footer from '@/components/Footer'
import SectionRegistry from '@/components/sections/SectionRegistry'
import StickyCountdownClient from '@/components/StickyCountdownClient'

/**
 * Main landing page component
 * Uses SectionRegistry for dynamic section rendering based on configuration
 * StickyCountdown is lazy-loaded via StickyCountdownClient (Client Component).
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <StickyCountdownClient />
      <HeroSection />
      <SectionRegistry />
      <Footer />
    </main>
  )
}
