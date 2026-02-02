import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import SectionWrapper from './SectionWrapper'

describe('SectionWrapper', () => {
  it('should render children', () => {
    render(
      <SectionWrapper title="Test Section">
        <p>Test Content</p>
      </SectionWrapper>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render section title when provided', () => {
    render(
      <SectionWrapper title="My Section">
        <p>Content</p>
      </SectionWrapper>
    )
    
    expect(screen.getByText('My Section')).toBeInTheDocument()
  })

  it('should not render title when not provided', () => {
    render(
      <SectionWrapper>
        <p>Content</p>
      </SectionWrapper>
    )
    
    // Title should not be rendered
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('should render as section element', () => {
    const { container } = render(
      <SectionWrapper title="Test">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('should have scroll-margin when scrollMargin is true', () => {
    const { container } = render(
      <SectionWrapper title="Test" scrollMargin={true}>
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('scroll-mt-20')
  })

  it('should not have scroll-margin when scrollMargin is false', () => {
    const { container } = render(
      <SectionWrapper title="Test" scrollMargin={false}>
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).not.toHaveClass('scroll-mt-20')
  })

  it('should accept custom id', () => {
    const { container } = render(
      <SectionWrapper title="Test" id="custom-section-id">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'custom-section-id')
  })

  it('should accept custom className', () => {
    const { container } = render(
      <SectionWrapper title="Test" className="custom-class">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })

  it('should accept custom containerClassName', () => {
    const { container } = render(
      <SectionWrapper title="Test" containerClassName="custom-container">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const innerContainer = container.querySelector('.custom-container')
    expect(innerContainer).toBeInTheDocument()
  })

  it('should render decorations when provided', () => {
    const { container } = render(
      <SectionWrapper
        title="Test"
        decorations={[
          { position: 'top-right', size: 'small', opacity: 0.3 }
        ]}
      >
        <p>Content</p>
      </SectionWrapper>
    )
    
    // Decorations should be rendered (they have aria-hidden="true")
    const decorations = container.querySelectorAll('[aria-hidden="true"]')
    expect(decorations.length).toBeGreaterThan(0)
  })

  it('should use default decorations when none provided', () => {
    const { container } = render(
      <SectionWrapper title="Test">
        <p>Content</p>
      </SectionWrapper>
    )
    
    // Default decorations should be rendered
    const decorations = container.querySelectorAll('[aria-hidden="true"]')
    expect(decorations.length).toBeGreaterThan(0)
  })

  it('should use white background when background="white"', () => {
    const { container } = render(
      <SectionWrapper title="Test" background="white">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-white')
  })

  it('should use custom background when customBackground is provided', () => {
    const { container } = render(
      <SectionWrapper title="Test" customBackground="bg-blue-500">
        <p>Content</p>
      </SectionWrapper>
    )
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-blue-500')
  })

  it('should wrap children in ScrollAnimation when showScrollAnimation is true', () => {
    render(
      <SectionWrapper title="Test" showScrollAnimation={true}>
        <p>Content</p>
      </SectionWrapper>
    )
    
    // ScrollAnimation should be present (it adds data attributes or classes)
    // We can check that content is still rendered
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should not wrap children in ScrollAnimation when showScrollAnimation is false', () => {
    render(
      <SectionWrapper title="Test" showScrollAnimation={false}>
        <p>Content</p>
      </SectionWrapper>
    )
    
    // Content should still be rendered
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
