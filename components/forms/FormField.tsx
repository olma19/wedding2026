'use client'

import type { InputHTMLAttributes } from 'react'
import { classNames } from '@/lib/utils/classNames'
import { generateFieldId, getAriaLabel, getAriaDescribedBy } from '@/lib/utils/accessibility'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
  fieldId?: string
}

export default function FormField({
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
}
