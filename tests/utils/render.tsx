/**
 * Custom render function with providers
 * Wraps React Testing Library's render with necessary providers
 */

import { render, type RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ColorSchemeProvider } from '@/components/ColorSchemeProvider'
import type { ColorSchemeName } from '@/lib/colors'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  colorScheme?: ColorSchemeName
}

/**
 * Custom render function that includes all necessary providers
 * 
 * @example
 * ```tsx
 * const { getByText } = customRender(<MyComponent />, {
 *   colorScheme: 'sage'
 * })
 * ```
 */
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { colorScheme, ...renderOptions } = options

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ColorSchemeProvider colorScheme={colorScheme}>
        {children}
      </ColorSchemeProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }
