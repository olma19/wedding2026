import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import DetailCard from './DetailCard'

// Mock icon component for testing
const MockIcon = () => <div data-testid="mock-icon">Icon</div>

describe('DetailCard', () => {
  it('should render with required props', () => {
    render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        mainText="Test Main Text"
      />
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Main Text')).toBeInTheDocument()
  })

  it('should render subtitle when provided', () => {
    render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        subtitle="Test Subtitle"
        mainText="Test Main Text"
      />
    )
    
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('should not render subtitle when not provided', () => {
    render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        mainText="Test Main Text"
      />
    )
    
    // Subtitle should not be in the document
    const subtitle = screen.queryByText(/subtitle/i)
    expect(subtitle).not.toBeInTheDocument()
  })

  it('should render icon', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>
    
    render(
      <DetailCard
        icon={<TestIcon />}
        title="Test Title"
        mainText="Test Main Text"
      />
    )
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('should have proper structure with title as heading', () => {
    render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        mainText="Test Main Text"
      />
    )
    
    const title = screen.getByText('Test Title')
    expect(title.tagName).toBe('H3')
  })

  it('should render main text', () => {
    render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        mainText="Important Main Text"
      />
    )
    
    const mainText = screen.getByText('Important Main Text')
    expect(mainText).toBeInTheDocument()
    expect(mainText.tagName).toBe('P')
  })

  it('should have group class for hover effects', () => {
    const { container } = render(
      <DetailCard
        icon={<MockIcon />}
        title="Test Title"
        mainText="Test Main Text"
      />
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('group')
  })
})
