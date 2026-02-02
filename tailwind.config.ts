import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Green color scheme classes (salvia green - darker tones)
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
    'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800',
    'border-green-100', 'border-green-200', 'border-green-400', 'border-green-600', 'border-green-700', 'border-green-800',
    'hover:bg-green-100', 'hover:bg-green-200', 'hover:bg-green-400', 'hover:bg-green-700', 'hover:bg-green-900',
    'hover:text-green-600', 'hover:text-green-800', 'hover:border-green-400', 'hover:border-green-700',
    'focus:ring-green-600', 'focus:ring-green-800',
    // Sage green color scheme classes (muted, grayish-green)
    'bg-slate-100', 'bg-slate-200', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-800',
    'text-emerald-400', 'text-emerald-500', 'text-emerald-600', 'text-emerald-700', 'text-emerald-800',
    'border-slate-200', 'border-emerald-500', 'border-emerald-600', 'border-emerald-700',
    'hover:bg-slate-200', 'hover:bg-emerald-600', 'hover:bg-emerald-800',
    'hover:text-emerald-800', 'hover:border-emerald-600',
    'focus:ring-emerald-700',
    // Pink color scheme classes (for fallback)
    'bg-pink-50', 'bg-pink-100', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700',
    'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600',
    'border-pink-100', 'border-pink-400', 'border-pink-600',
    'hover:bg-pink-100', 'hover:bg-pink-400', 'hover:bg-pink-700',
    'hover:text-pink-600', 'hover:border-pink-400',
    'focus:ring-pink-600',
    // Red color scheme classes
    'bg-red-50', 'bg-red-100', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700',
    'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600',
    'border-red-100', 'border-red-400', 'border-red-600',
    'hover:bg-red-100', 'hover:bg-red-400', 'hover:bg-red-700',
    'hover:text-red-600', 'hover:border-red-400',
    'focus:ring-red-600',
    // Additional colors for all schemes (fill classes for SVG)
    'fill-pink-300', 'fill-pink-500', 'fill-rose-300', 'fill-rose-500',
    'fill-purple-300', 'fill-purple-500', 'fill-blue-300', 'fill-blue-500',
    'fill-teal-300', 'fill-teal-500', 'fill-green-500', 'fill-green-700',
    'fill-emerald-400', 'fill-emerald-600', 'fill-red-300', 'fill-red-500',
    'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600',
    'text-teal-300', 'text-teal-400', 'text-teal-500', 'text-teal-600',
    'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600',
    'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600',
    'text-rose-300', 'text-rose-400', 'text-rose-500', 'text-rose-600',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
