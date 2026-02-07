'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { CardHeaderPrimitive } from './Card'
import { useColors } from '../ColorSchemeProvider'
import { cn } from '@/lib/utils'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  divider?: boolean
}

const CardHeader = memo(function CardHeader({
  children,
  className = '',
  divider = false,
  ...props
}: CardHeaderProps) {
  const colors = useColors()

  return (
    <CardHeaderPrimitive
      className={cn(
        'p-4 pb-3',
        divider && `border-b ${colors.borderLight}`,
        className
      )}
      {...props}
    >
      {children}
    </CardHeaderPrimitive>
  )
})

CardHeader.displayName = 'CardHeader'

export default CardHeader
