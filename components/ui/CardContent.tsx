'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { classNames } from '@/lib/utils/classNames'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

/**
 * Card Content component
 * Main content area of a card
 * 
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Card content goes here</p>
 * </CardContent>
 * ```
 */
const CardContent = memo(function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <div {...props} className={classNames('p-4', className)}>
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

export default CardContent
