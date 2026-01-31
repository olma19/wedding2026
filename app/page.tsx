import HeroSection from '@/components/sections/HeroSection'
import CountdownSection from '@/components/sections/CountdownSection'
import VigselSection from '@/components/sections/VigselSection'
import AddressSection from '@/components/sections/AddressSection'
import DinnerPartySection from '@/components/sections/DinnerPartySection'
import GoodToKnowSection from '@/components/sections/GoodToKnowSection'
import ToastmasterSection from '@/components/sections/ToastmasterSection'
import OSASection from '@/components/sections/OSASection'
import Footer from '@/components/Footer'
import StickyCountdown from '@/components/StickyCountdown'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <StickyCountdown />
      <HeroSection />
      <CountdownSection />
      <VigselSection />
      <AddressSection />
      <DinnerPartySection />
      <GoodToKnowSection />
      <ToastmasterSection />
      <OSASection />
      <Footer />
    </main>
  )
}
