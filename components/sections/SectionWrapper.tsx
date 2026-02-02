'use client'

import { useColors } from '../ColorSchemeProvider'
import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import type { SectionWrapperProps } from '@/types/sections'
import { classNames } from '@/lib/utils/classNames'

/**
 * Reusable wrapper component for page sections
 * Provides consistent structure, decorations, backgrounds, and scroll animations
 * 
 * @example
 * ```tsx
 * <SectionWrapper
 *   title="My Section"
 *   background="white"
 *   decorations={[
 *     { position: 'top-right', size: 'small', opacity: 0.2 }
 *   ]}
 * >
 *   <p>Section content</p>
 * </SectionWrapper>
 * ```
 */
export default function SectionWrapper({
  children,
  title,
  titleVariant,
  decorations = [],
  className = '',
  background = 'light',
  customBackground,
  containerClassName = '',
  scrollAnimationDelay = 0,
  showScrollAnimation = true,
  scrollMargin = true,
  id,
}: SectionWrapperProps) {
  const colors = useColors()

  // Determine background class
  const backgroundClass = customBackground 
    ? customBackground 
    : background === 'white' 
    ? 'bg-white' 
    : colors.bgLight

  // Default decorations if none provided
  const defaultDecorations = decorations.length === 0 
    ? [
        { position: 'top-right' as const, size: 'small' as const, opacity: 0.2 },
        { position: 'bottom-left' as const, size: 'small' as const, opacity: 0.2 },
      ]
    : decorations

  return (
    <section 
      id={id}
      className={classNames(
        'relative py-20 px-4 overflow-hidden',
        backgroundClass,
        scrollMargin && 'scroll-mt-20',
        className
      )}
    >
      {/* Decorative elements */}
      {defaultDecorations.map((decoration, index) => {
        const positionClasses = {
          'top-left': 'top-5 left-5',
          'top-right': 'top-5 right-5',
          'bottom-left': 'bottom-5 left-5',
          'bottom-right': 'bottom-5 right-5',
        }
        
        const rotationClasses = {
          'top-left': 'rotate-45',
          'top-right': '-rotate-12',
          'bottom-left': 'rotate-45',
          'bottom-right': '-rotate-12',
        }

        const opacity = decoration.opacity ?? 0.2
        const rotationValue = decoration.rotation ?? (rotationClasses[decoration.position] || '')
        const rotation = typeof rotationValue === 'number' 
          ? `rotate-${rotationValue}` 
          : rotationValue || ''
        
        return (
          <div
            key={`decoration-${index}`}
            className={classNames(
              'absolute transform',
              positionClasses[decoration.position],
              rotation
            )}
            style={{ opacity }}
            aria-hidden="true"
          >
            <FlowerDecoration
              size={decoration.size || 'small'}
              variant={decoration.variant}
              seed={decoration.seed}
            />
          </div>
        )
      })}

      <div className={classNames('container mx-auto max-w-4xl relative z-10', containerClassName)}>
        {title && (
          <SectionTitle title={title} flowerVariant={titleVariant} />
        )}

        {showScrollAnimation ? (
          <ScrollAnimation delay={scrollAnimationDelay}>
            {children}
          </ScrollAnimation>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
