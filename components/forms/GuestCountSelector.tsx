'use client'

import { useColors } from '../ColorSchemeProvider'

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
  const colors = useColors()

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Antal personer <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2 justify-center">
        {GUEST_COUNT_OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              value === n
                ? `${colors.bgDark} text-white shadow-md`
                : `bg-white text-gray-700 border-2 border-gray-300 ${colors.borderHover} ${colors.bgLightHover}`
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={disabled}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
