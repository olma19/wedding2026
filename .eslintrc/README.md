# ESLint Custom Rules

This directory contains custom ESLint rules for the wedding website project.

## Rules

### enforce-classnames

Enforces usage of the `classNames()` utility function instead of template literals for `className` props in JSX elements.

**Why?**
- Consistency: All className handling uses the same utility
- Maintainability: Easier to read and modify
- Type safety: Better TypeScript support
- Performance: Slightly better performance with utility function

**What it flags:**
- Template literals with multiple expressions: `className={`${a} ${b}`}`
- Template literals with string parts: `className={`text-${size} ${color}`}`

**What it allows:**
- Simple variable interpolation: `className={`${variable}`}` (single expression, no string parts)
- String literals: `className="text-lg"`

**Example violations:**

```tsx
// ❌ Bad - Multiple expressions
<div className={`text-${size} ${color} ${disabled ? 'opacity-50' : ''}`}>

// ❌ Bad - String parts with expressions
<div className={`text-lg ${colors.text}`}>

// ✅ Good - Use classNames
<div className={classNames('text-lg', colors.text, disabled && 'opacity-50')}>

// ✅ Good - Simple variable (allowed)
<div className={`${someVariable}`}>

// ✅ Good - String literal (allowed)
<div className="text-lg">
```

## Usage

The rule is automatically enabled in `.eslintrc.json`. Run:

```bash
npm run lint
```

To see violations and fix them manually.
