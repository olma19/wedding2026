'use client'

import { sectionTexts } from '@/config/section-texts'

export default function SuccessMessage() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-4">
        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{sectionTexts.success.heading}</h2>
      <p className="text-gray-600">{sectionTexts.rsvp.form.success.message}</p>
    </div>
  )
}
