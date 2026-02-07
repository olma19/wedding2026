# Component migration plan: custom UI → shadcn/ui

**Policy: use shadcn/ui where possible.** New UI (buttons, inputs, dialogs, tables, etc.) should use shadcn components. When adding or replacing components, prefer adding the shadcn primitive and wrapping it to keep existing APIs where needed. This document tracks the migration from custom UI to shadcn so the codebase is ready for the wedding planner admin (guest list, content control, etc.).

## Current state (after shadcn init)

- **shadcn** is initialized: `components.json`, `lib/utils.ts` (`cn` with clsx + tailwind-merge), Tailwind theme extended with shadcn CSS variables, `tailwindcss-animate` added.
- **Existing UI** remains in `components/ui/`: Button, Card (CardHeader, CardContent, CardFooter), Label, RadioGroup, Icon, Skeleton, SectionSkeleton, CardSkeleton, plus FormField in `components/forms/`.

## Migration strategy

- **Add shadcn components** via CLI; keep our **public API** where possible (e.g. same export names and, where reasonable, same props) so call sites need minimal or no changes.
- **Theme alignment:** Use shadcn’s CSS variables (and our existing theme) so primary/muted/border match the wedding look; wrap or extend shadcn components when we need `useColors()` for scheme-specific styles.
- **Do not replace:** Icon (Material Symbols + custom person), FormField (custom wrapper), LoadingSpinner, and the Skeleton set until we have a clear need (e.g. shadcn Skeleton is a good fit later).

---

## Step-by-step plan

### Step 1: Button ✅ Done

| Current | shadcn | Action |
|--------|--------|--------|
| `Button` (variant: primary \| secondary \| outline, size: sm \| md \| lg, isLoading, icon, iconPosition) | `button` (variant: default \| destructive \| outline \| secondary \| ghost \| link, size: default \| sm \| lg \| icon) | Implemented: shadcn primitive (cva + Radix Slot) inlined in `Button.tsx`; default export keeps our API (primary→default, secondary→secondary, outline→outline, isLoading, icon, iconPosition). Exported `buttonVariants` for advanced use. |

**Files:** `components/ui/Button.tsx` – single file with shadcn primitive + wedding-site wrapper. (No separate `button.tsx` to avoid Windows path casing issues.)

---

### Step 2: Label ✅ Done

| Current | shadcn | Action |
|--------|--------|--------|
| `Label` in `label.tsx` (simple label + classNames) | `label` (Radix Label + cn) | Replaced contents of `components/ui/label.tsx` with shadcn label (`npx shadcn add label --overwrite`). Uses `@radix-ui/react-label`, `cva`, `cn`. Export `{ Label }` unchanged; RSVPForm works as before. |

**Files:** `components/ui/label.tsx` – shadcn implementation.

---

### Step 3: Radio group ✅ Done

| Current | shadcn | Action |
|--------|--------|--------|
| `RadioGroup` / `RadioGroupItem` in `radio-group.tsx` (Radix + custom pink styling) | `radio-group` (Radix + shadcn styles) | Replaced `radio-group.tsx` with shadcn (`npx shadcn add radio-group --overwrite`). Uses `border-primary`, `text-primary`, Lucide `Circle` for indicator. RSVPForm uses custom card-style wrappers with `RadioGroupItem` sr-only; styling driven by CSS variables. |

**Files:** `components/ui/radio-group.tsx` – shadcn implementation.

---

### Step 4: Card ✅ Done

| Current | shadcn | Action |
|--------|--------|--------|
| `Card`, `CardHeader`, `CardContent`, `CardFooter` (variant: default \| outlined \| elevated \| flat, hover) | `card` (Card, CardHeader, CardContent, CardFooter) | Inlined shadcn card primitives in `Card.tsx` (CardPrimitive, CardHeaderPrimitive, CardContentPrimitive, CardFooterPrimitive, CardTitle, CardDescription). Default export is our wrapper with `variant`, `hover`, `useColors()`. `CardHeader.tsx`, `CardContent.tsx`, `CardFooter.tsx` import primitives from `Card.tsx` and add `divider`, `useColors()` where needed. Existing API and types preserved. |

**Files:** `Card.tsx` – shadcn primitives + wedding Card wrapper; `CardHeader.tsx`, `CardContent.tsx`, `CardFooter.tsx` – wrappers around primitives with divider support.

---

### Step 5: Skeleton (optional / later)

| Current | shadcn | Action |
|--------|--------|--------|
| `Skeleton`, `SectionSkeleton`, `CardSkeleton` | `skeleton` | When touching loading UIs, add `npx shadcn add skeleton` and consider replacing base `Skeleton` with shadcn’s; keep SectionSkeleton and CardSkeleton as composition on top. Low priority until admin needs them. |

---

### Step 6: Do not migrate (keep as-is for now)

- **Icon** – Material Symbols + custom gender-neutral person; theme-aware.
- **FormField** – Custom wrapper around input/textarea + label + error; can later use shadcn Input/Label under the hood if we add Input.
- **LoadingSpinner** – Custom; no shadcn equivalent needed.
- **Input** – Not a component yet (FormField uses raw input). When adding forms in admin, add `npx shadcn add input` and optionally integrate with FormField.

---

## Order of execution

1. **Button** – Add shadcn button, wrap in current Button API.
2. **Label** – Add shadcn label, replace current label.
3. **Radio group** – Add shadcn radio-group, replace current and theme it.
4. **Card** – Add shadcn card, wrap Card/CardHeader/CardContent/CardFooter.

After each step: run build and tests, fix any regressions, then proceed.

---

## Theme alignment notes

- shadcn’s `--primary` is used for primary buttons. Our `useColors()` provides scheme-specific classes (e.g. `colors.bgDark`). Options: (a) set `--primary` from the active scheme in a provider/layout, or (b) keep passing className from `useColors()` into the Button wrapper. Prefer (a) for consistency across shadcn components as we add more.
- Similarly, `--border`, `--muted`, `--card` can be updated when the user picks a color scheme so all shadcn components follow the wedding theme.
