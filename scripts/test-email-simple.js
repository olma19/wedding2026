/**
 * Simple test script for RSVP email functionality
 * Run with: node scripts/test-email-simple.js
 * 
 * Note: Make sure your .env or .env.local file has RESEND_API_KEY set
 */

// Simple env loader (since dotenv might not be installed)
const fs = require('fs')
const path = require('path')

function loadEnv() {
  const envFiles = ['.env.local', '.env']
  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      content.split('\n').forEach(line => {
        // Skip comments and empty lines
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) return
        
        // Match KEY=VALUE format
        const match = trimmed.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          if (!process.env[key]) {
            process.env[key] = value
          }
        }
      })
    }
  }
}

loadEnv()

const { Resend } = require('resend')

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
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const fromName = process.env.RESEND_FROM_NAME || 'Kristian & Mimmi'
  console.log(`📧 From email: ${fromEmail}`)
  console.log(`👤 From name: ${fromName}\n`)

  const resend = new Resend(apiKey)
  const testEmail = 'marreolsson19@gmail.com'

  // Test email data
  const guestName = 'Test Gäst'
  const numberOfAttendees = 2
  const attendees = [
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
  ]

  const weddingDate = '27 Juni 2026'
  const weddingLocation = 'Eksjöhovgårdsvägen, 576 91 Sävsjö'
  const coupleNames = 'Kristian & Mimmi'

  const attendeeList = attendees
    .map((attendee, index) => {
      const parts = [`${index + 1}. ${attendee.firstname} ${attendee.lastname}`]
      if (attendee.allergies) {
        parts.push(`   Allergier: ${attendee.allergies}`)
      }
      if (attendee.wants_bus) {
        parts.push(`   Buss: Ja`)
      }
      if (attendee.song_request) {
        parts.push(`   Låt: ${attendee.song_request}`)
      }
      return parts.join('\n')
    })
    .join('\n\n')

  const htmlContent = `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OSA Bekräftelse</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #a7c4a0 0%, #8fb38a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">OSA Bekräftelse</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hej ${guestName.split(',')[0].trim()}!
              </p>
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Tack för din OSA! Vi har mottagit din anmälan och ser fram emot att fira tillsammans med dig.
              </p>
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h2 style="margin: 0 0 16px; color: #111827; font-size: 20px; font-weight: 600;">Din OSA</h2>
                <p style="margin: 0 0 12px; color: #374151; font-size: 14px;">
                  <strong>Antal personer:</strong> ${numberOfAttendees}
                </p>
                <div style="margin-top: 16px;">
                  <p style="margin: 0 0 8px; color: #374151; font-size: 14px; font-weight: 600;">Gäster:</p>
                  <pre style="margin: 0; color: #374151; font-size: 14px; font-family: inherit; white-space: pre-wrap;">${attendeeList}</pre>
                </div>
              </div>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 16px; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">📅 ${weddingDate}</p>
                <p style="margin: 8px 0 0; color: #92400e; font-size: 14px;">📍 ${weddingLocation}</p>
              </div>
              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Om du behöver ändra din OSA eller har några frågor, kontakta oss gärna.
              </p>
              <p style="margin: 24px 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Med vänliga hälsningar,<br>
                <strong>${coupleNames}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Detta är ett automatiskt meddelande. Svara inte på detta e-post.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const textContent = `
OSA Bekräftelse

Hej ${guestName.split(',')[0].trim()}!

Tack för din OSA! Vi har mottagit din anmälan och ser fram emot att fira tillsammans med dig.

Din OSA:
Antal personer: ${numberOfAttendees}

Gäster:
${attendeeList}

📅 ${weddingDate}
📍 ${weddingLocation}

Om du behöver ändra din OSA eller har några frågor, kontakta oss gärna.

Med vänliga hälsningar,
${coupleNames}

---
Detta är ett automatiskt meddelande. Svara inte på detta e-post.
  `.trim()

  console.log('📤 Sending test email...')
  console.log(`   To: ${testEmail}`)
  console.log(`   From: ${fromName} <${fromEmail}>`)
  console.log(`   Subject: OSA Bekräftelse - ${coupleNames}\n`)

  try {
    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: testEmail,
      subject: `OSA Bekräftelse - ${coupleNames}`,
      html: htmlContent,
      text: textContent,
    })

    if (result.error) {
      console.error('❌ Failed to send email:')
      console.error(`   Error: ${result.error.message || JSON.stringify(result.error)}`)
      console.log('\n💡 Troubleshooting:')
      console.log('   1. Check that RESEND_API_KEY is correct')
      console.log('   2. For testing, use onboarding@resend.dev as RESEND_FROM_EMAIL')
      console.log('   3. Check Resend dashboard for delivery status')
      process.exit(1)
    }

    console.log('✅ Email sent successfully!')
    console.log(`   Email ID: ${result.data?.id || 'N/A'}`)
    console.log(`   Check ${testEmail} inbox (and spam folder) for the confirmation email.`)
    console.log('\n📊 You can also check the Resend dashboard:')
    console.log('   https://resend.com/emails')
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    console.error(error)
    process.exit(1)
  }
}

testEmail()
