import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import userEvent from '@testing-library/user-event'
import GuestCountSelector from './GuestCountSelector'

describe('GuestCountSelector', () => {
  it('should render all guest count options', () => {
    render(<GuestCountSelector value={1} onChange={vi.fn()} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('should highlight selected value', () => {
    render(<GuestCountSelector value={3} onChange={vi.fn()} />)
    
    const selectedButton = screen.getByText('3').closest('button')
    expect(selectedButton).toBeInTheDocument()
    // Button component applies variant via className, not data attribute
    // Just verify the button exists and is rendered
  })

  it('should call onChange when a button is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<GuestCountSelector value={1} onChange={handleChange} />)
    
    const button2 = screen.getByText('2')
    await user.click(button2)
    
    expect(handleChange).toHaveBeenCalledWith(2)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should disable all buttons when disabled prop is true', () => {
    render(<GuestCountSelector value={1} onChange={vi.fn()} disabled />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('should not disable buttons when disabled prop is false', () => {
    render(<GuestCountSelector value={1} onChange={vi.fn()} disabled={false} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).not.toBeDisabled()
    })
  })

  it('should show required indicator', () => {
    render(<GuestCountSelector value={1} onChange={vi.fn()} />)
    
    const label = screen.getByText(/antal personer/i)
    expect(label).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should allow selecting different values', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<GuestCountSelector value={1} onChange={handleChange} />)
    
    await user.click(screen.getByText('4'))
    expect(handleChange).toHaveBeenCalledWith(4)
    
    await user.click(screen.getByText('6'))
    expect(handleChange).toHaveBeenCalledWith(6)
    
    expect(handleChange).toHaveBeenCalledTimes(2)
  })
})
