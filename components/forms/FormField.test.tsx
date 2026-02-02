import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import FormField from './FormField'
import userEvent from '@testing-library/user-event'

describe('FormField', () => {
  it('should render with label', () => {
    render(<FormField label="Email" name="email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('should render required indicator when required', () => {
    render(<FormField label="Email" name="email" required />)
    const label = screen.getByText(/email/i)
    expect(label).toBeInTheDocument()
    // Check for asterisk (required indicator) - use querySelector to find the span
    const requiredSpan = screen.getByText('*')
    expect(requiredSpan).toBeInTheDocument()
    expect(requiredSpan).toHaveAttribute('aria-label', 'obligatorisk')
  })

  it('should not render required indicator when not required', () => {
    render(<FormField label="Email" name="email" />)
    expect(screen.queryByLabelText(/obligatorisk/i)).not.toBeInTheDocument()
  })

  it('should display error message when error prop is provided', () => {
    render(<FormField label="Email" name="email" error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toHaveAttribute('role', 'alert')
  })

  it('should not display error message when error prop is not provided', () => {
    render(<FormField label="Email" name="email" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should apply error styling when error is present', () => {
    render(<FormField label="Email" name="email" error="Error" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveClass('border-red-500')
  })

  it('should apply normal styling when error is not present', () => {
    render(<FormField label="Email" name="email" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).not.toHaveClass('border-red-500')
  })

  it('should accept input props', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(
      <FormField 
        label="Email" 
        name="email" 
        type="email"
        onChange={handleChange}
        placeholder="Enter email"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
    
    await user.type(input, 'test@example.com')
    expect(handleChange).toHaveBeenCalled()
  })

  it('should use custom fieldId when provided', () => {
    render(<FormField label="Email" name="email" fieldId="custom-email-id" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('id', 'custom-email-id')
  })

  it('should use id prop when provided (takes precedence over fieldId)', () => {
    render(<FormField label="Email" name="email" fieldId="field-id" id="custom-id" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('should have proper ARIA attributes', () => {
    render(<FormField label="Email" name="email" required />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).toHaveAttribute('aria-invalid', 'false')
  })

  it('should have aria-invalid when error is present', () => {
    render(<FormField label="Email" name="email" error="Error" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should accept custom className', () => {
    render(<FormField label="Email" name="email" className="custom-class" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveClass('custom-class')
  })

  it('should be disabled when disabled prop is provided', () => {
    render(<FormField label="Email" name="email" disabled />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toBeDisabled()
  })
})
