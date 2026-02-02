'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'
import LoadingSpinner from '../LoadingSpinner'

/**
 * Props for Button component
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Show loading spinner and disable button */
  isLoading?: boolean
  /** Optional icon to display */
  icon?: ReactNode
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

/**
 * Reusable button component with variants, sizes, and loading states
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" isLoading={isSubmitting}>
 *   Submit
 * </Button>
 * ```
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const colors = useColors()

  const baseClasses = classNames(
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[size]
  )

  const variantStyles = variant === 'primary'
    ? classNames(colors.bgDark, 'text-white shadow-md hover:shadow-lg', colors.bgDarkHover)
    : variant === 'secondary'
    ? classNames('bg-white text-gray-700 border-2 border-gray-300 hover:shadow-md', colors.borderHover, colors.bgLightHover)
    : classNames(colors.borderLight, colors.text, 'bg-transparent border-2 hover:bg-gray-50')

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={classNames(baseClasses, variantStyles, className)}
    >
      {isLoading && <LoadingSpinner size="small" />}
      {!isLoading && icon && iconPosition === 'left' && icon}
      {children}
      {!isLoading && icon && iconPosition === 'right' && icon}
    </button>
  )
}
