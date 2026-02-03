/**
 * Test script for RSVP email functionality
 * Run with: npx tsx scripts/test-email.ts
 */

import { sendRSVPConfirmationEmail } from '../lib/email/resend'
import { weddingConfig } from '../config/wedding'

async function testEmail() {
  console.log('🧪 Testing RSVP confirmation email...\n')

  // Check if Resend is configured
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY not found in environment variables')
    console.log('   Make sure you have RESEND_API_KEY in your .env or .env.local file')
    process.exit(1)
  }

  console.log('✅ Resend API key found')
  console.log(`📧 From email: ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}`)
  console.log(`👤 From name: ${process.env.RESEND_FROM_NAME || 'Kristian & Mimmi'}\n`)

  // Test email data
  const testEmailData = {
    to: process.env.TEST_EMAIL || 'test@example.com', // Change this to your email
    guestName: 'Test Gäst',
    numberOfAttendees: 2,
    attendees: [
      {
        firstname: 'Test',
        lastname: 'Gäst',
        allergies: 'Nötter',
        wants_bus: true,
        song_request: 'Test Artist - Test Song',
      },
      {
        firstname: 'Test',
        lastname: 'Gäst 2',
        allergies: '',
        wants_bus: false,
        song_request: '',
      },
    ],
    weddingDate: weddingConfig.date.fullDate,
    weddingLocation: weddingConfig.location.fullAddress || weddingConfig.location.address,
    coupleNames: `${weddingConfig.couple.name1} & ${weddingConfig.couple.name2}`,
  }

  console.log('📤 Sending test email...')
  console.log(`   To: ${testEmailData.to}`)
  console.log(`   Subject: OSA Bekräftelse - ${testEmailData.coupleNames}\n`)

  const result = await sendRSVPConfirmationEmail(testEmailData)

  if (result.success) {
    console.log('✅ Email sent successfully!')
    console.log('   Check your inbox (and spam folder) for the confirmation email.')
  } else {
    console.error('❌ Failed to send email:')
    console.error(`   Error: ${result.error}`)
    console.log('\n💡 Troubleshooting:')
    console.log('   1. Check that RESEND_API_KEY is correct')
    console.log('   2. For testing, use onboarding@resend.dev as RESEND_FROM_EMAIL')
    console.log('   3. Check Resend dashboard for delivery status')
    process.exit(1)
  }
}

testEmail().catch((error) => {
  console.error('❌ Unexpected error:', error)
  process.exit(1)
})
