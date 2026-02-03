'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormData } from '@/lib/validations/rsvp'
import FlowerDecoration from './FlowerDecoration'
import { useFormGradients } from '@/hooks/useFormGradients'
import { useColors } from './ColorSchemeProvider'
import { useRSVPSubmission } from '@/hooks/useRSVPSubmission'
import GuestCountSelector from './forms/GuestCountSelector'
import PersonFormSection from './forms/PersonFormSection'
import SuccessMessage from './forms/SuccessMessage'
import FormField from './forms/FormField'
import Button from '@/components/ui/Button'
import { classNames } from '@/lib/utils/classNames'
import ErrorBoundary from './ErrorBoundary'
import { sectionTexts } from '@/config/section-texts'

interface RSVPFormProps {
  onSuccess?: () => void
}

/**
 * RSVP Form Component
 * Handles guest RSVP submissions with validation and error handling
 */
export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const colors = useColors()
  const gradients = useFormGradients()
  const { submitRSVP, isSubmitting, submitError, submitSuccess, reset: resetSubmission } = useRSVPSubmission(onSuccess)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: true,
      email: '',
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

  const onSubmit = async (data: RSVPFormData) => {
    await submitRSVP(data)
    resetForm()
    resetSubmission()
  }

  if (submitSuccess) {
    return (
      <ErrorBoundary>
        <SuccessMessage />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="relative">
      <div className="absolute -top-4 -left-4 opacity-30 transform -rotate-12">
        <FlowerDecoration size="small" />
      </div>
      <div className="absolute -top-4 -right-4 opacity-30 transform rotate-12">
        <FlowerDecoration size="small" variant="leaf" />
      </div>
      <div className="absolute -bottom-4 -left-8 opacity-20 transform rotate-45">
        <FlowerDecoration size="medium" />
      </div>
      <div className="absolute -bottom-4 -right-8 opacity-20 transform -rotate-45">
        <FlowerDecoration size="small" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(
          'relative max-w-2xl mx-auto bg-gradient-to-br rounded-lg shadow-xl p-8 border-2 overflow-hidden backdrop-blur-sm',
          gradients.outer,
          colors.borderLight
        )}
        noValidate
        aria-label={sectionTexts.rsvp.form.ariaLabel}
      >
        {/* Decorative background elements */}
        <div className="absolute top-4 right-4 opacity-10">
          <FlowerDecoration size="medium" seed="form-top-right" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-10 transform rotate-180">
          <FlowerDecoration size="medium" seed="form-bottom-left" />
        </div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:30px_30px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <input
            type="hidden"
            {...register('number_of_attendees', { valueAsNumber: true })}
          />
          
          <GuestCountSelector
            value={number_of_attendees}
            onChange={(n) => {
              setValue('number_of_attendees', n)
              updateAttendeesCount(n)
            }}
            disabled={isSubmitting}
          />
          {errors.number_of_attendees && (
            <p className="mt-2 text-sm text-red-500 text-center">{errors.number_of_attendees.message}</p>
          )}

          <div className="space-y-8 mb-8">
            {fields.map((field, index) => (
              <PersonFormSection
                key={field.id}
                index={index}
                register={register}
                errors={errors}
                disabled={isSubmitting}
                wantsBus={attendees[index]?.wants_bus || false}
              />
            ))}
          </div>
          {errors.attendees && typeof errors.attendees.message === 'string' && (
            <p className="mb-4 text-sm text-red-500">{errors.attendees.message}</p>
          )}

          {/* Email field - moved to bottom */}
          <div className="mb-6">
            <FormField
              {...register('email')}
              label={sectionTexts.rsvp.form.email.label}
              type="email"
              disabled={isSubmitting}
              placeholder={sectionTexts.rsvp.form.email.placeholder}
              error={errors.email?.message}
            />
            <p className="mt-1 text-xs text-gray-600">
              {sectionTexts.rsvp.form.email.helpText}
            </p>
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full"
            size="lg"
          >
            {sectionTexts.rsvp.form.submit.label}
          </Button>
        </div>
      </form>
      </div>
    </ErrorBoundary>
  )
}
