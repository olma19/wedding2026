# Säkerhetschecklista - Innan Deployment

## 🔴 KRITISKA SÄKERHETSRISKER (Måste fixas innan produktion)

### 1. Admin-sidan är helt osäker ⚠️ KRITISKT

**Problem:**
- Lösenordet `'wedding2026'` är hårdkodat i klientkoden
- Autentisering är endast client-side - vem som helst kan öppna DevTools och ändra `isAuthenticated` till `true`
- Lösenordet exponeras i JavaScript-bundle som kan läsas av alla
- Ingen server-side verifiering

**Lösning:**
- Flytta autentisering till server-side (API route)
- Använd environment variable för lösenord: `ADMIN_PASSWORD`
- Implementera session/cookie-baserad autentisering
- Eller använd NextAuth.js för riktig autentisering

### 2. GET /api/rsvp är helt öppen ⚠️ KRITISKT

**Problem:**
- Vem som helst kan hämta alla RSVPs via `GET /api/rsvp`
- Exponerar personuppgifter: namn, email, allergier, kostpreferenser
- Ingen autentisering eller auktorisering

**Lösning:**
- Lägg till autentisering på GET-endpointen
- Använd samma lösenord/session som admin-sidan
- Eller skapa en separat API-nyckel för admin-åtkomst

### 3. Saknar Rate Limiting ⚠️ MEDIUM

**Problem:**
- POST /api/rsvp kan spammas obegränsat
- Risk för DoS-attacker
- Risk för spam-RSVPs

**Lösning:**
- Implementera rate limiting (t.ex. max 5 RSVPs per IP per timme)
- Använd Vercel Edge Config eller middleware för rate limiting

## 🟡 MEDIUM RISKER (Bör fixas)

### 4. Environment Variables Fallbacks

**Problem:**
- `lib/supabase/server.ts` och `lib/supabase/client.ts` har fallback-värden
- I produktion bör dessa kasta fel istället för att använda dummy-värden

**Lösning:**
- Kasta fel om environment variables saknas i produktion
- Använd `process.env.NODE_ENV` för att skilja dev/prod

### 5. Input Validation - Saknar Maxlängder

**Problem:**
- Textfält har inga maxlängder
- Risk för extremt långa strängar som kan orsaka problem

**Lösning:**
- Lägg till maxlängder i Zod-schemat
- T.ex. `guest_name: z.string().min(1).max(200)`

### 6. CSV Export - XSS Risk

**Problem:**
- CSV-exporten i admin-sidan kan ha problem med specialtecken
- Om någon skriver `<script>` i ett fält, kan det vara problematiskt

**Lösning:**
- CSV-exporten ser OK ut (använder quotes), men testa med specialtecken
- Överväg att escape'a HTML-tecken i admin-vyn

## 🟢 LÅGA RISKER (Nice to have)

### 7. CORS
- Next.js hanterar detta automatiskt, men verifiera att det fungerar korrekt

### 8. HTTPS
- Vercel/Netlify ger automatiskt HTTPS, men verifiera att det är aktiverat

### 9. Error Messages
- Vissa felmeddelanden kan exponera för mycket information
- Överväg att dölja tekniska detaljer i produktion

---

## Rekommenderad Åtgärdsordning

### Steg 1: Fixa Admin-autentisering (KRITISKT)
1. Skapa API route för admin-login
2. Flytta lösenord till environment variable
3. Använd cookies/sessions för att hålla inloggning

### Steg 2: Skydda GET /api/rsvp (KRITISKT)
1. Lägg till autentisering på endpointen
2. Verifiera session/cookie innan data returneras

### Steg 3: Lägg till Rate Limiting (MEDIUM)
1. Implementera rate limiting på POST /api/rsvp
2. Använd Vercel Edge Middleware eller liknande

### Steg 4: Förbättra Error Handling (LÅG)
1. Ta bort fallback-värden i produktion
2. Lägg till maxlängder i validering

---

## Snabbfix för Minimal Säkerhet

Om du behöver deploya snabbt och inte kan fixa allt:

1. **Ändra admin-lösenordet** till något starkt och unikt
2. **Lägg till en enkel API-nyckel** för GET /api/rsvp
3. **Aktivera Supabase Rate Limiting** i Supabase Dashboard
4. **Använd Vercel's built-in rate limiting** om tillgängligt

---

## Långsiktiga Förbättringar

- Implementera NextAuth.js för riktig autentisering
- Lägg till logging och monitoring
- Implementera email-verifiering för RSVPs (valfritt)
- Lägg till CAPTCHA för RSVP-formuläret (för att förhindra spam)
