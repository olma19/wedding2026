'use client'

import { useState } from 'react'
import type { RSVPFormData } from '@/lib/validations/rsvp'

interface UseRSVPSubmissionReturn {
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
  submitRSVP: (data: RSVPFormData) => Promise<void>
  reset: () => void
}

/**
 * Hook to handle RSVP form submission
 * Manages submission state, error handling, and success feedback
 */
export function useRSVPSubmission(onSuccess?: () => void): UseRSVPSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const createConfetti = () => {
    // Skip confetti creation if document is not available (e.g., in tests or SSR)
    if (typeof document === 'undefined') return
    
    const colors = ['#f472b6', '#ec4899', '#f9a8d4', '#fbbf24', '#f59e0b']
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        // Double-check document exists before creating confetti
        if (typeof document === 'undefined') return
        
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 0.5 + 's'
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's'
        document.body.appendChild(confetti)
        setTimeout(() => {
          if (typeof document !== 'undefined' && confetti.parentNode) {
            confetti.remove()
          }
        }, 3000)
      }, i * 20)
    }
  }

  const submitRSVP = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    const payload = { ...data }
    const isDev = process.env.NODE_ENV === 'development'

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (isDev) {
        console.log('[RSVP] Response status:', response.status, response.statusText)
      }

      if (!response.ok) {
        let result
        try {
          result = await response.json()
        } catch {
          result = { error: 'Okänt fel', details: `HTTP ${response.status}: ${response.statusText}` }
        }
        if (isDev) console.error('[RSVP] API error response:', result)
        throw new Error(result.details || result.error || 'Kunde inte skicka RSVP')
      }

      const result = await response.json()
      if (isDev) console.log('[RSVP] Success response:', result)
      setSubmitSuccess(true)
      createConfetti()
      onSuccess?.()
    } catch (err: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[RSVP] Submission error:', err)
      }
      const errorMessage = err instanceof Error ? err.message : 'Ett fel uppstod. Försök igen.'
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitRSVP,
    reset,
  }
}
