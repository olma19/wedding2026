'use client'

import FlowerDecoration from '../FlowerDecoration'
import CountdownTimer from '../CountdownTimer'
import { useColors } from '../ColorSchemeProvider'

export default function CountdownSection() {
  const colors = useColors()
  
  return (
    <section className={`relative py-20 px-4 ${colors.bgLight} overflow-hidden scroll-mt-20`}>
      <div className="absolute top-10 right-5 opacity-20 transform -rotate-12">
        <FlowerDecoration size="medium" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 transform rotate-45">
        <FlowerDecoration size="small" variant="leaf" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <CountdownTimer />
      </div>
    </section>
  )
}
