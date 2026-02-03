import { Resend } from 'resend'

/**
 * Initialize Resend client
 * Requires RESEND_API_KEY environment variable
 */
let resendClient: Resend | null = null

export function getResendClient(): Resend | null {
  if (resendClient) {
    return resendClient
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Email functionality will be disabled.')
    return null
  }

  resendClient = new Resend(apiKey)
  return resendClient
}

/**
 * Send RSVP confirmation email
 */
export interface RSVPConfirmationEmailData {
  to: string
  guestName: string
  numberOfAttendees: number
  attendees: Array<{
    firstname: string
    lastname: string
    allergies?: string
    wants_bus?: boolean
    song_request?: string
  }>
  weddingDate: string
  weddingLocation: string
  coupleNames: string
}

export async function sendRSVPConfirmationEmail(
  data: RSVPConfirmationEmailData
): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient()

  if (!resend) {
    return {
      success: false,
      error: 'Email service not configured',
    }
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@wedding2026.com'
    const fromName = process.env.RESEND_FROM_NAME || 'Kristian & Mimmi'

    const attendeeList = data.attendees
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
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #a7c4a0 0%, #8fb38a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">OSA Bekräftelse</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hej ${data.guestName.split(',')[0].trim()}!
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Tack för din OSA! Vi har mottagit din anmälan och ser fram emot att fira tillsammans med dig.
              </p>
              
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h2 style="margin: 0 0 16px; color: #111827; font-size: 20px; font-weight: 600;">Din OSA</h2>
                <p style="margin: 0 0 12px; color: #374151; font-size: 14px;">
                  <strong>Antal personer:</strong> ${data.numberOfAttendees}
                </p>
                <div style="margin-top: 16px;">
                  <p style="margin: 0 0 8px; color: #374151; font-size: 14px; font-weight: 600;">Gäster:</p>
                  <pre style="margin: 0; color: #374151; font-size: 14px; font-family: inherit; white-space: pre-wrap;">${attendeeList}</pre>
                </div>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 16px; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">📅 ${data.weddingDate}</p>
                <p style="margin: 8px 0 0; color: #92400e; font-size: 14px;">📍 ${data.weddingLocation}</p>
              </div>
              
              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Om du behöver ändra din OSA eller har några frågor, kontakta oss gärna.
              </p>
              
              <p style="margin: 24px 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Med vänliga hälsningar,<br>
                <strong>${data.coupleNames}</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
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

Hej ${data.guestName.split(',')[0].trim()}!

Tack för din OSA! Vi har mottagit din anmälan och ser fram emot att fira tillsammans med dig.

Din OSA:
Antal personer: ${data.numberOfAttendees}

Gäster:
${attendeeList}

📅 ${data.weddingDate}
📍 ${data.weddingLocation}

Om du behöver ändra din OSA eller har några frågor, kontakta oss gärna.

Med vänliga hälsningar,
${data.coupleNames}

---
Detta är ett automatiskt meddelande. Svara inte på detta e-post.
    `.trim()

    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: data.to,
      subject: `OSA Bekräftelse - ${data.coupleNames}`,
      html: htmlContent,
      text: textContent,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return {
        success: false,
        error: result.error.message || 'Failed to send email',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending RSVP confirmation email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
