'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormData } from '@/lib/validations/rsvp'
import { weddingConfig } from '@/config/wedding'
import FlowerDecoration from './FlowerDecoration'

interface RSVPFormProps {
  onSuccess?: () => void
}

const GUEST_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6] as const

export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { osa } = weddingConfig

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: true,
      number_of_attendees: 1,
      attendees: [
        { firstname: '', lastname: '', allergies: '', wants_bus: false, song_request: '' },
      ],
    },
  })

  const number_of_attendees = watch('number_of_attendees')
  const attendees = watch('attendees') ?? []

  const { fields, replace } = useFieldArray({ control, name: 'attendees' })

  const updateAttendeesCount = (n: number) => {
    setValue('number_of_attendees', n)
    const current = watch('attendees') ?? []
    const next = Array.from({ length: n }, (_, i) => current[i] ?? { firstname: '', lastname: '', allergies: '', wants_bus: false, song_request: '' })
    replace(next)
  }

  const createConfetti = () => {
    const colors = ['#f472b6', '#ec4899', '#f9a8d4', '#fbbf24', '#f59e0b']
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 0.5 + 's'
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's'
        document.body.appendChild(confetti)
        setTimeout(() => confetti.remove(), 3000)
      }, i * 20)
    }
  }

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    // Always attending since we removed the radio buttons
    const payload = { ...data, attending: true }
    
    console.log('Submitting OSA payload:', payload)
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      console.log('Response status:', response.status, response.statusText)
      
      if (!response.ok) {
        let result
        try {
          result = await response.json()
        } catch {
          result = { error: 'Okänt fel', details: `HTTP ${response.status}: ${response.statusText}` }
        }
        console.error('API error response:', result)
        throw new Error(result.details || result.error || 'Kunde inte skicka OSA')
      }
      
      const result = await response.json()
      console.log('Success response:', result)
      setSubmitSuccess(true)
      reset()
      createConfetti()
      onSuccess?.()
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err: unknown) {
      console.error('OSA submission error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Ett fel uppstod. Försök igen.'
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tack för ditt svar!</h2>
        <p className="text-gray-600">Vi har mottagit din OSA och ser fram emot att fira med dig!</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute -top-4 -left-4 opacity-30 transform -rotate-12">
        <FlowerDecoration size="small" variant="flower" />
      </div>
      <div className="absolute -top-4 -right-4 opacity-30 transform rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-pink-100"
      >
        <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Antal personer <span className="text-red-500">*</span>
              </label>
              <input
                type="hidden"
                {...register('number_of_attendees', { valueAsNumber: true })}
              />
              <div className="flex flex-wrap gap-2 justify-center">
                {GUEST_COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setValue('number_of_attendees', n)
                      updateAttendeesCount(n)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      number_of_attendees === n
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={isSubmitting}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {errors.number_of_attendees && (
                <p className="mt-2 text-sm text-red-500">{errors.number_of_attendees.message}</p>
              )}
            </div>

            <div className="space-y-8 mb-8">
              {fields.map((field, index) => (
                <div key={field.id} className="p-6 bg-pink-50/50 rounded-xl border border-pink-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Person {index + 1}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Förnamn <span className="text-red-500">*</span></label>
                      <input
                        {...register(`attendees.${index}.firstname`)}
                        className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none disabled:bg-gray-100 text-black"
                        placeholder="Förnamn"
                        disabled={isSubmitting}
                      />
                      {errors.attendees?.[index]?.firstname && (
                        <p className="mt-1 text-sm text-red-500">{errors.attendees[index]?.firstname?.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Efternamn <span className="text-red-500">*</span></label>
                      <input
                        {...register(`attendees.${index}.lastname`)}
                        className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none disabled:bg-gray-100 text-black"
                        placeholder="Efternamn"
                        disabled={isSubmitting}
                      />
                      {errors.attendees?.[index]?.lastname && (
                        <p className="mt-1 text-sm text-red-500">{errors.attendees[index]?.lastname?.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergier</label>
                    <input
                      {...register(`attendees.${index}.allergies`)}
                      className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none disabled:bg-gray-100 text-black"
                      placeholder="T.ex. nötter, gluten..."
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(`attendees.${index}.wants_bus`)}
                        className="w-4 h-4 text-pink-600 border-gray-400 rounded focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                      <span className="ml-2 text-gray-900">Jag vill åka med buss</span>
                    </label>
                    {attendees[index]?.wants_bus && osa.busInfo && (
                      <div className="mt-3 ml-6 p-3 bg-pink-100 rounded-lg border border-pink-200">
                        <p className="text-gray-700 text-sm leading-relaxed">{osa.busInfo}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Om denna låt spelas på festen kan jag inte sitta stilla
                    </label>
                    <input
                      {...register(`attendees.${index}.song_request`)}
                      className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none disabled:bg-gray-100 text-black"
                      placeholder="Artist - Låtnamn"
                      disabled={isSubmitting}
                    />
                    {errors.attendees?.[index]?.song_request && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.attendees[index]?.song_request?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.attendees && typeof errors.attendees.message === 'string' && (
              <p className="mb-4 text-sm text-red-500">{errors.attendees.message}</p>
            )}
        </>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Skickar...
            </span>
          ) : (
            'Skicka OSA'
          )}
        </button>
      </form>
    </div>
  )
}
