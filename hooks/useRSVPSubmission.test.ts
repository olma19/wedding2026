import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useRSVPSubmission } from './useRSVPSubmission'
import type { RSVPFormData } from '@/lib/validations/rsvp'

// Mock fetch globally
global.fetch = vi.fn()

// Mock document.createElement to prevent confetti DOM manipulation in tests
const originalCreateElement = document.createElement.bind(document)
beforeEach(() => {
  document.createElement = vi.fn((tagName: string) => {
    if (tagName === 'div') {
      const mockDiv = originalCreateElement('div')
      mockDiv.remove = vi.fn()
      return mockDiv
    }
    return originalCreateElement(tagName)
  }) as any
})

afterEach(() => {
  document.createElement = originalCreateElement
})

describe('useRSVPSubmission', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear any existing confetti elements
    if (typeof document !== 'undefined') {
      document.body.querySelectorAll('.confetti').forEach(el => el.remove())
    }
  })

  afterEach(() => {
    // Clear any remaining confetti
    if (typeof document !== 'undefined') {
      document.body.querySelectorAll('.confetti').forEach(el => el.remove())
    }
    
    vi.clearAllMocks()
  })

  const mockRSVPData: RSVPFormData = {
    attending: true,
    number_of_attendees: 1,
    attendees: [
      {
        firstname: 'John',
        lastname: 'Doe',
        allergies: '',
        wants_bus: false,
        song_request: '',
      },
    ],
  }

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useRSVPSubmission())
    
    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.submitError).toBe(null)
    expect(result.current.submitSuccess).toBe(false)
    expect(typeof result.current.submitRSVP).toBe('function')
    expect(typeof result.current.reset).toBe('function')
  })

  it('should set isSubmitting to true during submission', async () => {
    // Use a delayed promise to ensure we can check the submitting state
    let resolvePromise: (value: any) => void
    const delayedPromise = new Promise(resolve => {
      resolvePromise = resolve
    })
    
    vi.mocked(fetch).mockImplementationOnce(() => 
      delayedPromise.then(() => ({
        ok: true,
        json: async () => ({ success: true }),
      })) as Promise<Response>
    )

    const { result } = renderHook(() => useRSVPSubmission())
    
    // Start submission
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    // Wait for isSubmitting to become true (React state update)
    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(true)
    })
    
    // Now resolve the fetch
    resolvePromise!({})
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(false)
    })
  })

  it('should handle successful submission', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(result.current.submitSuccess).toBe(true)
      expect(result.current.submitError).toBe(null)
      expect(result.current.isSubmitting).toBe(false)
    })
    
    expect(fetch).toHaveBeenCalledWith('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mockRSVPData, attending: true }),
    })
  })

  it('should handle API error response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ error: 'Validation Error', details: 'Invalid data' }),
    } as Response)

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(result.current.submitError).toBe('Invalid data')
      expect(result.current.submitSuccess).toBe(false)
      expect(result.current.isSubmitting).toBe(false)
    })
  })

  it('should handle network errors', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(result.current.submitError).toBe('Network error')
      expect(result.current.submitSuccess).toBe(false)
      expect(result.current.isSubmitting).toBe(false)
    })
  })

  it('should handle non-JSON error response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => {
        throw new Error('Not JSON')
      },
    } as unknown as Response)

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(result.current.submitError).toContain('HTTP 500')
      expect(result.current.submitSuccess).toBe(false)
    })
  })

  it('should call onSuccess callback on successful submission', async () => {
    const onSuccess = vi.fn()
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    const { result } = renderHook(() => useRSVPSubmission(onSuccess))
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1)
    })
  })

  it('should reset error and success state', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(mockRSVPData)
    })
    
    await waitFor(() => {
      expect(result.current.submitSuccess).toBe(true)
    })
    
    // Reset should clear both error and success
    act(() => {
      result.current.reset()
    })
    
    // Wait for state update
    await waitFor(() => {
      expect(result.current.submitError).toBe(null)
      expect(result.current.submitSuccess).toBe(false)
    })
  })

  it('should always set attending to true in payload', async () => {
    const dataWithAttendingFalse: RSVPFormData = {
      ...mockRSVPData,
      attending: false,
    }
    
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    const { result } = renderHook(() => useRSVPSubmission())
    
    act(() => {
      result.current.submitRSVP(dataWithAttendingFalse)
    })
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataWithAttendingFalse, attending: true }),
      })
    })
  })
})
