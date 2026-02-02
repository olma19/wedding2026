# Refactoring Plan - Wedding Website 2026

This document outlines the refactoring plan to improve code maintainability, reduce duplication, and establish better architectural patterns.

**Status Legend:**
- ⬜ Not Started
- 🟡 In Progress
- ✅ Completed
- ❌ Blocked/Cancelled

---

## 🎯 Overview

After initial "vibe coding" phase, we've identified several areas for improvement:
- **Code Duplication**: ~200+ lines of repeated section patterns
- **Mixed Concerns**: Business logic mixed with presentation
- **Hardcoded Logic**: Gradient and decoration logic scattered
- **Large Components**: RSVPForm is 360+ lines
- **Module-level State**: SSR issues with decoration counter

---

## 📋 Refactoring Tasks

### Phase 1: Foundation & Shared Components

#### 1.1 Create Section Wrapper Component ⬜
**Priority: HIGH** | **Estimated Impact: ~200 lines reduced**

- [ ] Create `components/sections/SectionWrapper.tsx`
  - [ ] Extract common section structure (section tag, container, background)
  - [ ] Support for decorative elements positioning
  - [ ] Integrate ScrollAnimation wrapper
  - [ ] Support for custom className and background colors
- [ ] Create `types/sections.ts` for SectionWrapper props
- [ ] Update all 12 section components to use SectionWrapper
  - [ ] HeroSection (may need special handling)
  - [ ] CountdownSection
  - [ ] VigselSection
  - [ ] AddressSection
  - [ ] DinnerPartySection
  - [ ] GoodToKnowSection
  - [ ] ToastmasterSection
  - [ ] OSASection
  - [ ] RSVPSection
  - [ ] StorySection
  - [ ] DressCodeSection
  - [ ] WeddingDetailsSection
- [ ] Test all sections render correctly
- [ ] Update documentation

**Files to Create:**
- `components/sections/SectionWrapper.tsx`
- `types/sections.ts`

**Files to Modify:**
- All files in `components/sections/*.tsx`

---

#### 1.2 Extract Decoration Variation Logic ⬜
**Priority: HIGH** | **Estimated Impact: Better SSR, reusable logic**

- [ ] Create `lib/decorations/variations.ts`
  - [ ] Move `getVariedLeafDecoration()` from FlowerDecoration.tsx
  - [ ] Add proper TypeScript types
  - [ ] Add JSDoc comments
- [ ] Create `hooks/useDecorationCounter.ts`
  - [ ] Replace module-level `decorationCounter` with React hook
  - [ ] Use `useId()` or similar for SSR-safe unique IDs
- [ ] Update `FlowerDecoration.tsx` to use new utilities
- [ ] Test decoration variations work correctly
- [ ] Test SSR compatibility

**Files to Create:**
- `lib/decorations/variations.ts`
- `hooks/useDecorationCounter.ts`

**Files to Modify:**
- `components/FlowerDecoration.tsx`

---

#### 1.3 Centralize Gradient Logic ⬜
**Priority: MEDIUM** | **Estimated Impact: Reusable, maintainable gradients**

- [ ] Move `getFormGradients()` from RSVPForm.tsx to `lib/colors/gradients.ts`
- [ ] Extend `lib/colors.ts` with gradient utilities
  - [ ] Add gradient types for all color schemes
  - [ ] Support for different gradient types (form, card, section)
- [ ] Create `hooks/useFormGradients.ts` hook
- [ ] Update RSVPForm to use new hook
- [ ] Consider adding gradient utilities to ColorSchemeProvider
- [ ] Test gradients work with all color schemes

**Files to Create:**
- `lib/colors/gradients.ts`
- `hooks/useFormGradients.ts`

**Files to Modify:**
- `components/RSVPForm.tsx`
- `lib/colors.ts` (extend)

---

### Phase 2: Component Refactoring

#### 2.1 Break Down RSVPForm Component ⬜
**Priority: HIGH** | **Estimated Impact: 360 lines → ~150 lines main component**

- [ ] Create `components/forms/FormField.tsx`
  - [ ] Reusable input field wrapper
  - [ ] Built-in error display
  - [ ] Label and required indicator support
- [ ] Create `components/forms/PersonFormSection.tsx`
  - [ ] Extract person form section (currently inline in RSVPForm)
  - [ ] Include gradient background logic
  - [ ] Support for index-based styling
- [ ] Create `components/forms/GuestCountSelector.tsx`
  - [ ] Extract guest count button group
- [ ] Create `hooks/useRSVPSubmission.ts`
  - [ ] Extract form submission logic
  - [ ] Extract confetti creation
  - [ ] Extract error/success state management
- [ ] Refactor RSVPForm to use new components
- [ ] Test form functionality end-to-end
- [ ] Update types if needed

**Files to Create:**
- `components/forms/FormField.tsx`
- `components/forms/PersonFormSection.tsx`
- `components/forms/GuestCountSelector.tsx`
- `hooks/useRSVPSubmission.ts`

**Files to Modify:**
- `components/RSVPForm.tsx`

---

#### 2.2 Refactor Decoration Components ⬜
**Priority: MEDIUM** | **Estimated Impact: Better separation of concerns**

- [ ] Create `components/decorations/BaseDecoration.tsx`
  - [ ] Common wrapper with size classes
  - [ ] Common props interface
- [ ] Split FlowerDecoration into separate components:
  - [ ] `components/decorations/Flower.tsx` - Flower-specific rendering
  - [ ] `components/decorations/Leaf.tsx` - Leaf-specific rendering (use LeafDecoration)
  - [ ] `components/decorations/Branch.tsx` - Branch-specific rendering
- [ ] Create `components/decorations/DecorationFactory.tsx` or hook
  - [ ] Factory pattern to create correct decoration type
  - [ ] Handles variation logic
- [ ] Update all usages of FlowerDecoration
- [ ] Test all decoration types render correctly
- [ ] Consider deprecating old FlowerDecoration (or keep as wrapper)

**Files to Create:**
- `components/decorations/BaseDecoration.tsx`
- `components/decorations/Flower.tsx`
- `components/decorations/Branch.tsx`
- `components/decorations/DecorationFactory.tsx` (or hook)

**Files to Modify:**
- `components/FlowerDecoration.tsx` (refactor or deprecate)
- `components/LeafDecoration.tsx` (may move to decorations/)
- All files using FlowerDecoration

---

### Phase 3: Configuration & Architecture

#### 3.1 Create Section Configuration System ⬜
**Priority: LOW** | **Estimated Impact: Dynamic section management**

- [ ] Create `config/sections.ts`
  - [ ] Define section metadata (id, component, enabled, order)
  - [ ] Type definitions for section config
- [ ] Create `components/sections/SectionRegistry.tsx` or similar
  - [ ] Dynamic section rendering based on config
- [ ] Update `app/page.tsx` to use section config
- [ ] Add ability to conditionally enable/disable sections
- [ ] Add section-level configuration (colors, decorations, etc.)
- [ ] Test section ordering and visibility

**Files to Create:**
- `config/sections.ts`
- `components/sections/SectionRegistry.tsx` (optional)

**Files to Modify:**
- `app/page.tsx`

---

#### 3.2 Extract API Error Handling Patterns ⬜
**Priority: MEDIUM** | **Estimated Impact: Consistent error handling**

- [ ] Create `lib/api/errorHandler.ts`
  - [ ] Standardized error response format
  - [ ] Error logging utilities
  - [ ] Common error types
- [ ] Create `lib/api/responseHelpers.ts`
  - [ ] Success response helpers
  - [ ] Error response helpers
  - [ ] Validation error formatting
- [ ] Update `app/api/rsvp/route.ts` to use new utilities
- [ ] Update other API routes if any
- [ ] Add error handling tests

**Files to Create:**
- `lib/api/errorHandler.ts`
- `lib/api/responseHelpers.ts`

**Files to Modify:**
- `app/api/rsvp/route.ts`
- Other API routes

---

### Phase 4: Utilities & Helpers

#### 4.1 Create Shared Hooks ⬜
**Priority: LOW** | **Estimated Impact: Reduce repetition**

- [ ] Create `hooks/useSectionColors.ts`
  - [ ] Wrapper around useColors() with section-specific defaults
- [ ] Create `hooks/useFormValidation.ts` (if needed)
  - [ ] Common form validation patterns
- [ ] Create `hooks/useScrollAnimation.ts` (if ScrollAnimation can be improved)
- [ ] Document all hooks in `docs/hooks.md`

**Files to Create:**
- `hooks/useSectionColors.ts`
- `docs/hooks.md` (documentation)

---

#### 4.2 Create Utility Functions ⬜
**Priority: LOW** | **Estimated Impact: Code consistency**

- [ ] Create `lib/utils/classNames.ts`
  - [ ] Helper for conditional class names (or use clsx if not already)
- [ ] Create `lib/utils/stringHelpers.ts`
  - [ ] Common string utilities (capitalize, etc.)
- [ ] Create `lib/utils/dateHelpers.ts`
  - [ ] Date formatting utilities (if needed)
- [ ] Audit existing code for utility function opportunities

**Files to Create:**
- `lib/utils/classNames.ts`
- `lib/utils/stringHelpers.ts`
- `lib/utils/dateHelpers.ts` (if needed)

---

### Phase 5: Testing & Documentation

#### 5.1 Add Type Definitions ⬜
**Priority: MEDIUM** | **Estimated Impact: Better type safety**

- [ ] Create `types/sections.ts` for section-related types
- [ ] Create `types/decorations.ts` for decoration-related types
- [ ] Create `types/forms.ts` for form-related types (if not exists)
- [ ] Review and improve existing types
- [ ] Ensure all components have proper TypeScript types
- [ ] Add JSDoc comments to public APIs

**Files to Create/Modify:**
- `types/sections.ts`
- `types/decorations.ts`
- Review all type files

---

#### 5.2 Update Documentation ⬜
**Priority: MEDIUM** | **Estimated Impact: Better developer experience**

- [ ] Update `README.md` with new structure
- [ ] Create `docs/ARCHITECTURE.md` explaining component structure
- [ ] Create `docs/COMPONENTS.md` documenting component APIs
- [ ] Update `DECORATION_GUIDE.md` if decoration system changes
- [ ] Add inline code comments where complex logic exists
- [ ] Create migration guide for breaking changes (if any)

**Files to Create:**
- `docs/ARCHITECTURE.md`
- `docs/COMPONENTS.md`
- `docs/MIGRATION_GUIDE.md` (if needed)

---

## 🎯 Priority Order

**Recommended execution order:**

1. **Phase 1.1** - Section Wrapper (biggest impact)
2. **Phase 1.2** - Decoration Variation Logic (fixes SSR issues)
3. **Phase 2.1** - Break Down RSVPForm (improves maintainability)
4. **Phase 1.3** - Centralize Gradients (completes Phase 1)
5. **Phase 2.2** - Refactor Decorations (if time permits)
6. **Phase 3+** - Lower priority improvements

---

## 📊 Success Metrics

After refactoring, we should see:

- ✅ **Code Reduction**: ~300-400 lines of duplicated code removed
- ✅ **Component Size**: Largest component < 200 lines
- ✅ **Reusability**: Shared components used in 5+ places
- ✅ **Type Safety**: 100% TypeScript coverage with proper types
- ✅ **SSR Compatibility**: No module-level state issues
- ✅ **Maintainability**: New sections can be added in < 10 lines

---

## 🚨 Breaking Changes

**Potential breaking changes to watch for:**

- [ ] SectionWrapper API changes (if sections use custom props)
- [ ] Decoration component API changes
- [ ] Form component structure changes
- [ ] Color scheme API changes (if gradients moved)

**Mitigation:**
- Keep old components as wrappers during transition
- Use feature flags if needed
- Document migration path

---

## 📝 Notes

- Start with Phase 1.1 (Section Wrapper) for maximum impact
- Test thoroughly after each phase
- Consider creating a feature branch for refactoring work
- Update this document as tasks are completed
- Add new tasks as they're discovered during refactoring

---

**Last Updated:** 2026-02-02
**Status:** Planning Phase
