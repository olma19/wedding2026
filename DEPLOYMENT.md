# Deployment Guide - Wedding Landing Page

Denna guide hjälper dig att deploya din bröllopslandningssida till produktion.

## Rekommenderade Hosting-alternativ

### 1. Vercel (Rekommenderat för Next.js)
**Fördelar:**
- Optimalt för Next.js (skaparna av Next.js)
- Automatisk CI/CD från GitHub
- Gratis tier med generös gräns
- Enkel setup
- Automatisk HTTPS
- Edge Functions

**Steg:**
1. Pusha din kod till GitHub
2. Gå till [vercel.com](https://vercel.com) och logga in med GitHub
3. Klicka "New Project"
4. Välj ditt repository
5. Lägg till environment variables (se nedan)
6. Klicka "Deploy"
7. Klart! Du får en URL som `wedding-2026.vercel.app`

### 2. Netlify
**Fördelar:**
- Gratis tier
- Enkel setup
- Bra för statiska sites
- Automatisk HTTPS

**Steg:**
1. Pusha till GitHub
2. Gå till [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Välj repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Lägg till environment variables
7. Deploy

### 3. Railway
**Fördelar:**
- Enkel setup
- Bra för fullstack-appar
- Gratis tier

### 4. Render
**Fördelar:**
- Gratis tier
- Automatisk deployments
- Enkel setup

## Environment Variables Setup

### I Vercel/Netlify Dashboard:

1. Gå till ditt projekt → Settings → Environment Variables
2. Lägg till dessa variabler:

```
NEXT_PUBLIC_SUPABASE_URL=https://wvvkkbtmlmgiwkkqmfrm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key-här
SUPABASE_SERVICE_ROLE_KEY=din-service-role-key-här
ADMIN_PASSWORD=ditt-säkra-admin-lösenord-här
```

**Viktigt:**
- `NEXT_PUBLIC_*` variabler är synliga i klienten (säkert)
- `SUPABASE_SERVICE_ROLE_KEY` är hemlig - lägg till som "Secret"
- Efter att ha lagt till variabler, gör en ny deployment

## Pre-Deployment Checklist

### 1. Sätt Admin-lösenord
Lägg till `ADMIN_PASSWORD` environment variable i din hosting-plattform:
- I Vercel: Settings → Environment Variables → Add `ADMIN_PASSWORD`
- Använd ett starkt, unikt lösenord
- **VIKTIGT**: Detta lösenord används för att logga in på `/admin`-sidan

### 2. Verifiera Environment Variables
- Kontrollera att alla Supabase-nycklar är korrekta
- Testa lokalt med `.env.local` först

### 3. Testa API Routes
- Testa RSVP-submission lokalt
- Verifiera att admin-sidan fungerar

### 4. Optimera för Produktion
```bash
npm run build  # Testa build lokalt först
```

### 5. Uppdatera Metadata
Kontrollera `app/layout.tsx` - metadata är redan dynamisk baserat på config!

## Deployment Steps (Vercel - Exempel)

### Steg 1: Förbered Repository
```bash
# Se till att allt är committat
git add .
git commit -m "Ready for production"
git push origin main
```

### Steg 2: Skapa Vercel-konto
1. Gå till [vercel.com](https://vercel.com)
2. Logga in med GitHub
3. Klicka "New Project"

### Steg 3: Konfigurera Projekt
1. Välj ditt repository
2. Project Settings:
   - Framework Preset: Next.js (detekteras automatiskt)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Steg 4: Lägg till Environment Variables
I Vercel Dashboard → Settings → Environment Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wvvkkbtmlmgiwkkqmfrm.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `din-anon-key` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `din-service-role-key` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `ditt-säkra-lösenord` | Production, Preview, Development |

### Steg 5: Deploy
1. Klicka "Deploy"
2. Vänta på build (2-3 minuter)
3. Du får en URL som `wedding-2026-xyz.vercel.app`

### Steg 6: Custom Domain (Valfritt)
1. I Vercel Dashboard → Settings → Domains
2. Lägg till din domän (t.ex. `bröllop.se`)
3. Följ instruktionerna för DNS-konfiguration

## Post-Deployment

### 1. Testa Allt
- [ ] Testa RSVP-formuläret
- [ ] Testa admin-sidan (`/admin`)
- [ ] Kontrollera att countdown-timer fungerar
- [ ] Testa på mobil

### 2. Supabase RLS Policies
Kontrollera att Row Level Security är korrekt konfigurerad:
- Alla kan skicka RSVPs (OK)
- Endast autentiserade kan läsa (för admin, använd service_role key)

### 3. Monitoring
- Vercel ger dig analytics automatiskt
- Supabase Dashboard visar databas-statistik

## Säkerhetsöverväganden

### 1. Admin-sidan
- **Nuvarande**: Server-side lösenordsskydd med session cookies
- **Säkerhet**: Lösenordet lagras i `ADMIN_PASSWORD` environment variable
- **Session**: HttpOnly cookies används för att hålla inloggning
- **Förbättringar**: Överväg NextAuth.js för mer avancerad autentisering

### 2. API Endpoints
- GET `/api/rsvp` är nu skyddad - kräver admin-autentisering
- POST `/api/rsvp` är öppen (OK för RSVP-submission)
- **Rate Limiting**: Överväg att lägga till rate limiting för POST-endpointen

### 3. Environment Variables
- **ALDRIG** committa `.env.local` till git
- Använd hosting-platformens environment variable system

## Custom Domain Setup

### Om du vill använda egen domän:

1. **Köp domän** (t.ex. via Namecheap, GoDaddy, eller Loopia)
2. **I Vercel:**
   - Settings → Domains → Add Domain
   - Följ DNS-instruktionerna
3. **DNS-konfiguration:**
   - Lägg till CNAME-record som pekar till Vercel
   - Vänta på DNS-propagation (kan ta upp till 48h, oftast < 1h)

## Performance Tips

1. **Images**: Om du lägger till bilder, använd Next.js Image component
2. **Fonts**: Redan optimerade med `next/font/google`
3. **Build Size**: Kör `npm run build` och kontrollera bundle size

## Troubleshooting

### Problem: "Missing environment variables"
**Lösning**: Kontrollera att alla env vars är satta i hosting-platformen

### Problem: "Invalid API key"
**Lösning**: 
- Verifiera att du kopierat rätt keys från Supabase
- Kontrollera att det inte finns extra mellanslag

### Problem: Build fails
**Lösning**:
- Kör `npm run build` lokalt för att se fel
- Kontrollera att alla dependencies är i `package.json`

## Support & Resurser

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Supabase Docs**: https://supabase.com/docs

## Snabbstart: Vercel Deployment

```bash
# 1. Installera Vercel CLI (valfritt)
npm i -g vercel

# 2. Deploy från terminal
vercel

# Eller pusha till GitHub och använd Vercel Dashboard
```

---

**Rekommendation**: Använd **Vercel** för den enklaste och bästa upplevelsen med Next.js!
