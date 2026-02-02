'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: CardVariant
  className?: string
  hover?: boolean
}

/**
 * Base Card component
 * Provides consistent card styling with variants and hover effects
 * 
 * @example
 * ```tsx
 * <Card variant="default" hover>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 * ```
 */
const Card = memo(function Card({
  children,
  variant = 'default',
  className = '',
  hover = false,
  ...props
}: CardProps) {
  const colors = useColors()

  const variantClasses = {
    default: `bg-white border-2 ${colors.borderLight} shadow-md`,
    outlined: `bg-transparent border-2 ${colors.borderLight}`,
    elevated: `bg-white border-2 ${colors.borderLight} shadow-xl`,
    flat: `bg-white`,
  }

  return (
    <div
      {...props}
      className={classNames(
        'rounded-lg overflow-hidden',
        variantClasses[variant],
        hover && 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
