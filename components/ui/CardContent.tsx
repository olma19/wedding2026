'use client'

import { memo, ReactNode, HTMLAttributes } from 'react'
import { CardContentPrimitive } from './Card'
import { cn } from '@/lib/utils'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const CardContent = memo(function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <CardContentPrimitive className={cn('p-4', className)} {...props}>
      {children}
    </CardContentPrimitive>
  )
})

CardContent.displayName = 'CardContent'

export default CardContent
