'use client'

import { memo } from 'react'
import type { InputHTMLAttributes } from 'react'
import { classNames } from '@/lib/utils/classNames'
import { generateFieldId, getAriaLabel, getAriaDescribedBy } from '@/lib/utils/accessibility'

/**
 * Props for FormField component
 */
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input field */
  label: string
  /** Error message to display below the input */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Custom field ID (auto-generated if not provided) */
  fieldId?: string
}

/**
 * Reusable form input field component with label, error display, and accessibility support
 * Memoized to prevent unnecessary re-renders when parent form state changes
 * 
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   type="email"
 *   required
 *   error={errors.email?.message}
 *   {...register('email')}
 * />
 * ```
 */
const FormField = memo(function FormField({
  label,
  error,
  required,
  className = '',
  fieldId,
  id,
  ...inputProps
}: FormFieldProps) {
  const inputId = id || fieldId || generateFieldId('field')
  const errorId = `${inputId}-error`
  const hasError = !!error

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500" aria-label="obligatorisk">*</span>}
      </label>
      <input
        {...inputProps}
        id={inputId}
        aria-label={getAriaLabel(label, required)}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={getAriaDescribedBy(inputId, hasError)}
        className={classNames(
          'w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none disabled:bg-gray-100 text-black',
          hasError ? 'border-red-500' : 'border-gray-400',
          className
        )}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default FormField
