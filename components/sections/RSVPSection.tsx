'use client'

import { useState, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import SectionTitle from '../SectionTitle'
import RSVPForm from '../RSVPForm'
import { weddingConfig } from '@/config/wedding'
import { useColors } from '../ColorSchemeProvider'
import { sectionTexts, formatSectionText } from '@/config/section-texts'

export default function RSVPSection() {
  const { rsvp } = weddingConfig
  const colors = useColors()
  const [guestAllowed, setGuestAllowed] = useState<boolean | null>(null)
  const [inviteCode, setInviteCode] = useState('')
  const [codeError, setCodeError] = useState<string | null>(null)
  const [codeLoading, setCodeLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/rsvp/access')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        // Gate disabled (RSVP_INVITE_CODE not set) → show form, never show code field
        if (data?.gateEnabled === false) {
          setGuestAllowed(true)
          return
        }
        if (data?.allowed === true) setGuestAllowed(true)
        else setGuestAllowed(false)
      })
      .catch(() => {
        if (!cancelled) setGuestAllowed(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCodeError(null)
    setCodeLoading(true)
    try {
      const res = await fetch('/api/rsvp/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inviteCode }),
      })
      const data = await res.json()
      if (res.ok && data?.success) {
        setGuestAllowed(true)
      } else {
        setCodeError(sectionTexts.rsvp.inviteGate.errorWrongCode)
      }
    } catch {
      setCodeError(sectionTexts.rsvp.inviteGate.errorWrongCode)
    } finally {
      setCodeLoading(false)
    }
  }

  const gate = sectionTexts.rsvp.inviteGate

  return (
    <SectionWrapper
      id="rsvp"
      background="white"
      decorations={[
        { position: 'top-left', size: 'medium', opacity: 0.2 },
        { position: 'top-right', size: 'small', variant: 'leaf', opacity: 0.2 },
        { position: 'bottom-right', size: 'medium', opacity: 0.2 },
      ]}
      scrollMargin={false}
      showScrollAnimation={false}
    >
      <div className="text-center mb-12">
        <SectionTitle title={sectionTexts.rsvp.title} showDivider={false} />
        <div className={`h-1 w-24 ${colors.bgMedium} mx-auto mb-4`}></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {formatSectionText(sectionTexts.rsvp.description, { deadline: rsvp.deadline.toLowerCase() })}
        </p>
      </div>

      {guestAllowed === null && (
        <div className="mt-12 flex justify-center">
          <div className="animate-pulse h-10 w-48 rounded bg-gray-200" aria-hidden />
        </div>
      )}

      {guestAllowed === false && (
        <div className="mt-12 max-w-sm mx-auto">
          <form onSubmit={handleInviteSubmit} className="space-y-4">
            <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 text-left">
              {gate.label}
            </label>
            <input
              id="invite-code"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder={gate.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              autoComplete="off"
              disabled={codeLoading}
            />
            {codeError && (
              <p className="text-sm text-red-600" role="alert">
                {codeError}
              </p>
            )}
            <button
              type="submit"
              disabled={codeLoading}
              className={`w-full py-3 rounded-lg font-medium text-white transition ${colors.bgMedium} hover:opacity-90 disabled:opacity-70`}
            >
              {codeLoading ? sectionTexts.rsvp.form.submit.loading : gate.submit}
            </button>
          </form>
        </div>
      )}

      {guestAllowed === true && (
        <div className="mt-12">
          <RSVPForm />
        </div>
      )}
    </SectionWrapper>
  )
}
