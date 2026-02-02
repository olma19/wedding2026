'use client'

import { useEffect, useRef, useState, ReactNode, useMemo } from 'react'
import { classNames } from '@/lib/utils/classNames'
import {
  type AnimationType,
  DEFAULT_ANIMATION_CONFIG,
  ANIMATION_PRESETS,
  getAnimationClasses,
} from '@/lib/constants/animations'

export interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  type?: AnimationType | string
  duration?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * ScrollAnimation component
 * Animates children when they scroll into view
 * 
 * Backward compatible with original API (children, className, delay)
 * New optional props: type, duration, threshold, rootMargin, once
 * 
 * @example
 * ```tsx
 * <ScrollAnimation delay={200}>
 *   <p>Default slide-up animation</p>
 * </ScrollAnimation>
 * 
 * <ScrollAnimation type="fade" delay={100}>
 *   <p>Fade animation</p>
 * </ScrollAnimation>
 * ```
 */
export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  type = 'slide-up',
  duration,
  threshold,
  rootMargin,
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Get animation config from preset or use defaults
  const config = useMemo(() => {
    const preset = ANIMATION_PRESETS[type]
    if (preset) {
      return {
        ...preset,
        duration: duration ?? preset.duration,
        threshold: threshold ?? preset.threshold,
        rootMargin: rootMargin ?? preset.rootMargin,
      }
    }
    return {
      ...DEFAULT_ANIMATION_CONFIG,
      type: type as AnimationType,
      duration: duration ?? DEFAULT_ANIMATION_CONFIG.duration,
      threshold: threshold ?? DEFAULT_ANIMATION_CONFIG.threshold,
      rootMargin: rootMargin ?? DEFAULT_ANIMATION_CONFIG.rootMargin,
    }
  }, [type, duration, threshold, rootMargin])

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    let observer: IntersectionObserver | null = null
    let visibilityTimeoutId: NodeJS.Timeout | null = null
    let initTimeoutId: NodeJS.Timeout | null = null

    // Check if element is already visible on mount (critical fix!)
    // This ensures content visible on initial render becomes visible immediately
    const checkInitialVisibility = () => {
      if (typeof window === 'undefined') return false
      
      const rect = currentRef.getBoundingClientRect()
      const isInViewport =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0

      if (isInViewport) {
        // Element is already visible, make it visible immediately (with delay if specified)
        visibilityTimeoutId = setTimeout(() => {
          setIsVisible(true)
        }, delay)
        return true
      }
      return false
    }

    // Small delay to ensure DOM is ready, then check visibility
    initTimeoutId = setTimeout(() => {
      const alreadyVisible = checkInitialVisibility()
      
      // If already visible and once=true, don't set up observer
      if (alreadyVisible && once) {
        return
      }

      // Create observer for elements not yet visible
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
            
            // If once is true, stop observing after first intersection
            if (once && observer) {
              observer.unobserve(currentRef)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        {
          threshold: config.threshold,
          rootMargin: config.rootMargin,
        }
      )

      observer.observe(currentRef)
    }, 50) // Small delay to ensure DOM is ready

    return () => {
      if (initTimeoutId) {
        clearTimeout(initTimeoutId)
      }
      if (visibilityTimeoutId) {
        clearTimeout(visibilityTimeoutId)
      }
      if (observer) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, once, config.threshold, config.rootMargin])

  const animationClasses = getAnimationClasses(config.type as AnimationType, isVisible)

  return (
    <div
      ref={ref}
      className={classNames(
        animationClasses,
        className
      )}
      style={{
        transitionDuration: `${config.duration}ms`,
        transitionTimingFunction: config.easing,
      }}
    >
      {children}
    </div>
  )
}
