import HeroSection from '@/components/sections/HeroSection'
import WeddingDetailsSection from '@/components/sections/WeddingDetailsSection'
import StorySection from '@/components/sections/StorySection'
import RSVPSection from '@/components/sections/RSVPSection'
import Footer from '@/components/Footer'
import StickyCountdown from '@/components/StickyCountdown'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <StickyCountdown />
      <HeroSection />
      <WeddingDetailsSection />
      <StorySection />
      <RSVPSection />
      <Footer />
    </main>
  )
}
