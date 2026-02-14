'use client'

import { sectionTexts } from '@/config/section-texts'
import { useColors } from '@/components/ColorSchemeProvider'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SuccessMessageProps {
  /** When false, show sad smiley and not-attending message. When true or undefined, show happy success. */
  attending?: boolean
  onDismiss?: () => void
}

export default function SuccessMessage({ attending = true, onDismiss }: SuccessMessageProps) {
  const colors = useColors()
  const successTexts = sectionTexts.rsvp.form.success
  const isAttending = attending

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
        {isAttending ? (
          <svg
            className={cn('mx-auto h-16 w-16', colors.text)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <span className="text-6xl block text-center" role="img" aria-label="sad">
            😢
          </span>
        )}
      </div>
      <h2 className={cn('text-2xl font-bold mb-2', colors.textDark)}>{sectionTexts.success.heading}</h2>
      <p className="text-gray-600">
        {isAttending ? successTexts.message : successTexts.messageNotAttending}
      </p>
      {isAttending && successTexts.emailConfirmation && (
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
