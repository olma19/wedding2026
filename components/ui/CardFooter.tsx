'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { CardFooterPrimitive } from './Card'
import { useColors } from '../ColorSchemeProvider'
import { cn } from '@/lib/utils'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  divider?: boolean
}

const CardFooter = memo(function CardFooter({
  children,
  className = '',
  divider = false,
  ...props
}: CardFooterProps) {
  const colors = useColors()

  return (
    <CardFooterPrimitive
      className={cn(
        'p-4 pt-3',
        divider && `border-t ${colors.borderLight}`,
        className
      )}
      {...props}
    >
      {children}
    </CardFooterPrimitive>
  )
})

CardFooter.displayName = 'CardFooter'

export default CardFooter
