'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  divider?: boolean
}

/**
 * Card Header component
 * Used for card titles, icons, or header content
 * 
 * @example
 * ```tsx
 * <CardHeader divider>
 *   <h3>Card Title</h3>
 * </CardHeader>
 * ```
 */
const CardHeader = memo(function CardHeader({
  children,
  className = '',
  divider = false,
  ...props
}: CardHeaderProps) {
  const colors = useColors()

  return (
    <div
      {...props}
      className={classNames(
        'p-4 pb-3',
        divider && `border-b ${colors.borderLight}`,
        className
      )}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

export default CardHeader
