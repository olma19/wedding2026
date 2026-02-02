/**
 * Type definitions for form components
 */

export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export interface PersonFormData {
  firstname: string
  lastname: string
  allergies?: string
  wants_bus: boolean
  song_request?: string
}

export interface RSVPFormState {
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
}
