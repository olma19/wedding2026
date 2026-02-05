# Animation guide – “Wow factor” step by step

This guide adds scroll and entrance animations to the wedding site using what you already have (`ScrollAnimation`, CSS in `globals.css`) and optional enhancements. Each step is independent so you can implement and test one at a time.

---

## What you already have

- **ScrollAnimation** (`components/ScrollAnimation.tsx`) – IntersectionObserver-based; animates when elements enter view. Types: `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`. Props: `delay`, `type`, `duration`, `once`.
- **Animation constants** (`lib/constants/animations.ts`) – Presets for duration, easing, threshold.
- **CSS animations** (`app/globals.css`) – `animate-float`, `animate-float-slow`, `animate-in`, `animate-gradient`, `animate-pulse-glow`, skeleton/confetti.
- **Hero** – Floating flower decorations; no entrance animation on names/heading yet.
- **Sections** – Some use `ScrollAnimation` with `showScrollAnimation={false}` on the wrapper and manual `<ScrollAnimation>` inside; others rely on `SectionWrapper`’s optional scroll animation.

Use this as the base and extend it step by step below.

---

## Step 1: Hero entrance (first impression)

**Goal:** Names and main heading don’t just appear; they fade/slide in after load.

**Where:** `components/sections/HeroSection.tsx`

**Options (pick one to start):**

- **A – CSS only**  
  - Add a wrapper around the hero text block (names + “&” + main heading + date).  
  - Give it a class that runs a one-off entrance, e.g. `animate-in` (you have `fade-in` in `globals.css`) or a new class like `animate-hero-in`.  
  - In `globals.css`, define e.g. `@keyframes hero-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }` and `.animate-hero-in { animation: hero-in 1s ease-out forwards; }`.  
  - Optional: use `animation-delay` on the names and the main heading so they stagger (e.g. names 0.2s, heading 0.4s).

- **B – ScrollAnimation on hero**  
  - Wrap the hero text in `<ScrollAnimation type="fade" delay={0} once>` (or `slide-up`).  
  - Since the hero is above the fold, it will become visible immediately and animate on first paint.  
  - You can still use small CSS `animation-delay` on inner elements for a light stagger.

**Deliverable:** Hero copy animates in on load (and optionally with a short stagger). No new dependencies.

---

## Step 2: Section titles animate in

**Goal:** Each section title (e.g. “Vigsel”, “Middag & Fest”) animates when it scrolls into view instead of appearing statically.

**Where:** `components/sections/SectionWrapper.tsx` (and/or individual sections that render their own title).

**What to do:**

- Ensure the section title is inside a `ScrollAnimation` when `showScrollAnimation` is true (your wrapper already can wrap children in `ScrollAnimation`).  
- If titles are rendered inside each section and not through the wrapper, wrap the title in `<ScrollAnimation type="slide-up" delay={0}>` (or `fade`) in:  
  - CeremonySection  
  - DinnerPartySection  
  - GoodToKnowSection  
  - ToastmasterSection  
  - RSVPSection  
  - StorySection  
  - CountdownSection  
  (only where a distinct title exists.)
- Optionally use a slightly larger `translate-y` in the animation (e.g. `translate-y-8` in `lib/constants/animations.ts` for `slide-up` hidden state) so the title motion is more noticeable.

**Deliverable:** Every section title enters with a consistent scroll-triggered animation (e.g. slide-up or fade).

---

## Step 3: Stagger section content (cards, list items)

**Goal:** Within a section, items (cards, list items) don’t all appear at once; they animate in one after the other with a small delay.

**Where:** Sections that map over items:

- **GoodToKnowSection** – each “good to know” card.
- **ToastmasterSection** – the two toastmaster/toastmadame cards.
- **CeremonySection** – icon list or blocks.
- **DinnerPartySection** – cards/blocks.
- **StorySection** – story items.

**What to do:**

- Keep using your existing `<ScrollAnimation delay={index * 100}>` (or similar) pattern where you already have it.
- Where you don’t, wrap each item in `<ScrollAnimation type="slide-up" delay={index * 80}>` (or `fade`). Tune the multiplier (80–150 ms) to taste.
- Use the same `type` for all items in a section for a consistent feel. Optionally use `slide-up` for cards and `fade` for smaller elements.

**Deliverable:** List/card content in key sections staggers in on scroll. No new dependencies.

---

## Step 4: Stronger scroll animation (more “pop”)

**Goal:** Scroll-in animations feel more noticeable (e.g. more movement or scale).

**Where:** `lib/constants/animations.ts` and optionally `components/ScrollAnimation.tsx`.

**What to do:**

- In `getAnimationClasses`, increase the “hidden” offsets, e.g.:  
  - `slide-up`: `translate-y-10` → `translate-y-12` or `translate-y-16`.  
  - `scale`: `scale-95` → `scale-90`.  
- Optionally add a new preset, e.g. `slide-up-strong`: same as `slide-up` but with `translate-y-16` and `duration: 1200`.  
- In `ScrollAnimation`, you can optionally add a small `rootMargin` (e.g. `"50px"` or `"100px"`) so the animation starts just before the element hits the viewport, making the motion feel smoother.

**Deliverable:** Scroll animations are more visible and feel a bit more “wow” without changing structure.

---

## Step 5: Countdown and CTA emphasis

**Goal:** Countdown and main CTA (e.g. “OSA”) feel a bit more alive.

**Where:** `components/CountdownTimer.tsx`, `components/sections/CountdownSection.tsx`, and the section that contains the main RSVP/OSA CTA (e.g. RSVPSection or a button in the hero).

**What to do:**

- **Countdown:**  
  - Add a very subtle CSS animation to the countdown block (e.g. a soft pulse or a one-time “pop” on load).  
  - Reuse or add something like `animate-pulse-glow` in `globals.css` with a long duration and low opacity so it’s gentle.  
- **CTA button:**  
  - On the main “OSA” or “Gå till OSA” button, add a subtle hover scale in Tailwind, e.g. `hover:scale-105 transition-transform duration-200`, and optionally a soft shadow change.  
  - Avoid heavy or constant motion; keep it subtle so it feels premium.

**Deliverable:** Countdown has a light motion; main CTA has a clear but subtle hover state.

---

## Step 6: Form and success micro-interactions

**Goal:** RSVP form feels responsive; success state feels celebratory.

**Where:** `components/RSVPForm.tsx`, `components/forms/SuccessMessage.tsx`, and any RSVP success handling (e.g. confetti in `hooks/useRSVPSubmission.ts`).

**What to do:**

- **Participating toggle:** Already styled; optionally add a quick transition on the segment background (e.g. `transition-colors duration-200` if not already there).  
- **Guest count buttons:** Optional: on click, a very short scale feedback, e.g. `active:scale-95` on the Button.  
- **Submit button:** Keep loading state; ensure it has a clear disabled/loading style and optionally a short “success” state (e.g. brief color or icon change) before redirect or message.  
- **Success message:**  
  - Wrap the success content in `<ScrollAnimation type="scale" delay={0}>` so it pops in when shown.  
  - You already have confetti in `useRSVPSubmission`; keep it and optionally tune timing/amount.  

**Deliverable:** Form interactions feel snappy; success feels a bit more “event-like” (scale-in + confetti).

---

## Step 7: Optional – Parallax or depth on hero

**Goal:** Slight depth on the hero (e.g. background moves slower than foreground on scroll).

**Where:** `app/page.tsx` (hero section) and `components/sections/HeroSection.tsx`.

**What to do:**

- **Without a library:**  
  - On scroll, read `window.scrollY` (or use a simple scroll listener) and apply a mild `transform: translateY(...)` to the background image (e.g. `translateY(scrollY * 0.2)`).  
  - Keep the overlay and text in normal flow so only the image moves slightly.  
  - Throttle the listener (e.g. requestAnimationFrame or 100 ms) to avoid layout thrash.  
- **With a library (optional):** Use a small parallax hook or component (e.g. `react-scroll-parallax` or similar) only for the hero background; keep the rest of the site as-is.

**Deliverable:** Hero has a subtle parallax effect; rest of the page unchanged. Skip this step if you prefer a static hero.

---

## Step 8: Optional – Framer Motion (or similar) for advanced choreography

**Goal:** If you want more control (e.g. staggered children, path-based motion, layout animations), you can introduce a small animation library.

**Where:** New dependency; then selected components (hero, one or two sections as a pilot).

**What to do:**

- Add e.g. `framer-motion` and use it only where you want “wow”:  
  - Hero: `<motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>` around the text block, with `staggerChildren` if you wrap names and heading in separate `motion` divs.  
  - One section: replace a single `ScrollAnimation` wrapper with `<motion.div whileInView={{ ... }} viewport={{ once: true }}>`.  
- Keep using your existing `ScrollAnimation` everywhere else so you don’t rewrite the whole site.  
- Respect reduced motion: use `prefers-reduced-motion: reduce` (Framer Motion supports this) and/or keep your current CSS animations simple when reduced motion is requested.

**Deliverable:** One or two high-impact areas use the library; rest stays on your current system.

---

## Order of implementation (suggested)

1. **Step 1** – Hero entrance (biggest “wow” for first visit).  
2. **Step 2** – Section titles (consistent polish).  
3. **Step 3** – Stagger in sections (already partially there; fill gaps).  
4. **Step 4** – Stronger scroll animation values (quick win).  
5. **Step 5** – Countdown + CTA (small, high-visibility areas).  
6. **Step 6** – Form and success micro-interactions.  
7. **Step 7** – Parallax hero (optional).  
8. **Step 8** – Library for advanced bits (optional).

---

## Files to touch (quick reference)

| Step | Main files |
|------|------------|
| 1 | `HeroSection.tsx`, `globals.css` |
| 2 | `SectionWrapper.tsx`, section components that render titles |
| 3 | `GoodToKnowSection.tsx`, `ToastmasterSection.tsx`, `CeremonySection.tsx`, `DinnerPartySection.tsx`, `StorySection.tsx` |
| 4 | `lib/constants/animations.ts`, optionally `ScrollAnimation.tsx` |
| 5 | `CountdownTimer.tsx`, `CountdownSection.tsx`, CTA in hero or RSVPSection, `globals.css` |
| 6 | `RSVPForm.tsx`, `SuccessMessage.tsx`, `useRSVPSubmission.ts` |
| 7 | `HeroSection.tsx`, `page.tsx` (scroll listener or parallax) |
| 8 | `package.json`, then selected components |

---

## Accessibility and performance

- **Reduced motion:** In `ScrollAnimation` or in CSS, consider `@media (prefers-reduced-motion: reduce)` to shorten or disable animations (e.g. fade only, no translate).  
- **Performance:** Your current setup (CSS transitions + IntersectionObserver) is cheap. If you add scroll-based parallax (Step 7), throttle or use `requestAnimationFrame`.  
- **Focus:** Ensure focus states (e.g. on buttons and form controls) remain visible and aren’t overshadowed by animations.

Once you’ve done Step 1, you can move through the list in order and stop at whatever level of “wow” feels right for the wedding site.
