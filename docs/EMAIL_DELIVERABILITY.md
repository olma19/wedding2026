# Email deliverability – avoid junk/spam

If RSVP confirmation emails land in **junk** or **spam**, work through these steps. They follow [Resend’s deliverability guidance](https://resend.com/docs/dashboard/emails/deliverability-insights) and common provider rules (Gmail, Yahoo, etc.).

## 1. Domain authentication (most important)

Your **sending domain** must pass SPF, DKIM, and DMARC. Without them, many providers will treat the mail as suspicious.

- **In Resend:** [Domains](https://resend.com/domains) → your domain → add every DNS record Resend shows (SPF, DKIM).
- **DMARC:** Resend can suggest a DMARC record. Add it as a TXT record for your domain (e.g. `_dmarc.wedding2026.com` or as Resend instructs). Gmail/Yahoo expect DMARC for good deliverability.
- Wait for DNS to propagate (up to 24–48 hours), then confirm in Resend that the domain shows as **Verified**.

## 2. From address and name

- **From address:** Use an address on the **same verified domain** (e.g. `osa@wedding2026.com` or `noreply@wedding2026.com`). Never use an unverified or unrelated domain.
- **From name:** Keep it clear and human (e.g. “Kristian & Mimmi”). Set via `RESEND_FROM_NAME` if needed.

## 4. Resend Deliverability Insights

- In Resend, open **Emails** → click a sent RSVP confirmation.
- Use **Insights** (or “Deliverability”) and fix any **Attention** items (e.g. DMARC, link domain, plain text, “no-reply”, size).
- Optional **Improvements**: e.g. send from a subdomain, disable click/open tracking for this transactional mail. (Reply-To is not used here; emails are send-only for guest verification.)

## 4. Links and content

- **Links:** Any URL in the email (e.g. `NEXT_PUBLIC_SITE_URL`) should match or relate to your **sending domain** where possible (e.g. same site). Mismatched links can hurt deliverability.
- **Size:** Keep the email under ~102 KB (you’re already sending both HTML and plain text, which is good).
- **Language:** Your Swedish transactional copy is fine; avoid spammy phrases, ALL CAPS, or excessive exclamation marks.

## 5. Tracking (optional)

For transactional RSVP emails, turning off **click tracking** and **open tracking** on the domain in Resend can sometimes help, as some filters are sensitive to tracking pixels and rewritten links. Toggle these under [Resend → Domains → your domain](https://resend.com/domains).

## 6. Sending pattern

- Sudden spikes or sending from a brand‑new domain can trigger filters. A steady, low volume (e.g. a few RSVPs per day) is easier for reputation.
- Ensure you’re only sending to real guests who just submitted the form (you already do this).

## Checklist

- [ ] Domain verified in Resend (SPF + DKIM + DMARC).
- [ ] `RESEND_FROM_EMAIL` is on that verified domain.
- [ ] Resend Insights show no critical issues.
- [ ] Links in the email point to your own site/domain where possible.
- [ ] (Optional) Click/open tracking disabled for this domain if you want to maximize deliverability for transactional mail.

After changing DNS or env vars, send a test RSVP and check whether the confirmation lands in **Inbox**. If it still goes to junk, use Resend’s Insights and your email provider’s “Report not spam” / “Move to Inbox” so the provider learns over time. Reply-To is not used; sending is one-way for guest verification only.
