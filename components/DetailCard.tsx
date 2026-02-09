'use client'

import { memo, ReactNode } from 'react'
import { useColors } from './ColorSchemeProvider'

interface DetailCardProps {
  icon: ReactNode
  title: string
  subtitle?: string
  mainText: string
}

/**
 * Card component for displaying details with icon, title, and text
 * Memoized to prevent unnecessary re-renders
 */
const DetailCard = memo(function DetailCard({ icon, title, subtitle, mainText }: DetailCardProps) {
  const colors = useColors()
  
  return (
    <div className="space-y-1 group">
      <div className={`w-14 h-14 border-2 ${colors.borderMedium} ${colors.bgLight} rounded-full flex items-center justify-center mx-auto transition-all duration-300 ease-out ${colors.bgLightHover} group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 ring-2 ring-transparent group-hover:ring-black/5`}>
        {icon}
      </div>
      <h3 className={`text-sm font-semibold text-gray-800 transition-colors duration-300 ${colors.textHover}`}>{title}</h3>
      {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
      <p className={`text-base font-bold ${colors.text} transition-all duration-300 group-hover:scale-110`}>{mainText}</p>
    </div>
  )
})

DetailCard.displayName = 'DetailCard'

export default DetailCard
