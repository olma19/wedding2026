'use client'

import React from 'react'

/**
 * Escapes special regex characters in a string for use in RegExp
 */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Splits content by the given phrases (in order, first match wins) and returns
 * an array of segments: plain strings and phrases wrapped in <strong>.
 * keyPrefix is used to avoid duplicate keys when used per-line.
 */
export function highlightPhrases(
  content: string,
  phrases: string[],
  keyPrefix = '0'
): (string | React.ReactElement)[] {
  if (phrases.length === 0) return [content]

  const pattern = new RegExp(
    `(${phrases.map(escapeRegex).join('|')})`,
    'g'
  )
  const segments = content.split(pattern)
  const result: (string | React.ReactElement)[] = []

  segments.forEach((segment, i) => {
    if (segment.length === 0) return
    const isHighlight = phrases.some((p) => segment === p)
    if (isHighlight) {
      result.push(<strong key={`${keyPrefix}-${i}`} className="font-semibold text-gray-800">{segment}</strong>)
    } else {
      result.push(segment)
    }
  })

  return result
}

/**
 * Splits content by newlines, highlights each line, and returns a single array
 * of segments and <br /> elements for rendering.
 * linePrefixes: optional array of strings (e.g. emojis) to prepend to each line by index.
 */
export function formatContentWithNewlines(
  content: string,
  phrases: string[],
  linePrefixes?: string[]
): (string | React.ReactElement)[] {
  const lines = content.split('\n')
  const result: (string | React.ReactElement)[] = []

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      result.push(<br key={`br-${lineIndex}`} />)
    }
    const prefix = linePrefixes?.[lineIndex]
    const lineContent = prefix ? prefix + line : line
    const segments = highlightPhrases(lineContent, phrases, String(lineIndex))
    result.push(...segments)
  })

  return result
}

/** Line-prefix emojis for dress code: cocktail, lady, gentleman */
export const DRESS_CODE_LINE_EMOJIS = ['🍸 ', '👗 ', '👔 ']

export type GoodToKnowItemKey =
  | 'dressCode'
  | 'children'
  | 'hotels'
  | 'transport'
  | 'parking'
  | 'gifts'

/**
 * Returns phrases to highlight per Good to know item type.
 * Used so content from config can stay as plain strings while we highlight key parts.
 */
export function getHighlightsForKey(
  key: GoodToKnowItemKey,
  options?: { hotelDiscountCode?: string }
): string[] {
  switch (key) {
    case 'dressCode':
      return ['Cocktail – Semi-formal', 'Damer:', 'Herrar:']
    case 'hotels':
      return [
        'Best Western hotell i Vrigstad',
        options?.hotelDiscountCode ?? 'Friskbröllop',
      ]
    case 'transport':
      return ['150:-', '0722132377', 'BUSS']
    case 'parking':
      return ['Vallsjö gamla kyrka']
    default:
      return []
  }
}
