'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { RSVPFormData } from '@/lib/validations/rsvp'
import FormField from './FormField'
import FlowerDecoration from '../FlowerDecoration'
import { useFormGradients } from '@/hooks/useFormGradients'
import { useColors } from '../ColorSchemeProvider'
import { weddingConfig } from '@/config/wedding'

interface PersonFormSectionProps {
  index: number
  register: UseFormRegister<RSVPFormData>
  errors: FieldErrors<RSVPFormData>
  disabled?: boolean
  wantsBus: boolean
}

export default function PersonFormSection({
  index,
  register,
  errors,
  disabled = false,
  wantsBus,
}: PersonFormSectionProps) {
  const colors = useColors()
  const gradients = useFormGradients()
  const { osa } = weddingConfig

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
          Person {index + 1}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FormField
            {...register(`attendees.${index}.firstname`)}
            label="Förnamn"
            required
            disabled={disabled}
            placeholder="Förnamn"
            error={errors.attendees?.[index]?.firstname?.message}
          />
          <FormField
            {...register(`attendees.${index}.lastname`)}
            label="Efternamn"
            required
            disabled={disabled}
            placeholder="Efternamn"
            error={errors.attendees?.[index]?.lastname?.message}
          />
        </div>
        
        <div className="mb-4">
          <FormField
            {...register(`attendees.${index}.allergies`)}
            label="Allergier"
            disabled={disabled}
            placeholder="T.ex. nötter, gluten..."
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
            <span className="ml-2 text-gray-900">Jag vill åka med buss</span>
          </label>
          {wantsBus && osa.busInfo && (
            <div className={`mt-3 ml-6 p-3 ${colors.bgLightHover} rounded-lg border ${colors.borderLight}`}>
              <p className="text-gray-700 text-sm leading-relaxed">{osa.busInfo}</p>
            </div>
          )}
        </div>
        
        <div>
          <FormField
            {...register(`attendees.${index}.song_request`)}
            label="Om denna låt spelas på festen kan jag inte sitta stilla"
            disabled={disabled}
            placeholder="Artist - Låtnamn"
            error={errors.attendees?.[index]?.song_request?.message}
          />
        </div>
      </div>
    </div>
  )
}
