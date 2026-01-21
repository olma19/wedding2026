# Snabb Deployment Guide

## Vercel (5 minuter) - Rekommenderat

### Steg 1: Pusha till GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Steg 2: Skapa Vercel-konto
1. Gå till [vercel.com](https://vercel.com)
2. Klicka "Sign Up" → Logga in med GitHub
3. Klicka "Add New..." → "Project"

### Steg 3: Importera Projekt
1. Välj ditt GitHub repository
2. Klicka "Import"

### Steg 4: Lägg till Environment Variables
Innan du klickar "Deploy", lägg till:

**Settings → Environment Variables → Add:**

```
NEXT_PUBLIC_SUPABASE_URL = https://wvvkkbtmlmgiwkkqmfrm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [din anon key]
SUPABASE_SERVICE_ROLE_KEY = [din service role key]
ADMIN_PASSWORD = [ditt säkra admin-lösenord]
```

**Viktigt:** 
- Markera alla som "Production", "Preview", och "Development"
- `SUPABASE_SERVICE_ROLE_KEY` ska vara "Encrypted" (default)

### Steg 5: Deploy
1. Klicka "Deploy"
2. Vänta 2-3 minuter
3. Klart! 🎉

Du får en URL som: `wedding-2026-xyz.vercel.app`

## Efter Deployment

### Testa
1. Öppna din nya URL
2. Testa RSVP-formuläret
3. Testa admin: `din-url.vercel.app/admin`
   - Lösenord: `wedding2026` (ändra detta!)

### Custom Domain (Valfritt)
1. I Vercel Dashboard → Settings → Domains
2. Lägg till din domän
3. Följ DNS-instruktionerna

## Viktiga Säkerhetsnoteringar

⚠️ **Innan du går live:**
1. Sätt ett starkt `ADMIN_PASSWORD` i environment variables
2. Verifiera att alla environment variables är korrekta
3. Testa admin-inloggning: `din-url.vercel.app/admin`
4. Testa allt noggrant

## Support
- Vercel Docs: https://vercel.com/docs
- Supabase: https://supabase.com/docs
