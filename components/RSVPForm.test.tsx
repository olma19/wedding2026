import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/utils/render'
import userEvent from '@testing-library/user-event'
import RSVPForm from './RSVPForm'

// Mock the useRSVPSubmission hook
vi.mock('@/hooks/useRSVPSubmission', () => ({
  useRSVPSubmission: vi.fn(() => ({
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitRSVP: vi.fn(),
    reset: vi.fn(),
  })),
}))

// Mock fetch for API calls
global.fetch = vi.fn()

describe('RSVPForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the form', () => {
    render(<RSVPForm />)
    
    expect(screen.getByLabelText(/rsvp formulär/i)).toBeInTheDocument()
    expect(screen.getByText(/antal personer/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /skicka osa/i })).toBeInTheDocument()
  })

  it('should render guest count selector', () => {
    render(<RSVPForm />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should render person form section for default guest count', () => {
    render(<RSVPForm />)
    
    // Should render one person form section by default (number_of_attendees: 1)
    const firstNameInputs = screen.getAllByLabelText(/förnamn/i)
    const lastNameInputs = screen.getAllByLabelText(/efternamn/i)
    expect(firstNameInputs.length).toBeGreaterThan(0)
    expect(lastNameInputs.length).toBeGreaterThan(0)
  })

  it('should update number of person form sections when guest count changes', async () => {
    const user = userEvent.setup()
    render(<RSVPForm />)
    
    // Initially should have 1 person form (use placeholder to be more specific)
    const initialFirstNameInputs = screen.getAllByPlaceholderText(/förnamn/i)
    expect(initialFirstNameInputs.length).toBeGreaterThanOrEqual(1)
    
    // Select 2 guests
    const button2 = screen.getByText('2')
    await user.click(button2)
    
    // Should now have 2 person forms
    await waitFor(() => {
      const updatedFirstNameInputs = screen.getAllByPlaceholderText(/förnamn/i)
      expect(updatedFirstNameInputs.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should allow entering guest information', async () => {
    const user = userEvent.setup()
    render(<RSVPForm />)
    
    // Use getAllByPlaceholderText to get the specific inputs
    const firstNameInputs = screen.getAllByPlaceholderText(/förnamn/i)
    const lastNameInputs = screen.getAllByPlaceholderText(/efternamn/i)
    const firstNameInput = firstNameInputs[0]
    const lastNameInput = lastNameInputs[0]
    
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'John')
    await user.clear(lastNameInput)
    await user.type(lastNameInput, 'Doe')
    
    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
  })

  it('should show submit button', () => {
    render(<RSVPForm />)
    
    const submitButton = screen.getByRole('button', { name: /skicka osa/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).not.toBeDisabled()
  })

  // Note: Testing state-dependent behavior (isSubmitting, submitError, submitSuccess)
  // is better done through integration tests or by testing the hook directly.
  // The hook tests cover these scenarios thoroughly.
})
