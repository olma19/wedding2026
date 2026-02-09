import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Gradient from-* (used dynamically in admin/sections from lib/colors.ts)
    'from-pink-50', 'from-rose-50', 'from-purple-50', 'from-blue-50', 'from-teal-50',
    'from-green-100', 'from-slate-100', 'from-sage-100', 'from-red-50',
    // Green color scheme classes (salvia green - darker tones)
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
    'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800',
    'border-green-100', 'border-green-200', 'border-green-400', 'border-green-600', 'border-green-700', 'border-green-800',
    'hover:bg-green-100', 'hover:bg-green-200', 'hover:bg-green-400', 'hover:bg-green-700', 'hover:bg-green-900',
    'hover:text-green-600', 'hover:text-green-800', 'hover:border-green-400', 'hover:border-green-700',
    'focus:ring-green-600', 'focus:ring-green-800', 'focus:border-green-800', 'accent-green-800',
    // Sage color scheme (custom muted gray-green palette)
    'bg-sage-100', 'bg-sage-200', 'bg-sage-400', 'bg-sage-500', 'bg-sage-600', 'bg-sage-700', 'bg-sage-800',
    'text-sage-400', 'text-sage-500', 'text-sage-600', 'text-sage-700', 'text-sage-800',
    'border-sage-200', 'border-sage-500', 'border-sage-600', 'border-sage-700',
    'hover:bg-sage-200', 'hover:bg-sage-600', 'hover:bg-sage-800',
    'hover:text-sage-800', 'hover:border-sage-600',
    'focus:ring-sage-700', 'focus:border-sage-700', 'accent-sage-700',
    'fill-sage-400', 'fill-sage-600',
    // Pink color scheme classes (for fallback)
    'bg-pink-50', 'bg-pink-100', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700',
    'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600',
    'border-pink-100', 'border-pink-400', 'border-pink-600',
    'hover:bg-pink-100', 'hover:bg-pink-400', 'hover:bg-pink-700',
    'hover:text-pink-600', 'hover:border-pink-400',
    'focus:ring-pink-600', 'focus:border-pink-600', 'accent-pink-600',
    // Red color scheme classes
    'bg-red-50', 'bg-red-100', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700',
    'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600',
    'border-red-100', 'border-red-400', 'border-red-600',
    'hover:bg-red-100', 'hover:bg-red-400', 'hover:bg-red-700',
    'hover:text-red-600', 'hover:border-red-400',
    'focus:ring-red-600', 'focus:border-red-600', 'accent-red-600',
    // Focus border and accent for checkbox (rose, purple, blue, teal from lib/colors)
    'focus:border-rose-600', 'focus:border-purple-600', 'focus:border-blue-600', 'focus:border-teal-600',
    'accent-rose-600', 'accent-purple-600', 'accent-blue-600', 'accent-teal-600',
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
  			// Muted gray-green sage palette (dusty, not vivid)
  			sage: {
  				'50': '#f4f5f1',
  				'100': '#e8ebe3',
  				'200': '#d4d9c9',
  				'300': '#b5bd9f',
  				'400': '#96a07a',
  				'500': '#7a855e',
  				'600': '#606b48',
  				'700': '#4d553a',
  				'800': '#404631',
  				'900': '#373c2b',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-playfair)',
  				'serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
