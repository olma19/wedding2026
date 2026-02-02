'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  divider?: boolean
}

/**
 * Card Footer component
 * Used for card actions, buttons, or footer content
 * 
 * @example
 * ```tsx
 * <CardFooter divider>
 *   <button>Action</button>
 * </CardFooter>
 * ```
 */
const CardFooter = memo(function CardFooter({
  children,
  className = '',
  divider = false,
  ...props
}: CardFooterProps) {
  const colors = useColors()

  return (
    <div
      {...props}
      className={classNames(
        'p-4 pt-3',
        divider && `border-t ${colors.borderLight}`,
        className
      )}
    >
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export default CardFooter
