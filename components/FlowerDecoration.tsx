interface FlowerDecorationProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'flower' | 'leaf' | 'branch'
}

export default function FlowerDecoration({ 
  className = '', 
  size = 'medium',
  variant = 'flower'
}: FlowerDecorationProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  }

  if (variant === 'leaf') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-300 opacity-60">
          <path
            d="M50 20 Q30 40 35 60 Q40 80 50 85 Q60 80 65 60 Q70 40 50 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M50 20 L50 85"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'branch') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-400 opacity-50">
          <path
            d="M20 50 Q40 30 60 50 Q80 70 90 60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="30" cy="45" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <circle cx="70" cy="55" r="4" fill="currentColor" />
        </svg>
      </div>
    )
  }

  // Default: flower
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-pink-300 opacity-70">
        {/* Outer petals */}
        <ellipse cx="50" cy="25" rx="10" ry="15" fill="currentColor" />
        <ellipse cx="75" cy="50" rx="15" ry="10" fill="currentColor" />
        <ellipse cx="50" cy="75" rx="10" ry="15" fill="currentColor" />
        <ellipse cx="25" cy="50" rx="15" ry="10" fill="currentColor" />
        {/* Inner petals */}
        <ellipse cx="50" cy="30" rx="8" ry="12" fill="#f9a8d4" />
        <ellipse cx="70" cy="50" rx="12" ry="8" fill="#f9a8d4" />
        <ellipse cx="50" cy="70" rx="8" ry="12" fill="#f9a8d4" />
        <ellipse cx="30" cy="50" rx="12" ry="8" fill="#f9a8d4" />
        {/* Center */}
        <circle cx="50" cy="50" r="8" fill="#fbbf24" className="opacity-90" />
        <circle cx="50" cy="50" r="4" fill="#f59e0b" />
      </svg>
    </div>
  )
}
