import { describe, it, expect } from 'vitest'
import { render } from '@/tests/utils/render'
import Skeleton from './Skeleton'
import SectionSkeleton from './SectionSkeleton'
import CardSkeleton from './CardSkeleton'

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('should render with default props', () => {
      const { container } = render(<Skeleton />)
      const skeleton = container.firstChild
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('w-full', 'h-4', 'rounded', 'animate-skeleton-pulse')
    })

    it('should render with custom width and height', () => {
      const { container } = render(<Skeleton width="w-48" height="h-8" />)
      const skeleton = container.firstChild
      expect(skeleton).toHaveClass('w-48', 'h-8')
    })

    it('should render circular variant', () => {
      const { container } = render(<Skeleton variant="circular" width="w-12" height="h-12" />)
      const skeleton = container.firstChild
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('should render text variant with multiple lines', () => {
      const { container } = render(<Skeleton variant="text" lines={3} />)
      // The wrapper div (space-y-2) contains the line divs
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toBeInTheDocument()
      expect(wrapper.className).toContain('space-y-2')
      // Count direct children (the line divs)
      const lines = Array.from(wrapper.children)
      expect(lines).toHaveLength(3)
    })

    it('should render with wave animation', () => {
      const { container } = render(<Skeleton animation="wave" />)
      const skeleton = container.firstChild
      expect(skeleton).toHaveClass('bg-gradient-to-r')
    })

    it('should render with no animation', () => {
      const { container } = render(<Skeleton animation="none" />)
      const skeleton = container.firstChild
      expect(skeleton).not.toHaveClass('animate-pulse')
    })
  })

  describe('SectionSkeleton', () => {
    it('should render with title and content', () => {
      const { container } = render(<SectionSkeleton showTitle showContent />)
      expect(container.querySelector('.container')).toBeInTheDocument()
    })

    it('should render card grid skeleton', () => {
      const { container } = render(<SectionSkeleton showTitle showCards cardCount={3} />)
      const cards = container.querySelectorAll('.grid > div')
      expect(cards).toHaveLength(3)
    })

    it('should not render title when showTitle is false', () => {
      const { container } = render(<SectionSkeleton showTitle={false} />)
      const title = container.querySelector('.mb-12')
      expect(title).not.toBeInTheDocument()
    })
  })

  describe('CardSkeleton', () => {
    it('should render with header and content', () => {
      const { container } = render(<CardSkeleton showHeader showContent />)
      expect(container.querySelector('.border-b')).toBeInTheDocument()
    })

    it('should render with footer', () => {
      const { container } = render(<CardSkeleton showFooter />)
      expect(container.querySelector('.border-t')).toBeInTheDocument()
    })

    it('should render correct number of content lines', () => {
      const { container } = render(<CardSkeleton showContent contentLines={4} />)
      const lines = container.querySelectorAll('.p-4 .space-y-2 > div')
      expect(lines).toHaveLength(4)
    })
  })
})
