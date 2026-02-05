/**
 * Animation constants and configuration
 */

export type AnimationType = 'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'

export interface AnimationConfig {
  type: AnimationType
  duration: number
  easing: string
  threshold: number
  rootMargin: string
}

/**
 * Default animation configuration (matches original behavior)
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  type: 'slide-up',
  duration: 1000,
  easing: 'ease-out',
  threshold: 0.05,
  rootMargin: '80px',
}

/**
 * Animation presets
 */
export const ANIMATION_PRESETS: Record<string, AnimationConfig> = {
  fade: {
    type: 'fade',
    duration: 1000,
    easing: 'ease-out',
    threshold: 0.05,
    rootMargin: '80px',
  },
  'slide-up': {
    type: 'slide-up',
    duration: 1000,
    easing: 'ease-out',
    threshold: 0.05,
    rootMargin: '80px',
  },
  'slide-down': {
    type: 'slide-down',
    duration: 800,
    easing: 'ease-out',
    threshold: 0.1,
    rootMargin: '0px',
  },
  'slide-left': {
    type: 'slide-left',
    duration: 800,
    easing: 'ease-out',
    threshold: 0.1,
    rootMargin: '0px',
  },
  'slide-right': {
    type: 'slide-right',
    duration: 800,
    easing: 'ease-out',
    threshold: 0.1,
    rootMargin: '0px',
  },
  scale: {
    type: 'scale',
    duration: 600,
    easing: 'ease-out',
    threshold: 0.1,
    rootMargin: '0px',
  },
  slide: {
    type: 'slide-up',
    duration: 1000,
    easing: 'ease-out',
    threshold: 0.05,
    rootMargin: '80px',
  },
}

/**
 * Get animation classes based on type and visibility
 */
export function getAnimationClasses(
  type: AnimationType,
  isVisible: boolean
): string {
  const baseClasses = 'transition-all ease-out'

  const animationMap: Record<AnimationType, { visible: string; hidden: string }> = {
    fade: {
      visible: 'opacity-100',
      hidden: 'opacity-0',
    },
    'slide-up': {
      visible: 'opacity-100 translate-y-0',
      hidden: 'opacity-0 translate-y-14',
    },
    'slide-down': {
      visible: 'opacity-100 translate-y-0',
      hidden: 'opacity-0 -translate-y-10',
    },
    'slide-left': {
      visible: 'opacity-100 translate-x-0',
      hidden: 'opacity-0 translate-x-10',
    },
    'slide-right': {
      visible: 'opacity-100 translate-x-0',
      hidden: 'opacity-0 -translate-x-10',
    },
    scale: {
      visible: 'opacity-100 scale-100',
      hidden: 'opacity-0 scale-90',
    },
    slide: {
      visible: 'opacity-100 translate-y-0',
      hidden: 'opacity-0 translate-y-10',
    },
  }

  const animation = animationMap[type] || animationMap['slide-up']
  return `${baseClasses} ${isVisible ? animation.visible : animation.hidden}`
}
