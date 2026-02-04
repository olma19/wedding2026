'use client'

import { useColors } from '../ColorSchemeProvider'
import { useSectionIndex } from './SectionIndexContext'
import FlowerDecoration from '../FlowerDecoration'
import SectionTitle from '../SectionTitle'
import ScrollAnimation from '../ScrollAnimation'
import type { SectionWrapperProps } from '@/types/sections'
import { classNames } from '@/lib/utils/classNames'

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
  const sectionIndex = useSectionIndex()

  // When used inside SectionRegistry, alternate background by position so reordering sections doesn't make them blend
  const backgroundClass =
    customBackground
      ? customBackground
      : sectionIndex !== null
        ? sectionIndex % 2 === 0
          ? 'bg-white'
          : colors.bgLight
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
