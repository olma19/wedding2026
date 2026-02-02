'use client'

import { useState } from 'react'
import FlowerDecoration from '@/components/FlowerDecoration'
import LeafDecoration from '@/components/LeafDecoration'
import { ColorSchemeProvider } from '@/components/ColorSchemeProvider'
import type { ColorSchemeName } from '@/lib/colors'

type DecorationType = 'flower' | 'leaf'
type FlowerVariant = 'flower' | 'leaf' | 'branch'
type LeafVariant = 'single' | 'pair'
type Size = 'small' | 'medium' | 'large'

const colorSchemes: ColorSchemeName[] = ['pink', 'rose', 'purple', 'blue', 'teal', 'green', 'sage', 'red']

export default function DecorationsPage() {
  const [decorationType, setDecorationType] = useState<DecorationType>('flower')
  const [flowerVariant, setFlowerVariant] = useState<FlowerVariant>('flower')
  const [leafVariant, setLeafVariant] = useState<LeafVariant>('single')
  const [size, setSize] = useState<Size>('medium')
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>('sage')

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Decoration Types
          </h1>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Decoration Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decoration Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDecorationType('flower')}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    decorationType === 'flower'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Flower
                </button>
                <button
                  onClick={() => setDecorationType('leaf')}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    decorationType === 'leaf'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Leaf
                </button>
              </div>
            </div>

            {/* Variant Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variant
              </label>
              {decorationType === 'flower' ? (
                <div className="flex flex-wrap gap-2">
                  {(['flower', 'leaf', 'branch'] as FlowerVariant[]).map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setFlowerVariant(variant)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        flowerVariant === variant
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(['single', 'pair'] as LeafVariant[]).map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setLeafVariant(variant)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        leafVariant === variant
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as Size[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        size === s
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Scheme
                </label>
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value as ColorSchemeName)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {colorSchemes.map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        {/* Preview Area */}
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-xl font-semibold text-gray-700 mb-8">
              Preview
            </h2>
            <div className="flex items-center justify-center">
              {decorationType === 'flower' ? (
                <FlowerDecoration
                  size={size}
                  variant={flowerVariant}
                  className="transition-all duration-300"
                />
              ) : (
                <LeafDecoration
                  size={size}
                  variant={leafVariant}
                  className="transition-all duration-300"
                />
              )}
            </div>
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p className="font-medium">
                Type: {decorationType} | Variant: {decorationType === 'flower' ? flowerVariant : leafVariant} | Size: {size} | Color: {colorScheme}
              </p>
            </div>
          </div>
        </div>

        {/* All Variants Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            All Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flower Variants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Flower Variants</h3>
              <div className="grid grid-cols-3 gap-6">
                {(['flower', 'leaf', 'branch'] as FlowerVariant[]).map((variant) => (
                  <div key={variant} className="flex flex-col items-center">
                    <FlowerDecoration size="medium" variant={variant} />
                    <span className="mt-2 text-sm text-gray-600 capitalize">{variant}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaf Variants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Leaf Variants</h3>
              <div className="grid grid-cols-2 gap-6">
                {(['single', 'pair'] as LeafVariant[]).map((variant) => (
                  <div key={variant} className="flex flex-col items-center">
                    <LeafDecoration size="medium" variant={variant} />
                    <span className="mt-2 text-sm text-gray-600 capitalize">{variant}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Size Comparison
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-end justify-center gap-8">
              {(['small', 'medium', 'large'] as Size[]).map((s) => (
                <div key={s} className="flex flex-col items-center">
                  {decorationType === 'flower' ? (
                    <FlowerDecoration size={s} variant={flowerVariant} />
                  ) : (
                    <LeafDecoration size={s} variant={leafVariant} />
                  )}
                  <span className="mt-2 text-sm text-gray-600 capitalize">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Scheme Comparison */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Color Scheme Comparison
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {colorSchemes.map((scheme) => (
                <ColorSchemeProvider key={scheme} colorScheme={scheme}>
                  <div className="flex flex-col items-center">
                    {decorationType === 'flower' ? (
                      <FlowerDecoration size="medium" variant={flowerVariant} />
                    ) : (
                      <LeafDecoration size="medium" variant={leafVariant} />
                    )}
                    <span className="mt-2 text-sm text-gray-600 capitalize font-medium">{scheme}</span>
                  </div>
                </ColorSchemeProvider>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ColorSchemeProvider>
  )
}
