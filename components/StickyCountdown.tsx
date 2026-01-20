'use client'

import { useState, useEffect } from 'react'
import { weddingConfig } from '@/config/wedding'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function StickyCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const dateStr = weddingConfig.date.fullDate
      const [day, month, year] = dateStr.split(' ')
      
      const monthMap: { [key: string]: string } = {
        'Januari': '01', 'Februari': '02', 'Mars': '03', 'April': '04',
        'Maj': '05', 'Juni': '06', 'Juli': '07', 'Augusti': '08',
        'September': '09', 'Oktober': '10', 'November': '11', 'December': '12'
      }
      
      const targetDate = new Date(`${year}-${monthMap[month]}-${day.padStart(2, '0')}T15:00:00`)
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    // Check if we've scrolled past the hero section
    const handleScroll = () => {
      const heroSection = document.querySelector('section:first-of-type')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) return null

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-pink-100 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <span className="text-sm md:text-base font-serif text-gray-700 hidden md:inline">
            {weddingConfig.date.fullDate}
          </span>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-pink-600">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600">D</div>
            </div>
            <span className="text-pink-400 text-xl">:</span>
            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-pink-600">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600">H</div>
            </div>
            <span className="text-pink-400 text-xl">:</span>
            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-pink-600">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600">M</div>
            </div>
            <span className="text-pink-400 text-xl">:</span>
            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-pink-600">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600">S</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
