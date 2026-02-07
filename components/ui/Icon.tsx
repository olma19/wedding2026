'use client'

import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

/**
 * Material Symbol names (snake_case).
 * Use any name from https://fonts.google.com/icons – add below for type-safety.
 */
export type IconName =
  | 'calendar_today'
  | 'event'
  | 'schedule'
  | 'location_on'
  | 'place'
  | 'person'
  | 'email'
  | 'phone'
  | 'restaurant'
  | 'favorite'
  | string

export type IconVariant = 'plain' | 'circle' | 'circle-filled'
export type IconSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<IconSize, string> = {
  sm: 'text-[20px]',
  md: 'text-2xl',
  lg: 'text-[28px]',
}

const circleSizeClasses: Record<IconSize, string> = {
  sm: 'w-9 h-9',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
}

const sizePx: Record<IconSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
}

/** Gender-neutral person: circle head + simple shoulders (no gendered cues) */
function PersonNeutralIcon({ size, className }: { size: IconSize; className?: string }) {
  const px = sizePx[size]
  return (
    <svg
      viewBox="0 0 24 24"
      width={px}
      height={px}
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5 22c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  )
}

export interface IconProps {
  /** Material Symbol name (snake_case), e.g. 'schedule', 'location_on' */
  name: IconName
  /** plain = icon only; circle = icon in bordered circle; circle-filled = icon in filled circle */
  variant?: IconVariant
  size?: IconSize
  className?: string
  /** Set false when the icon is the only label (e.g. icon-only button) for accessibility */
  decorative?: boolean
}

/**
 * Icon component using Google Material Symbols (via @fontsource).
 * Variants: plain, circle, circle-filled. Icons follow the active color scheme.
 */
export default function Icon({
  name,
  variant = 'plain',
  size = 'md',
  className = '',
  decorative = true,
}: IconProps) {
  const colors = useColors()
  const useNeutralPerson = name === 'person'

  const symbol = useNeutralPerson ? (
    <span
      className={classNames('inline-flex shrink-0 items-center justify-center', variant === 'plain' && className)}
      aria-hidden={decorative}
      {...(decorative ? {} : { role: 'img', 'aria-label': 'person' })}
    >
      <PersonNeutralIcon
        size={size}
        className={classNames(variant === 'plain' && colors.icon)}
      />
    </span>
  ) : (
    <span
      className={classNames(
        'material-symbols-outlined select-none',
        sizeClasses[size],
        variant === 'plain' && className,
        variant === 'plain' && colors.icon
      )}
      aria-hidden={decorative}
      {...(decorative ? {} : { role: 'img', 'aria-label': name.replace(/_/g, ' ') })}
    >
      {name}
    </span>
  )

  if (variant === 'plain') {
    return symbol
  }

  const iconColorClass = variant === 'circle-filled' ? 'text-white' : colors.icon
  const circleClass =
    variant === 'circle-filled'
      ? `${colors.bgMedium} text-white`
      : `border-2 ${colors.borderMedium} ${colors.bgLight}`

  return (
    <div
      className={classNames(
        'rounded-full flex items-center justify-center shrink-0',
        circleSizeClasses[size],
        circleClass,
        'shadow-md shadow-black/5 transition-all duration-300 ease-out',
        'group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-black/10',
        className
      )}
      aria-hidden={decorative}
    >
      {useNeutralPerson ? (
        <PersonNeutralIcon size={size} className={iconColorClass} />
      ) : (
        <span
          className={classNames('material-symbols-outlined select-none', sizeClasses[size], iconColorClass)}
          aria-hidden
        >
          {name}
        </span>
      )}
    </div>
  )
}
