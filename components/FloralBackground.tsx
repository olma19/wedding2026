'use client'

import { useEffect, useState } from 'react'
import FlowerDecoration from './FlowerDecoration'

export default function FloralBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left corner */}
      <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 rotate-12">
        <FlowerDecoration size="large" variant="flower" />
      </div>
      <div className="absolute top-20 left-10 transform rotate-45">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      
      {/* Top right corner */}
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 -rotate-12">
        <FlowerDecoration size="large" variant="flower" />
      </div>
      <div className="absolute top-16 right-16 transform -rotate-45">
        <FlowerDecoration size="medium" variant="branch" />
      </div>
      
      {/* Bottom left */}
      <div className="absolute bottom-20 left-20 transform rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute bottom-10 left-10 transform -rotate-30">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      
      {/* Bottom right */}
      <div className="absolute bottom-10 right-20 transform -rotate-12">
        <FlowerDecoration size="medium" variant="flower" />
      </div>
      <div className="absolute bottom-32 right-10 transform rotate-45">
        <FlowerDecoration size="small" variant="branch" />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/3 left-1/4 transform animate-pulse">
        <FlowerDecoration size="small" variant="flower" />
      </div>
      <div className="absolute top-2/3 right-1/4 transform animate-pulse" style={{ animationDelay: '1s' }}>
        <FlowerDecoration size="small" variant="leaf" />
      </div>
    </div>
  )
}
