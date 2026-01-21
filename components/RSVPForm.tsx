'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormData } from '@/lib/validations/rsvp'
import FlowerDecoration from './FlowerDecoration'

interface RSVPFormProps {
  onSuccess?: () => void
}

export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: true,
      number_of_attendees: 1,
    },
  })

  const attending = watch('attending')

  const createConfetti = () => {
    const colors = ['#f472b6', '#ec4899', '#f9a8d4', '#fbbf24', '#f59e0b']
    const confettiCount = 50

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 0.5 + 's'
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'
        document.body.appendChild(confetti)

        setTimeout(() => {
          confetti.remove()
        }, 3000)
      }, i * 20)
    }
  }

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit RSVP')
      }

      setSubmitSuccess(true)
      reset()
      
      // Confetti effect
      createConfetti()
      
      if (onSuccess) {
        onSuccess()
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error: any) {
      setSubmitError(error.message || 'Ett fel uppstod. Försök igen senare.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tack för ditt svar!
        </h2>
        <p className="text-gray-600">
          Vi har mottagit din RSVP och ser fram emot att fira med dig!
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Decorative flowers around form */}
      <div className="absolute -top-4 -left-4 opacity-30 transform -rotate-12">
        <FlowerDecoration size="small" variant="flower" />
      </div>
      <div className="absolute -top-4 -right-4 opacity-30 transform rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      <div className="absolute -bottom-4 -left-4 opacity-30 transform rotate-12">
        <FlowerDecoration size="small" variant="flower" />
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-30 transform -rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-pink-100"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <FlowerDecoration size="small" variant="flower" className="opacity-50" />
          <h2 className="text-3xl font-bold text-center text-gray-800">
            RSVP
          </h2>
          <FlowerDecoration size="small" variant="flower" className="opacity-50" />
        </div>

      {/* Guest Name */}
      <div className="mb-6">
        <label
          htmlFor="guest_name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Namn <span className="text-red-500">*</span>
        </label>
        <input
          id="guest_name"
          type="text"
          {...register('guest_name')}
          className={`w-full px-4 py-2.5 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition placeholder:text-gray-400 ${
            errors.guest_name
              ? 'border-red-600 bg-red-50'
              : 'border-gray-400 hover:border-gray-500'
          } disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
          placeholder="Ditt namn"
          disabled={isSubmitting}
        />
        {errors.guest_name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.guest_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          E-post (valfritt)
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-2.5 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition placeholder:text-gray-400 ${
            errors.email 
              ? 'border-red-600 bg-red-50' 
              : 'border-gray-400 hover:border-gray-500'
          } disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
          placeholder="din@epost.se"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Attending */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Kommer du att delta? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              checked={attending === true}
              onChange={() => setValue('attending', true)}
              className="w-4 h-4 text-pink-600 border-gray-400 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            <span className="ml-2 text-gray-900 font-medium">Ja, jag kommer!</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              checked={attending === false}
              onChange={() => setValue('attending', false)}
              className="w-4 h-4 text-pink-600 border-gray-400 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            <span className="ml-2 text-gray-900 font-medium">Tyvärr, jag kan inte</span>
          </label>
        </div>
        {errors.attending && (
          <p className="mt-1 text-sm text-red-500">
            {errors.attending.message}
          </p>
        )}
      </div>

      {/* Number of Attendees - only show if attending */}
      {attending && (
        <div className="mb-6">
          <label
            htmlFor="number_of_attendees"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Antal personer <span className="text-red-500">*</span>
          </label>
          <input
            id="number_of_attendees"
            type="number"
            min="1"
            max="20"
            {...register('number_of_attendees', { valueAsNumber: true })}
            className={`w-full px-4 py-2.5 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition ${
              errors.number_of_attendees
                ? 'border-red-600 bg-red-50'
                : 'border-gray-400 hover:border-gray-500'
            } disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
            disabled={isSubmitting}
          />
          {errors.number_of_attendees && (
            <p className="mt-1 text-sm text-red-500">
              {errors.number_of_attendees.message}
            </p>
          )}
        </div>
      )}

      {/* Food Allergies */}
      {attending && (
        <div className="mb-6">
          <label
            htmlFor="food_allergies"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Matallergier (valfritt)
          </label>
          <textarea
            id="food_allergies"
            rows={3}
            {...register('food_allergies')}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition resize-none placeholder:text-gray-400 hover:border-gray-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            placeholder="Beskriv eventuella matallergier..."
            disabled={isSubmitting}
          />
          {errors.food_allergies && (
            <p className="mt-1 text-sm text-red-500">
              {errors.food_allergies.message}
            </p>
          )}
        </div>
      )}

      {/* Dietary Restrictions */}
      {attending && (
        <div className="mb-6">
          <label
            htmlFor="dietary_restrictions"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kostpreferenser (valfritt)
          </label>
          <textarea
            id="dietary_restrictions"
            rows={3}
            {...register('dietary_restrictions')}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition resize-none placeholder:text-gray-400 hover:border-gray-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            placeholder="T.ex. vegetarisk, vegansk, glutenfri..."
            disabled={isSubmitting}
          />
          {errors.dietary_restrictions && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dietary_restrictions.message}
            </p>
          )}
        </div>
      )}

      {/* Special Requests */}
      {attending && (
        <div className="mb-6">
          <label
            htmlFor="special_requests"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Övriga önskemål eller meddelanden (valfritt)
          </label>
          <textarea
            id="special_requests"
            rows={4}
            {...register('special_requests')}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition resize-none placeholder:text-gray-400 hover:border-gray-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            placeholder="Skriv här om du har några övriga önskemål..."
            disabled={isSubmitting}
          />
          {errors.special_requests && (
            <p className="mt-1 text-sm text-red-500">
              {errors.special_requests.message}
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all transform ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-pink-600 hover:bg-pink-700 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 active:scale-95'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Skickar...
          </span>
        ) : (
          'Skicka RSVP'
        )}
      </button>
      </form>
    </div>
  )
}
