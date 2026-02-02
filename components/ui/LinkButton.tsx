'use client'

import Link from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { useColors } from '../ColorSchemeProvider'
import { classNames } from '@/lib/utils/classNames'

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  external?: boolean
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

/**
 * Link styled as a button
 * Supports both internal (Next.js Link) and external links
 */
export default function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  external = false,
  className = '',
  children,
  ...props
}: LinkButtonProps) {
  const colors = useColors()

  const baseClasses = classNames(
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all',
    sizeClasses[size]
  )

  const variantStyles = variant === 'primary'
    ? classNames(colors.bgDark, 'text-white shadow-md hover:shadow-lg', colors.bgDarkHover)
    : variant === 'secondary'
    ? classNames('bg-white text-gray-700 border-2 border-gray-300 hover:shadow-md', colors.borderHover, colors.bgLightHover)
    : classNames(colors.borderLight, colors.text, 'bg-transparent border-2 hover:bg-gray-50')

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(baseClasses, variantStyles, className)}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={classNames(baseClasses, variantStyles, className)}
      {...props}
    >
      {content}
    </Link>
  )
}
