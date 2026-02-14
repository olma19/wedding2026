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

For production use, you need to verify your domain in Resend and add DNS records where your domain is hosted (e.g. Namecheap).

#### In Resend (get the records)

1. Go to **Domains** in the [Resend dashboard](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain (e.g., `wedding2026.com`)
4. Resend will show you DNS records to add: usually **SPF** (TXT) and **DKIM** (TXT or CNAME). Copy or keep this page open.

#### In Namecheap (add the records)

1. Log in at [Namecheap](https://www.namecheap.com) → **Domain List** → click **Manage** next to your domain (e.g. `wedding2026.com`).
2. Open **Advanced DNS** (or **DNS** / **Manage** depending on the layout).
3. Add each record Resend gave you:

   **SPF (TXT):**
   - Click **Add New Record**.
   - Type: **TXT Record**.
   - Host: `@` (or leave blank if Namecheap uses blank for root).
   - Value: paste the SPF value from Resend (e.g. `v=spf1 include:amazonses.com ~all` or what Resend shows).
   - TTL: **Automatic** or **300**.
   - Save.

   **DKIM (TXT or CNAME):**
   - Resend shows one or more DKIM records (often a name like `resend._domainkey` and a long value).
   - For each DKIM record:
     - **Add New Record**.
     - Type: **TXT Record** (or **CNAME** if Resend says CNAME).
     - Host: the subdomain part only (e.g. `resend._domainkey`). Namecheap may add your domain automatically.
     - Value: the value Resend gives (for CNAME, the target host they provide).
     - TTL: **Automatic** or **300**.
     - Save.

4. Wait 5–30 minutes (sometimes up to 48 hours). In Resend, click **Verify** (or refresh domain status) until it shows as verified.

**Namecheap tips:**
- If you already have an SPF record for `@`, Resend may ask you to add an `include:` to that record instead of a second SPF. Edit the existing TXT and add their `include:...` then save.
- For Host, some panels use `@` for the root domain; for subdomains use only the subdomain part (e.g. `resend._domainkey`).

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

**Emails Going to Spam / Junk**
- Add SPF, DKIM, and DMARC records (from Resend) to your domain DNS and ensure the domain is verified
- Use Resend’s **Deliverability Insights** on a sent email for tailored fixes
- See **[Email deliverability guide](EMAIL_DELIVERABILITY.md)** for a full checklist

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
- [Email deliverability (avoid junk/spam)](EMAIL_DELIVERABILITY.md) – checklist and production tips
