'use client'

import Button from '@/components/ui/Button'
import { sectionTexts } from '@/config/section-texts'

interface GuestCountSelectorProps {
  value: number
  onChange: (count: number) => void
  disabled?: boolean
}

const GUEST_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6] as const

export default function GuestCountSelector({
  value,
  onChange,
  disabled = false,
}: GuestCountSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {sectionTexts.rsvp.form.guestCount.label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2 justify-center">
        {GUEST_COUNT_OPTIONS.map((n) => (
          <Button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            variant={value === n ? 'primary' : 'secondary'}
            size="sm"
            disabled={disabled}
            className="min-w-[2.25rem] w-[2.25rem] active:scale-95 transition-transform duration-150"
          >
            {n}
          </Button>
        ))}
      </div>
    </div>
  )
}
