'use client'

import { sectionTexts } from '@/config/section-texts'
import { useColors } from '@/components/ColorSchemeProvider'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SuccessMessageProps {
  onDismiss?: () => void
}

export default function SuccessMessage({ onDismiss }: SuccessMessageProps) {
  const colors = useColors()
  const successTexts = sectionTexts.rsvp.form.success

  return (
    <div
      data-testid="rsvp-success"
      className={cn(
        'max-w-2xl mx-auto rounded-xl shadow-lg p-8 text-center border-2',
        colors.bgLight,
        colors.borderLight
      )}
    >
      <div className="mb-4">
        <svg
          className={cn('mx-auto h-16 w-16', colors.text)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className={cn('text-2xl font-bold mb-2', colors.textDark)}>{sectionTexts.success.heading}</h2>
      <p className="text-gray-600">{successTexts.message}</p>
      {successTexts.emailConfirmation && (
        <p className="mt-3 text-sm text-gray-500">{successTexts.emailConfirmation}</p>
      )}
      {onDismiss && (
        <div className="mt-6">
          <Button type="button" onClick={onDismiss}>
            {sectionTexts.rsvp.form.success.okButton ?? 'OK'}
          </Button>
        </div>
      )}
    </div>
  )
}
