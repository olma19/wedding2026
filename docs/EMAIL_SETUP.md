# Email Setup Guide

This guide explains how to set up email functionality for RSVP confirmations using Resend.

## Overview

The wedding website sends automatic confirmation emails to guests when they submit their RSVP. The email includes:
- Confirmation of receipt
- Guest details (names, allergies, bus preference, song requests)
- Wedding date and location
- Contact information

## Prerequisites

1. A Resend account (free tier available: 100 emails/day)
2. A verified domain or use Resend's test domain for development

## Setup Steps

### 1. Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (GitHub, Google, or email)
3. Verify your email address

### 2. Get API Key

1. Log in to Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Wedding Website")
5. Copy the API key (starts with `re_`)

### 3. Verify Domain (Production)

For production use, you need to verify your domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `wedding2026.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

**Note:** For development/testing, you can use `onboarding@resend.dev` without domain verification.

### 4. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# From email address
# For development: onboarding@resend.dev
# For production: noreply@yourdomain.com (must be verified)
RESEND_FROM_EMAIL=noreply@wedding2026.com

# From name (optional)
RESEND_FROM_NAME=Kristian & Mimmi
```

### 5. Test Email Functionality

1. Start your development server: `npm run dev`
2. Submit a test RSVP with an email address
3. Check your email inbox for the confirmation

## Email Template

The confirmation email template is located in `lib/email/resend.ts`. It includes:

- **HTML version**: Beautifully formatted with colors matching your wedding theme
- **Text version**: Plain text fallback for email clients that don't support HTML
- **Content**: Guest details, wedding date, location, and couple names

### Customizing the Email Template

To customize the email template:

1. Edit `lib/email/resend.ts`
2. Modify the `htmlContent` and `textContent` variables in the `sendRSVPConfirmationEmail` function
3. The template uses inline CSS for email client compatibility

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check From Email**: For production, the domain must be verified in Resend
3. **Check Console**: Look for error messages in server logs
4. **Resend Dashboard**: Check the Resend dashboard for delivery status and errors

### Common Issues

**"Email service not configured"**
- The `RESEND_API_KEY` environment variable is missing or empty
- Add it to your `.env.local` file

**"Domain not verified"**
- You're using a custom domain that hasn't been verified
- Either verify the domain in Resend or use `onboarding@resend.dev` for testing

**"Invalid API key"**
- The API key is incorrect or has been revoked
- Generate a new API key in Resend dashboard

**Emails Going to Spam**
- Add SPF and DKIM records (provided by Resend) to your domain DNS
- Use a verified domain instead of `onboarding@resend.dev`

## Email Service Behavior

- **Optional**: Email sending is optional - if email is not provided or sending fails, the RSVP is still saved
- **Non-blocking**: Email failures don't prevent RSVP submission
- **Logging**: Email errors are logged to the console for debugging

## Resend Limits

**Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Unlimited API access

**Paid Plans:**
- Start at $20/month for 50,000 emails
- See [Resend Pricing](https://resend.com/pricing) for details

## Security Notes

- Never commit `.env.local` to version control
- Keep your API key secret
- Rotate API keys periodically
- Use environment-specific keys (dev/staging/production)

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Best Practices](https://resend.com/docs/send-with-best-practices)
