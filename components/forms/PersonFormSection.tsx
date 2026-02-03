'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { RSVPFormData } from '@/lib/validations/rsvp'
import FormField from './FormField'
import FlowerDecoration from '../FlowerDecoration'
import { useFormGradients } from '@/hooks/useFormGradients'
import { useColors } from '../ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'
import { sectionTexts, formatSectionText } from '@/config/section-texts'

/**
 * Props for PersonFormSection component
 */
interface PersonFormSectionProps {
  /** Index of the person in the attendees array */
  index: number
  /** React Hook Form register function */
  register: UseFormRegister<RSVPFormData>
  /** React Hook Form errors object */
  errors: FieldErrors<RSVPFormData>
  /** Whether the form is disabled */
  disabled?: boolean
  /** Whether the person wants bus transportation */
  wantsBus: boolean
}

/**
 * Form section for collecting individual person's details
 * Includes name, allergies, bus preference, and song request fields
 * 
 * @example
 * ```tsx
 * <PersonFormSection
 *   index={0}
 *   register={register}
 *   errors={errors}
 *   disabled={isSubmitting}
 *   wantsBus={attendees[0]?.wants_bus || false}
 * />
 * ```
 */
export default function PersonFormSection({
  index,
  register,
  errors,
  disabled = false,
  wantsBus,
}: PersonFormSectionProps) {
  const colors = useColors()
  const gradients = useFormGradients()
  const { rsvp } = weddingConfig

  return (
    <div 
      className={`relative p-6 bg-gradient-to-br ${gradients.inner} rounded-xl border-2 ${colors.borderLight} shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden backdrop-blur-sm`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-2 right-2 opacity-10">
        <FlowerDecoration size="small" seed={`person-${index}`} />
      </div>
      <div className="absolute bottom-2 left-2 opacity-10 transform rotate-180">
        <FlowerDecoration size="small" seed={`person-${index}-2`} />
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className={`text-lg font-semibold ${colors.textDark} mb-4 flex items-center gap-2`}>
          <span className={`text-xl ${colors.icon}`}>👤</span>
          {formatSectionText(sectionTexts.rsvp.form.person.label, { number: String(index + 1) })}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FormField
            {...register(`attendees.${index}.firstname`)}
            label={sectionTexts.rsvp.form.person.firstName.label}
            required
            disabled={disabled}
            placeholder={sectionTexts.rsvp.form.person.firstName.placeholder}
            error={errors.attendees?.[index]?.firstname?.message}
          />
          <FormField
            {...register(`attendees.${index}.lastname`)}
            label={sectionTexts.rsvp.form.person.lastName.label}
            required
            disabled={disabled}
            placeholder={sectionTexts.rsvp.form.person.lastName.placeholder}
            error={errors.attendees?.[index]?.lastname?.message}
          />
        </div>
        
        <div className="mb-4">
          <FormField
            {...register(`attendees.${index}.allergies`)}
            label={sectionTexts.rsvp.form.person.allergies.label}
            disabled={disabled}
            placeholder={sectionTexts.rsvp.form.person.allergies.placeholder}
          />
        </div>
        
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register(`attendees.${index}.wants_bus`)}
              className={`w-4 h-4 ${colors.icon} border-gray-400 rounded ${colors.ring} disabled:opacity-50`}
              disabled={disabled}
            />
            <span className="ml-2 text-gray-900">{sectionTexts.rsvp.form.person.bus.label}</span>
          </label>
          {wantsBus && rsvp.busInfo && (
            <div className={`mt-3 ml-6 p-3 ${colors.bgLightHover} rounded-lg border ${colors.borderLight}`}>
              <p className="text-gray-700 text-sm leading-relaxed">{rsvp.busInfo}</p>
            </div>
          )}
        </div>
        
        <div>
          <FormField
            {...register(`attendees.${index}.song_request`)}
            label={sectionTexts.rsvp.form.person.songRequest.label}
            disabled={disabled}
            placeholder={sectionTexts.rsvp.form.person.songRequest.placeholder}
            error={errors.attendees?.[index]?.song_request?.message}
          />
        </div>
      </div>
    </div>
  )
}
