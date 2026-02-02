import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from './ErrorBoundary'

// Component that throws an error
function ThrowError({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

// Mock console.error to avoid noise in test output
const originalError = console.error
beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should catch errors and display error UI', () => {
    // Suppress React error boundary warning in test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Något gick fel')).toBeInTheDocument()
    expect(screen.getByText(/Vi beklagar, men något oväntat hände/i)).toBeInTheDocument()
    expect(screen.getByText('Ladda om sidan')).toBeInTheDocument()

    spy.mockRestore()
  })

  it('should log errors to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    )

    consoleSpy.mockRestore()
  })

  it('should display custom fallback when provided', () => {
    const fallback = <div>Custom error message</div>

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Något gick fel')).not.toBeInTheDocument()

    spy.mockRestore()
  })

  it('should show technical details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const detailsElement = screen.getByText('Teknisk information')
    expect(detailsElement).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
    spy.mockRestore()
  })

  it('should not show technical details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Teknisk information')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
    spy.mockRestore()
  })

  it('should have reload button with correct text and styling', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const reloadButton = screen.getByText('Ladda om sidan')
    expect(reloadButton).toBeInTheDocument()
    expect(reloadButton.tagName).toBe('BUTTON')
    expect(reloadButton).toHaveClass('bg-pink-500', 'text-white', 'rounded-lg')

    spy.mockRestore()
  })

  it('should display error icon', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Check for SVG icon (error icon)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('text-red-500')

    spy.mockRestore()
  })

  it('should have accessible error message', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const heading = screen.getByRole('heading', { name: /Något gick fel/i })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')

    spy.mockRestore()
  })

  it('should have user-friendly Swedish error messages', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Något gick fel')).toBeInTheDocument()
    expect(screen.getByText(/Vi beklagar, men något oväntat hände/i)).toBeInTheDocument()
    expect(screen.getByText('Ladda om sidan')).toBeInTheDocument()

    spy.mockRestore()
  })
})
