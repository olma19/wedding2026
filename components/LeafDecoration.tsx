'use client'

import { useColors } from './ColorSchemeProvider'

interface LeafDecorationProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'single' | 'pair'
}

// Improved natural leaf shape - more organic and detailed
const leafPath = "M50 15 Q45 25 42 35 Q40 45 41 55 Q42 65 45 75 Q48 82 50 85 Q52 82 55 75 Q58 65 59 55 Q60 45 58 35 Q55 25 50 15 Z"
const leafVein = "M50 15 Q50 30 50 45 Q50 60 50 75 Q50 82 50 85"
const leafVeinLeft = "M50 30 Q48 35 46 40 Q44 45 42 50"
const leafVeinRight = "M50 30 Q52 35 54 40 Q56 45 58 50"

export default function LeafDecoration({ 
  className = '', 
  size = 'medium',
  variant = 'single'
}: LeafDecorationProps) {
  const colors = useColors()
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  }

  // Single leaf - improved natural shape with detail
  if (variant === 'single') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.leaf}`} style={{ opacity: 0.75 }}>
          <defs>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d={leafPath}
            fill="url(#leafGradient)"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <path
            d={leafVein}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d={leafVeinLeft}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d={leafVeinRight}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
    )
  }

  // Pair of leaves - two leaves at different angles (V shape)
  if (variant === 'pair') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.leaf}`} style={{ opacity: 0.75 }}>
          <defs>
            <linearGradient id="leafGradientPair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Left leaf - rotated -25 degrees */}
          <g transform="translate(35, 50) rotate(-25) translate(-50, -50)">
            <path
              d={leafPath}
              fill="url(#leafGradientPair)"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
            <path
              d={leafVein}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d={leafVeinLeft}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d={leafVeinRight}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
          {/* Right leaf - rotated 25 degrees */}
          <g transform="translate(65, 50) rotate(25) translate(-50, -50)">
            <path
              d={leafPath}
              fill="url(#leafGradientPair)"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
            <path
              d={leafVein}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d={leafVeinLeft}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d={leafVeinRight}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
        </svg>
      </div>
    )
  }

  // Default: Single leaf
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className={`w-full h-full ${colors.leaf}`} style={{ opacity: 0.75 }}>
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d={leafPath}
          fill="url(#leafGradient)"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <path
          d={leafVein}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d={leafVeinLeft}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d={leafVeinRight}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
