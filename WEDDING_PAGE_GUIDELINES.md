# Wedding Page – Guidelines & Rules

Use this file as instructions when working on the wedding landing page. The goal is **easy to change**: as much as possible should be driven by config in `config/wedding.ts`. Inspiration: [Bröllopssida.se demo](https://brollopssida.se/demo).

---

## Section order (fixed)

1. **Presentation** – Hero: full-bleed image + couple names + “Vi gifter oss!” + intro text (no countdown here).
2. **Countdown** – Standalone section with countdown to the wedding date.
3. **Vigsel** – Ceremony: date, time, place (Swedish: vigsel = wedding ceremony).
4. **Address** – Ceremony/reception address as a link to Google Maps (prefer `location.mapUrl`).
5. **Dinner and party** – Middag och fest: time, place, short description (from config).
6. **Good to know** – One section with subsections:
   - Food and drinks
   - Hotels (include discount code from config)
   - Dress code
   - Children (e.g. “Festen är utan barn” / party will be without children)
7. **Toastmaster / Toast madame** – With images; note that speeches must be announced to them (from config).
8. **OSA** – RSVP form:
   - First: dropdown to choose number of people (1, 2, 3, …).
   - Then: for each person, form fields: first name, last name, allergies, transport with bus (yes/no).
   - If “bus” is yes for any guest: show bus information (from config).
   - Submit = one OSA response (e.g. store attendees as array in DB).

---

## Config-first rule

**All changeable content must come from `config/wedding.ts`.**

- Add new fields to `config/wedding.ts` and `types/wedding.ts` when you need new content.
- Use `weddingConfig` in sections; do not hardcode copy, dates, times, places, or section-specific text.

---

## File layout

| Purpose | Location |
|--------|----------|
| **Single source of truth for content** | `config/wedding.ts` |
| **Types for config** | `types/wedding.ts` |
| **Sections (one per block)** | `components/sections/*.tsx` |
| **Shared UI (cards, titles, flowers)** | `components/*.tsx` |
| **Page composition (section order)** | `app/page.tsx` |

---

## Images

**Place all images in `public/images/` folder.**

- Images in `public/` are served at the root path (e.g., `public/images/hero.jpg` → `/images/hero.jpg`).
- Use Next.js `Image` component for optimization (already used in components).
- Reference images in config using paths starting with `/` (e.g., `/images/hero.jpg`).

**Where images are used:**

1. **Hero image** – Set `hero.imageUrl` in `config/wedding.ts` (e.g., `'/images/hero.jpg'`).
2. **Toastmaster photos** – Set `toastmaster.people[].imageUrl` for each person (e.g., `'/images/toastmaster-john.jpg'`).

**Suggested file structure:**
```
public/
  images/
    hero.jpg          # Main hero background image
    toastmaster-*.jpg # Toastmaster photos (one per person)
```

## Hero / presentation

- Hero = **presentation only**: background image + names + intro. No countdown in the hero.
- Countdown is its own section below (see section order).
- Hero image: set `hero.imageUrl` in config when you have the final asset (e.g., `'/images/hero.jpg'`).

---

## OSA (RSVP) form behaviour

- Dropdown: “Antal personer” (1–10 or similar).
- For each person: First name, Last name, Allergies (optional), Transport with bus (yes/no).
- If any guest selects bus: show bus information block (content from config, e.g. `osa.busInfo`).
- Backend: store one row per submission; store attendees as array (e.g. JSONB or JSON column) with `{ firstname, lastname, allergies, wants_bus }`.

---

## Summary

1. **Section order** is fixed: Presentation → Countdown → Vigsel → Address → Dinner and party → Good to know → Toastmaster → OSA.
2. **Config-first** – all copy and data from `config/wedding.ts` and `types/wedding.ts`.
3. **Address** – prefer link to Google Maps (`location.mapUrl`).
4. **Good to know** – one section, four subsections: food/drinks, hotels (with discount code), dress code, children.
5. **OSA** – number dropdown → per-person fields (firstname, lastname, allergies, bus); show bus info when bus is yes.
