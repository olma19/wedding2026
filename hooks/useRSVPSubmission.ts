'use client'

import { useState } from 'react'
import type { RSVPFormData } from '@/lib/validations/rsvp'

interface UseRSVPSubmissionReturn {
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
  /** Whether the last successful submission was "attending". null until first success. */
  lastSubmittedAttending: boolean | null
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
  const [lastSubmittedAttending, setLastSubmittedAttending] = useState<boolean | null>(null)

  const createConfetti = () => {
    if (typeof document === 'undefined') return

    const colors = ['#f472b6', '#ec4899', '#f9a8d4', '#fbbf24', '#f59e0b', '#a7c4a0', '#8fb38a', '#fde047']
    const heartColors = ['#ec4899', '#f472b6', '#f9a8d4', '#dc2626', '#e11d48']
    const variants: ('center' | 'left' | 'right')[] = ['center', 'left', 'right']
    const count = 70
    const useFlow = () => Math.random() < 0.5
    const useHeart = () => Math.random() < 0.4

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (typeof document === 'undefined') return

        const variant = variants[Math.floor(Math.random() * variants.length)]
        const flow = useFlow()
        const isHeart = useHeart()

        const confetti = document.createElement(isHeart ? 'span' : 'div')
        confetti.className = variant === 'center' ? 'confetti' : `confetti confetti--${variant}`
        if (flow) confetti.classList.add('confetti--flow')
        if (isHeart) {
          confetti.classList.add('confetti--heart')
          confetti.textContent = '♥'
          confetti.style.color = heartColors[Math.floor(Math.random() * heartColors.length)]
          confetti.style.fontSize = 14 + Math.random() * 14 + 'px'
        } else {
          const size = 6 + Math.random() * 10
          const isRect = Math.random() > 0.5
          confetti.style.width = size + 'px'
          confetti.style.height = (isRect ? size * 0.6 : size) + 'px'
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        }

        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.animationDelay = Math.random() * 0.4 + 's'
        confetti.style.animationDuration = 2.4 + Math.random() * 1.2 + 's'
        document.body.appendChild(confetti)
        setTimeout(() => {
          if (typeof document !== 'undefined' && confetti.parentNode) {
            confetti.remove()
          }
        }, 5000)
      }, i * 16)
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
      setLastSubmittedAttending(payload.attending)
      setSubmitSuccess(true)
      if (payload.attending) createConfetti()
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
    setLastSubmittedAttending(null)
  }

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    lastSubmittedAttending,
    submitRSVP,
    reset,
  }
}
