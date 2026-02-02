# Troubleshooting Guide

This guide helps you resolve common issues when working with the wedding website codebase.

## Table of Contents

- [Development Issues](#development-issues)
- [Build & Deployment Issues](#build--deployment-issues)
- [Supabase Issues](#supabase-issues)
- [TypeScript Issues](#typescript-issues)
- [Testing Issues](#testing-issues)
- [Styling Issues](#styling-issues)
- [Component Issues](#component-issues)

---

## Development Issues

### Issue: Development server won't start

**Symptoms:**
- `npm run dev` fails or hangs
- Port 3000 already in use

**Solutions:**
1. **Port already in use:**
   ```bash
   # Kill process on port 3000 (Windows)
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### Issue: Hot reload not working

**Symptoms:**
- Changes don't reflect in browser
- Need to manually refresh

**Solutions:**
1. Check that you're saving files (some editors require explicit save)
2. Clear browser cache
3. Restart development server
4. Check for syntax errors in console

---

### Issue: Module not found errors

**Symptoms:**
- `Cannot find module '@/...'`
- Import errors

**Solutions:**
1. **Check TypeScript path alias:**
   - Verify `tsconfig.json` has `"paths": { "@/*": ["./*"] }`

2. **Restart TypeScript server:**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

3. **Check file extensions:**
   - Ensure imports include `.tsx` or `.ts` if needed
   - Or remove extensions (TypeScript handles this)

---

## Build & Deployment Issues

### Issue: Build fails with TypeScript errors

**Symptoms:**
- `npm run build` fails
- TypeScript compilation errors

**Solutions:**
1. **Run type check locally:**
   ```bash
   npx tsc --noEmit
   ```

2. **Fix all errors before building:**
   - Check error messages
   - Fix type mismatches
   - Add missing type definitions

3. **Check strict mode settings:**
   - Review `tsconfig.json` strict options
   - Some errors may be from newly enabled strict checks

---

### Issue: Build succeeds but app crashes in production

**Symptoms:**
- Build completes successfully
- App crashes on Vercel/production

**Solutions:**
1. **Check environment variables:**
   - Ensure all required env vars are set in deployment platform
   - Verify variable names match exactly (case-sensitive)

2. **Check for client-side only code:**
   - Ensure `'use client'` directive is present for components using hooks
   - Check for `window` or `document` usage without guards

3. **Check Supabase connection:**
   - Verify Supabase project is active
   - Check API keys are correct
   - Review Supabase logs for errors

---

## Supabase Issues

### Issue: "Missing Supabase environment variables" warning

**Symptoms:**
- Console warning about missing variables
- Supabase client not working

**Solutions:**
1. **Check `.env.local` file exists:**
   ```bash
   # Should be in project root
   ls .env.local
   ```

2. **Verify all three variables are set:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   ```

3. **Restart development server** after changing `.env.local`

4. **Check for typos** in variable names (case-sensitive)

---

### Issue: RSVP submission fails

**Symptoms:**
- Form submission returns error
- "Failed to save RSVP" message

**Solutions:**
1. **Check Supabase table exists:**
   - Go to Supabase Dashboard → Table Editor
   - Verify `rsvps` table exists
   - Run SQL schema if missing (see `SUPABASE_SETUP.md`)

2. **Check service role key:**
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
   - Should be the `service_role` key, not `anon` key

3. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Look for error messages
   - Check API logs for failed requests

4. **Verify table schema:**
   - Ensure `attendees` column exists (JSONB type)
   - Check all required columns are present

---

### Issue: Can't access admin page or RSVP list

**Symptoms:**
- GET `/api/rsvp` returns 401 Unauthorized
- Admin page shows "Obehörig" (Unauthorized)

**Solutions:**
1. **Check admin authentication:**
   - Verify `ADMIN_PASSWORD` environment variable is set
   - Check password matches in login request

2. **Check cookie/session:**
   - Clear browser cookies
   - Try logging in again
   - Check browser DevTools → Application → Cookies

3. **Verify authentication flow:**
   - Check `app/api/admin/login/route.ts` is working
   - Verify cookie is being set correctly

---

## TypeScript Issues

### Issue: Type errors after enabling strict mode

**Symptoms:**
- Many TypeScript errors after strict mode enabled
- `noImplicitAny` errors
- `strictNullChecks` errors

**Solutions:**
1. **Fix unused variables:**
   - Prefix with `_` if intentionally unused: `_request`
   - Remove if truly unused

2. **Fix `any` types:**
   - Replace with proper types
   - Use `unknown` if type is truly unknown
   - Add type assertions where necessary

3. **Fix null/undefined checks:**
   - Add null checks before accessing properties
   - Use optional chaining: `obj?.property`
   - Use nullish coalescing: `value ?? defaultValue`

---

### Issue: Import type errors

**Symptoms:**
- `Cannot find module` errors
- Type-only imports failing

**Solutions:**
1. **Use `type` keyword for type-only imports:**
   ```typescript
   import type { SomeType } from './types'
   ```

2. **Check file extensions:**
   - TypeScript files should use `.ts` or `.tsx`
   - Ensure imports match actual file names

3. **Restart TypeScript server** in your IDE

---

## Testing Issues

### Issue: Tests fail with "document is not defined"

**Symptoms:**
- Tests fail in Vitest
- DOM-related errors

**Solutions:**
1. **Check test setup:**
   - Verify `vitest.config.ts` has `environment: 'jsdom'`
   - Check `tests/setup.ts` mocks `window.matchMedia` and `IntersectionObserver`

2. **Add guards for SSR:**
   ```typescript
   if (typeof document === 'undefined') return
   ```

3. **Use `act()` for state updates:**
   ```typescript
   await act(async () => {
     await result.current.someAsyncFunction()
   })
   ```

---

### Issue: Mock not working in tests

**Symptoms:**
- `vi.mock()` not working
- Mock functions not being called

**Solutions:**
1. **Check mock hoisting:**
   - Mocks are hoisted - define them before imports
   - Use factory functions for dynamic mocks

2. **Use `vi.mocked()` for TypeScript:**
   ```typescript
   vi.mocked(someFunction).mockReturnValueOnce(value)
   ```

3. **Reset mocks between tests:**
   ```typescript
   beforeEach(() => {
     vi.clearAllMocks()
   })
   ```

---

## Styling Issues

### Issue: Tailwind classes not working

**Symptoms:**
- Classes don't apply styles
- Styles missing in production

**Solutions:**
1. **Check Tailwind config:**
   - Verify `content` paths include your files
   - Check `tailwind.config.ts` has correct paths

2. **Rebuild Tailwind:**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   npm run dev
   ```

3. **Check safelist:**
   - Dynamic classes may need to be in `safelist` in `tailwind.config.ts`
   - Add to safelist if classes are generated dynamically

---

### Issue: CSS conflicts or styles not applying

**Symptoms:**
- Styles override each other
- Custom CSS not working

**Solutions:**
1. **Check CSS specificity:**
   - Use Tailwind utilities instead of custom CSS when possible
   - Check `app/globals.css` for conflicts

2. **Verify Tailwind layers:**
   - Custom utilities should use `@layer utilities`
   - Check layer order in `globals.css`

3. **Check for inline styles:**
   - Prefer Tailwind classes over inline styles
   - Only use inline styles for dynamic values (e.g., `animationDelay`)

---

## Component Issues

### Issue: Component not rendering

**Symptoms:**
- Component doesn't appear
- Blank space where component should be

**Solutions:**
1. **Check for errors in console:**
   - Open browser DevTools → Console
   - Look for error messages
   - Check ErrorBoundary caught any errors

2. **Verify component is imported correctly:**
   - Check import path
   - Verify component is exported correctly

3. **Check conditional rendering:**
   - Verify conditions for rendering are met
   - Check `mounted` state for client-only components

---

### Issue: Form validation not working

**Symptoms:**
- Form submits invalid data
- Validation errors not showing

**Solutions:**
1. **Check Zod schema:**
   - Verify `rsvpSchema` in `lib/validations/rsvp.ts`
   - Ensure all fields are properly validated

2. **Check React Hook Form setup:**
   - Verify `resolver: zodResolver(rsvpSchema)` is set
   - Check `formState.errors` is being used

3. **Check FormField error prop:**
   - Ensure errors are passed to `FormField` component
   - Verify error messages are displayed

---

### Issue: Images not loading or sizing incorrectly

**Symptoms:**
- Images don't appear
- Images overflow containers
- Images not responsive

**Solutions:**
1. **Check image paths:**
   - Verify images are in `public/` directory
   - Use `/images/filename.jpg` for public images

2. **Check Next.js Image component:**
   - Ensure container has `position: relative` for `fill` prop
   - Verify `sizes` prop is set correctly
   - Check aspect ratio containers

3. **See [Image Patterns Guide](./IMAGE_PATTERNS.md)** for detailed solutions

---

## Common Patterns & Solutions

### Adding a New Section

1. Create component in `components/sections/`
2. Use `SectionWrapper` for consistent structure
3. Add to `SectionRegistry` component map
4. Enable in `config/sections.ts`

**Example:**
```tsx
// components/sections/MySection.tsx
export default function MySection() {
  return (
    <SectionWrapper title="My Section" background="white">
      <p>Content here</p>
    </SectionWrapper>
  )
}
```

### Adding a New Color Scheme

1. Add colors to `lib/colors.ts` in `colorSchemes` object
2. Add classes to `tailwind.config.ts` safelist
3. Update `ColorSchemeName` type in `types/wedding.ts`

### Debugging API Routes

1. Check server logs in terminal
2. Use `console.log` in API route (server-side only)
3. Check Supabase logs in dashboard
4. Use test endpoint: `/api/test-supabase`

---

## Getting Help

If you're still stuck:

1. **Check existing documentation:**
   - [Architecture Overview](./ARCHITECTURE.md)
   - [Component Documentation](./COMPONENTS.md)
   - [Refactoring Plan](../REFACTORING_PLAN.md)

2. **Check error messages:**
   - Read full error messages carefully
   - Check stack traces
   - Look for line numbers

3. **Search the codebase:**
   - Use grep to find similar patterns
   - Check how other components solve similar problems

4. **Review recent changes:**
   - Check git history
   - Review `REFACTORING_SUMMARY.md` for recent changes

---

## Known Issues

### Current Limitations

1. **Error Boundaries:**
   - Only catch render errors, not event handler errors
   - Cannot reset programmatically (requires page reload)

2. **Image Testing:**
   - Manual verification needed for responsive image sizing
   - See `docs/IMAGE_PATTERNS.md` for patterns

3. **Admin Authentication:**
   - Currently uses simple password-based auth
   - Consider upgrading to NextAuth.js for production

---

**Last Updated:** 2026-02-02
