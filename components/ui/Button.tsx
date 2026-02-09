'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import LoadingSpinner from '../LoadingSpinner'
import { useColors } from '../ColorSchemeProvider'

/* ----- shadcn button primitive ----- */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ShadcnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ShadcnButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ShadcnButton.displayName = 'Button'

export { buttonVariants }

/* ----- Wedding-site Button (same API as before) ----- */
type OurVariant = 'primary' | 'secondary' | 'outline'
type OurSize = 'sm' | 'md' | 'lg'

const variantMap: Record<OurVariant, 'default' | 'secondary' | 'outline'> = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
}

const sizeMap: Record<OurSize, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: OurVariant
  size?: OurSize
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  asChild?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  children,
  asChild = false,
  ...props
}: ButtonProps) {
  const colors = useColors()
  const themeClasses =
    variant === 'primary'
      ? `${colors.bgDark} text-white shadow hover:shadow-lg ${colors.bgDarkHover}`
      : variant === 'secondary'
        ? `${colors.bgLight} ${colors.text} shadow-sm ${colors.bgLightHover} border ${colors.borderLight}`
        : variant === 'outline'
          ? `border-2 ${colors.borderMedium} bg-transparent ${colors.text} shadow-sm ${colors.borderHover} ${colors.bgLightHover}`
          : ''

  return (
    <ShadcnButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      className={cn('rounded-lg', themeClasses, className)}
      disabled={disabled ?? isLoading}
      asChild={asChild}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {isLoading && <LoadingSpinner size="small" />}
          {!isLoading && icon && iconPosition === 'left' && icon}
          {children}
          {!isLoading && icon && iconPosition === 'right' && icon}
        </>
      )}
    </ShadcnButton>
  )
}
