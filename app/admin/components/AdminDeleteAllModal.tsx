'use client'

import { useColors } from '@/components/ColorSchemeProvider'
import { cn } from '@/lib/utils'

const CONFIRM_WORD = 'DELETE'

interface AdminDeleteAllModalProps {
  confirmText: string
  onConfirmTextChange: (value: string) => void
  onConfirm: () => Promise<void>
  onClose: () => void
  loading: boolean
  rsvpCount: number
}

export default function AdminDeleteAllModal({
  confirmText,
  onConfirmTextChange,
  onConfirm,
  onClose,
  loading,
  rsvpCount,
}: AdminDeleteAllModalProps) {
  const colors = useColors()
  const canConfirm = confirmText === CONFIRM_WORD && !loading

  const handleConfirm = async () => {
    if (!canConfirm) return
    await onConfirm()
  }

  const handleClose = () => {
    if (loading) return
    onConfirmTextChange('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className={cn(
          'bg-white rounded-xl shadow-xl max-w-md w-full border-2',
          colors.borderLight
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            'text-white px-6 py-4 flex items-center justify-between rounded-t-xl',
            colors.bgDark
          )}
        >
          <h2 className="text-xl font-semibold">Ta bort alla RSVPs</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white/90 hover:text-white text-2xl font-bold disabled:opacity-50"
            aria-label="Stäng"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-gray-700">
            Detta tar bort alla <strong>{rsvpCount}</strong> RSVP(s) permanent. Du kan inte ångra detta.
          </p>
          <p className="text-sm text-gray-600">
            Skriv <strong className="text-red-600">{CONFIRM_WORD}</strong> nedan för att bekräfta.
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => onConfirmTextChange(e.target.value)}
            placeholder={CONFIRM_WORD}
            disabled={loading}
            className={cn(
              'w-full px-4 py-2 rounded-lg border-2 text-lg font-mono',
              colors.borderMedium,
              'focus:outline-none focus:ring-2',
              colors.ring,
              confirmText && confirmText !== CONFIRM_WORD && 'border-red-400 bg-red-50'
            )}
            aria-label="Skriv DELETE för att bekräfta"
            autoComplete="off"
          />
        </div>
        <div className="px-6 py-4 flex justify-end gap-3 rounded-b-xl bg-gray-50 border-t">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className={cn(
              'px-4 py-2 rounded-lg font-medium border transition-colors disabled:opacity-50',
              colors.borderMedium,
              colors.text,
              'hover:bg-gray-100'
            )}
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              canConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
            )}
          >
            {loading ? 'Tar bort…' : 'Ta bort alla'}
          </button>
        </div>
      </div>
    </div>
  )
}
