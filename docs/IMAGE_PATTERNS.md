# Image Component Patterns

This document outlines the patterns and best practices for using Next.js Image components in the wedding website.

## Overview

All images in the project use Next.js's `Image` component for optimized loading, responsive sizing, and better performance.

## Image Patterns

### 1. Full-Bleed Background Images (Hero Section)

**Use Case:** Full-screen background images that cover the entire viewport.

**Pattern:**
```tsx
<section className="relative min-h-screen flex items-end justify-center overflow-hidden">
  <Image
    src={imageUrl}
    alt=""
    fill
    className="object-cover"
    priority
    sizes="100vw"
  />
  {/* Content overlay */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

**Key Points:**
- Parent container must have `position: relative`
- Use `fill` prop for full container coverage
- Use `object-cover` for proper aspect ratio handling
- Set `sizes="100vw"` for full viewport width
- Use `priority` for above-the-fold images
- Add `z-index` to content overlays to ensure they appear above the image

**Example:** `components/sections/HeroSection.tsx`

---

### 2. Aspect Ratio Container Images

**Use Case:** Images with specific aspect ratios (e.g., 16:9, 4:3) within content sections.

**Pattern:**
```tsx
<div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
  <Image
    src={imageUrl}
    alt="Description"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 896px"
  />
</div>
```

**Key Points:**
- Use Tailwind's `aspect-*` utilities (`aspect-video`, `aspect-square`, `aspect-[4/3]`)
- Container must have `position: relative`
- Use `fill` prop with aspect ratio container
- Set responsive `sizes` prop based on container max-width
- Use `object-cover` or `object-contain` based on design needs
- Add `overflow-hidden` to container to clip image to rounded corners

**Example:** `components/sections/VigselSection.tsx`

---

### 3. Responsive Height Images

**Use Case:** Images that have different heights on mobile vs desktop.

**Pattern:**
```tsx
<div className="relative w-full aspect-[4/3] md:h-[800px] rounded-lg overflow-hidden shadow-xl">
  <Image
    src={imageUrl}
    alt="Description"
    fill
    className="object-cover object-top md:object-center"
    sizes="(max-width: 768px) 100vw, 1152px"
  />
</div>
```

**Key Points:**
- Combine aspect ratio on mobile with fixed height on desktop
- Use `object-top`, `object-center`, `object-bottom` for positioning
- Adjust `sizes` prop to match container max-width
- Ensure container has `position: relative`

**Example:** `components/sections/ToastmasterSection.tsx`

---

## Sizes Prop Guidelines

The `sizes` prop tells the browser what size the image will be at different viewport widths. This helps Next.js serve appropriately sized images.

### Common Patterns:

1. **Full viewport width:**
   ```tsx
   sizes="100vw"
   ```

2. **Container-based (with max-width):**
   ```tsx
   sizes="(max-width: 768px) 100vw, 896px"
   ```
   - Mobile: 100% of viewport width
   - Desktop: Fixed 896px (container max-width)

3. **Multi-breakpoint:**
   ```tsx
   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   ```
   - Mobile: Full width
   - Tablet: Half width
   - Desktop: One-third width

---

## Container Requirements

### For `fill` prop images:

1. **Parent must have `position: relative`:**
   ```tsx
   <div className="relative">
     <Image fill ... />
   </div>
   ```

2. **Container should have explicit dimensions:**
   - Use `aspect-*` utilities, or
   - Set explicit `width`/`height`, or
   - Use `min-h-*` or `h-*` classes

3. **Add `overflow-hidden` if using rounded corners:**
   ```tsx
   <div className="relative rounded-lg overflow-hidden">
     <Image fill className="object-cover" ... />
   </div>
   ```

---

## Object Fit Options

- **`object-cover`**: Image covers entire container, may crop (most common)
- **`object-contain`**: Image fits within container, may have empty space
- **`object-fill`**: Image stretches to fill container (distorts aspect ratio)
- **`object-none`**: Image maintains original size
- **`object-scale-down`**: Behaves like `contain` or `none`, whichever is smaller

---

## Performance Best Practices

1. **Use `priority` for above-the-fold images:**
   ```tsx
   <Image priority ... />
   ```

2. **Set appropriate `sizes` prop** to avoid loading oversized images

3. **Use `loading="lazy"`** (default) for below-the-fold images

4. **Optimize source images** before adding to `/public/images/`

5. **Use appropriate image formats:**
   - JPEG for photos
   - PNG for graphics with transparency
   - WebP when possible (Next.js handles conversion)

---

## Common Issues and Solutions

### Issue: Image overflowing container
**Solution:** Ensure container has `overflow-hidden` and proper dimensions

### Issue: Image not filling container
**Solution:** Check that parent has `position: relative` and image has `fill` prop

### Issue: Image loading slowly
**Solution:** Add `priority` prop for above-the-fold images, optimize source images

### Issue: Wrong image size loaded
**Solution:** Adjust `sizes` prop to match actual rendered size

### Issue: Aspect ratio distortion
**Solution:** Use `object-cover` or `object-contain` instead of `object-fill`

---

## Checklist for Adding New Images

- [ ] Container has `position: relative`
- [ ] Image uses `fill` prop (or explicit width/height)
- [ ] Appropriate `sizes` prop set
- [ ] `object-cover` or `object-contain` class applied
- [ ] `alt` text provided (or empty string for decorative images)
- [ ] `priority` prop added for above-the-fold images
- [ ] Container has proper dimensions (aspect ratio or fixed size)
- [ ] `overflow-hidden` added if using rounded corners
- [ ] Z-index set correctly for overlays

---

## Examples in Codebase

- **Hero Section:** `components/sections/HeroSection.tsx`
- **Ceremony Image:** `components/sections/VigselSection.tsx`
- **Toastmaster Image:** `components/sections/ToastmasterSection.tsx`
