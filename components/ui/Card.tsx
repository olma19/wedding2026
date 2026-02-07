'use client'

import * as React from 'react'
import { memo } from 'react'
import { cn } from '@/lib/utils'
import { useColors } from '../ColorSchemeProvider'

/* ----- shadcn card primitives ----- */
const CardPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className
    )}
    {...props}
  />
))
CardPrimitive.displayName = 'Card'

const CardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeaderPrimitive.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContentPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContentPrimitive.displayName = 'CardContent'

const CardFooterPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooterPrimitive.displayName = 'CardFooter'

export { CardPrimitive, CardHeaderPrimitive, CardContentPrimitive, CardFooterPrimitive, CardTitle, CardDescription }

/* ----- Wedding-site Card wrapper (variant, hover) ----- */
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
}

const Card = memo(function Card({
  variant = 'default',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const colors = useColors()

  const variantClasses = {
    default: `bg-white border-2 ${colors.borderLight} shadow-md`,
    outlined: `bg-transparent border-2 ${colors.borderLight}`,
    elevated: `bg-white border-2 ${colors.borderLight} shadow-xl`,
    flat: 'bg-white',
  }

  return (
    <CardPrimitive
      className={cn(
        'rounded-lg overflow-hidden',
        variantClasses[variant],
        hover && 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </CardPrimitive>
  )
})
Card.displayName = 'Card'

export default Card
