'use client'

import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

interface ContactLinkProps {
  type: 'phone' | 'email'
  value: string
  className?: string
  children?: React.ReactNode
}

/**
 * Contact link component for phone and email
 * Handles tel: and mailto: links with consistent styling
 */
export default function ContactLink({
  type,
  value,
  className = '',
  children,
}: ContactLinkProps) {
  const colors = useColors()

  const href = type === 'phone'
    ? `tel:${value.replace(/\s/g, '')}`
    : `mailto:${value}`

  const displayValue = children || value

  return (
    <a
      href={href}
      className={classNames(
        'transition-colors',
        colors.textHover,
        className
      )}
      aria-label={type === 'phone' ? `Ring ${value}` : `Skicka e-post till ${value}`}
    >
      {displayValue}
    </a>
  )
}
