import type { WeddingConfig } from '@/types/wedding'

/**
 * Minimal runtime check that config has required top-level keys.
 * Throws in development so misconfig is caught early.
 */
export function assertWeddingConfigShape(config: unknown): asserts config is WeddingConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Wedding config must be an object')
  }
  const required = ['date', 'ceremony', 'location', 'couple', 'dinnerParty', 'goodToKnow', 'toastmaster', 'rsvp']
  const obj = config as Record<string, unknown>
  for (const key of required) {
    if (!(key in obj)) {
      throw new Error(`Wedding config missing required key: ${key}`)
    }
  }
}
