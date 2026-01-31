import { ReactNode } from 'react'

interface DetailCardProps {
  icon: ReactNode
  title: string
  subtitle?: string
  mainText: string
}

export default function DetailCard({ icon, title, subtitle, mainText }: DetailCardProps) {
  return (
    <div className="space-y-1 group">
      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-pink-200 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-600">{title}</h3>
      {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
      <p className="text-base font-bold text-pink-600 transition-all duration-300 group-hover:scale-110">{mainText}</p>
    </div>
  )
}
