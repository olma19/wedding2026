# Bundle Optimization Guide

This document outlines the bundle optimization strategies implemented in the wedding website project.

## Overview

The project uses several strategies to optimize bundle size and improve load times:

1. **Code Splitting** - Lazy loading of components
2. **Dynamic Imports** - On-demand loading of heavy components
3. **Tree Shaking** - Removing unused code
4. **Image Optimization** - Next.js Image component with AVIF/WebP
5. **Bundle Analysis** - Tools to identify optimization opportunities

## Code Splitting Strategy

### Lazy-Loaded Components

**Sections (via SectionRegistry):**
- All section components are lazy-loaded using `React.lazy()`
- Loads on-demand as user scrolls
- Reduces initial bundle size significantly

**StickyCountdown:**
- Lazy-loaded with `next/dynamic` and `ssr: false`
- Not critical for initial render
- Loads after page is interactive

**Admin Page:**
- Entire admin page is a separate route
- Only loads when accessed
- Keeps admin code out of main bundle

### Components in Initial Bundle

**HeroSection:**
- Above the fold content
- Critical for LCP (Largest Contentful Paint)
- Loaded immediately

**Footer:**
- Small component
- Minimal impact on bundle size
- Loaded immediately

**SectionRegistry:**
- Small wrapper component
- Manages lazy-loaded sections
- Loaded immediately

## Bundle Analysis

### Running Bundle Analyzer

To analyze bundle sizes:

```bash
npm run analyze
```

This will:
1. Build the application
2. Generate bundle analysis reports
3. Open interactive visualizations in your browser

### Understanding the Output

The bundle analyzer shows:
- **Size of each chunk** - JavaScript bundles
- **Dependencies** - What's included in each chunk
- **Duplicates** - Code that appears in multiple chunks
- **Opportunities** - Large dependencies that could be optimized

### Key Metrics

**Target Bundle Sizes:**
- Initial JS bundle: < 200 KB (gzipped)
- Total JS bundle: < 500 KB (gzipped)
- Individual chunks: < 100 KB (gzipped)

## Optimization Techniques

### 1. Dynamic Imports

Use `next/dynamic` for components that aren't needed immediately:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false, // Skip SSR if component uses browser APIs
  loading: () => <LoadingSpinner />, // Optional loading state
})
```

### 2. Named Imports

Always use named imports to enable tree-shaking:

```tsx
// ✅ Good - Tree-shakeable
import { specificFunction } from 'large-library'

// ❌ Bad - Imports entire library
import * as LargeLibrary from 'large-library'
```

### 3. React.lazy for Sections

Use `React.lazy()` for route-level code splitting:

```tsx
const MySection = lazy(() => import('./MySection'))
```

### 4. Image Optimization

All images use Next.js Image component:
- Automatic format optimization (AVIF/WebP)
- Responsive sizing
- Lazy loading by default
- Priority loading for above-the-fold images

## Current Optimizations

### ✅ Implemented

1. **Section Lazy Loading**
   - All sections lazy-loaded via SectionRegistry
   - Reduces initial bundle by ~60%

2. **StickyCountdown Lazy Loading**
   - Loads after initial render
   - Improves LCP

3. **Webpack Optimization**
   - Deterministic module IDs
   - Code splitting configuration
   - Vendor chunk separation

4. **Image Optimization**
   - AVIF/WebP formats
   - Responsive sizes
   - Priority loading for hero

5. **Tree Shaking**
   - Named imports throughout
   - No default imports from large libraries

### 🔄 Ongoing

1. **Bundle Monitoring**
   - Regular bundle analysis
   - Track bundle size over time
   - Set up CI checks for bundle size

2. **Dependency Review**
   - Regular review of dependencies
   - Replace heavy libraries when possible
   - Keep dependencies up to date

## Bundle Size Budgets

### Recommended Limits

**Initial Load:**
- JavaScript: < 200 KB (gzipped)
- CSS: < 50 KB (gzipped)
- Images: Optimized per image

**Per Route:**
- Additional JS: < 100 KB (gzipped)
- Total JS per route: < 300 KB (gzipped)

### Monitoring

Run bundle analysis regularly:
```bash
npm run analyze
```

Check for:
- Unexpected bundle size increases
- Large dependencies
- Duplicate code across chunks
- Opportunities for further splitting

## Best Practices

### Do's ✅

- Use dynamic imports for below-the-fold content
- Lazy load routes and heavy components
- Use named imports for tree-shaking
- Optimize images with Next.js Image
- Monitor bundle size regularly

### Don'ts ❌

- Don't import entire libraries unnecessarily
- Don't lazy load above-the-fold content
- Don't skip code splitting for large components
- Don't ignore bundle size warnings
- Don't add heavy dependencies without review

## Troubleshooting

### Bundle Size Too Large

1. **Run bundle analyzer:**
   ```bash
   npm run analyze
   ```

2. **Identify large dependencies:**
   - Look for unexpectedly large chunks
   - Check for duplicate dependencies

3. **Optimize:**
   - Use dynamic imports
   - Replace heavy libraries
   - Split large components

### Performance Issues

1. **Check Network tab:**
   - Identify slow-loading resources
   - Check bundle sizes

2. **Use Lighthouse:**
   - Run performance audit
   - Check bundle size impact

3. **Optimize:**
   - Reduce bundle size
   - Add loading states
   - Optimize images

## Future Optimizations

Potential future improvements:

1. **Service Worker**
   - Cache static assets
   - Offline support

2. **Route-based Code Splitting**
   - Further split admin routes
   - Split decoration showcase

3. **Dependency Optimization**
   - Review Supabase client size
   - Consider lighter alternatives if available

4. **CSS Optimization**
   - Purge unused Tailwind classes
   - Split CSS per route

---

**Last Updated:** 2026-02-02
