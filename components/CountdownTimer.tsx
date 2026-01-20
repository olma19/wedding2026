'use client'

import { useState, useEffect } from 'react'
import { weddingConfig } from '@/config/wedding'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      // Parse the date from config (format: "20 Juni 2026")
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

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const timeUnits = [
    { label: 'Dagar', value: timeLeft.days },
    { label: 'Timmar', value: timeLeft.hours },
    { label: 'Minuter', value: timeLeft.minutes },
    { label: 'Sekunder', value: timeLeft.seconds },
  ]

  return (
    <div className="my-12">
      <h3 className="text-2xl font-serif font-semibold text-gray-700 mb-6">
        Räkna ner med oss
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="bg-white rounded-lg shadow-lg p-4 border-2 border-pink-100 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-1">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 font-medium">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
