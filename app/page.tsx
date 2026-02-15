import HeroSection from '@/components/sections/HeroSection'
import Footer from '@/components/Footer'
import SectionRegistry from '@/components/sections/SectionRegistry'
import StickyCountdownClient from '@/components/StickyCountdownClient'
import { getColorClasses } from '@/lib/colors'
import { weddingConfig } from '@/config/wedding'
import type { ColorSchemeName } from '@/lib/colors'

/**
 * Main landing page component
 * Uses SectionRegistry for dynamic section rendering based on configuration
 * StickyCountdown is lazy-loaded via StickyCountdownClient (Client Component).
 */
export default function Home() {
  const scheme = (weddingConfig.colorScheme || 'pink') as ColorSchemeName
  const colors = getColorClasses(scheme)
  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradientFrom} via-white ${colors.gradientTo}`}>
      <StickyCountdownClient />
      <HeroSection />
      <SectionRegistry />
      <Footer />
    </main>
  )
}
