'use client'

import type { RSVP } from '@/types/rsvp'
import { useColors } from '@/components/ColorSchemeProvider'
import { cn } from '@/lib/utils'

interface AdminRSVPModalProps {
  rsvp: RSVP
  onClose: () => void
}

interface Attendee {
  firstname?: string
  lastname?: string
  allergies?: string
  wants_bus?: boolean
  song_request?: string
}

export default function AdminRSVPModal({ rsvp, onClose }: AdminRSVPModalProps) {
  const colors = useColors()
  const attendees = (rsvp.attendees ?? []) as Attendee[]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={cn('bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2', colors.borderLight)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn('sticky top-0 text-white px-6 py-4 flex items-center justify-between rounded-t-lg', colors.bgDark)}>
          <h2 className="text-xl font-bold">RSVP Detaljer</h2>
          <button
            onClick={onClose}
            className={cn('text-white text-2xl font-bold', colors.bgDarkHover)}
            aria-label="Stäng"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className={cn('text-sm font-medium mb-1', colors.textMedium)}>Status</h3>
              <p className="text-lg">
                {rsvp.attending ? (
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    Kommer
                  </span>
                ) : (
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                    Kommer inte
                  </span>
                )}
              </p>
            </div>
            <div>
              <h3 className={cn('text-sm font-medium mb-1', colors.textMedium)}>Antal personer</h3>
              <p className="text-lg">{rsvp.number_of_attendees}</p>
            </div>
            {attendees.length > 0 && (
              <div>
                <h3 className={cn('text-sm font-medium mb-2', colors.textMedium)}>Gäster</h3>
                <div className="space-y-3">
                  {attendees.map((attendee, index) => (
                    <div key={index} className={cn('rounded-lg p-4', colors.bgLight)}>
                      <p className={cn('font-semibold', colors.textDark)}>
                        {attendee.firstname} {attendee.lastname}
                      </p>
                      {attendee.allergies && (
                        <p className={cn('text-sm mt-1', colors.textMedium)}>
                          <span className="font-medium">Allergier:</span> {attendee.allergies}
                        </p>
                      )}
                      {attendee.wants_bus && (
                        <p className={cn('text-sm mt-1', colors.text)}>🚌 Vill åka med buss</p>
                      )}
                      {attendee.song_request && (
                        <p className={cn('text-sm mt-1', colors.textMedium)}>
                          <span className="font-medium">Låt:</span> {attendee.song_request}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className={cn('text-sm font-medium mb-1', colors.textMedium)}>Inskickad</h3>
              <p className="text-lg">
                {rsvp.created_at
                  ? new Date(rsvp.created_at).toLocaleString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
