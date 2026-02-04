'use client'

import dynamic from 'next/dynamic'

// Lazy load StickyCountdown with ssr: false (only allowed in Client Components in Next.js 16)
const StickyCountdown = dynamic(() => import('@/components/StickyCountdown'), {
  ssr: false,
})

export default function StickyCountdownClient() {
  return <StickyCountdown />
}
