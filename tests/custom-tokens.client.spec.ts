/** Custom-skin token generator: full token coverage, per-mode values,
 * determinism, and scheme-appropriate text/border derivation. */
import { describe, expect, it } from 'vitest'
import { buildCustomTokenPairs } from '../src/custom-tokens.ts'
import type { CustomSkinColors } from '../src/skin-settings.ts'

/** Relative luminance (0..1) of a hex color, WCAG-style. */
function luminance(hex: string): number {
  const int = Number.parseInt(hex.slice(1), 16)
  const channels = [(int >> 16) & 0xff, (int >> 8) & 0xff, int & 0xff].map((channel) => {
    const s = channel / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!
}

const LIGHT: CustomSkinColors = { scheme: 'light', accent: '#0e7490', bgBase: '#eef3f9' }
const DARK: CustomSkinColors = { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' }

describe('buildCustomTokenPairs', () => {
  it('covers every alias/specific token with a light and a dark value', () => {
    const pairs = buildCustomTokenPairs(LIGHT)
    expect(Object.keys(pairs).length).toBeGreaterThan(20)
    for (const [name, modes] of Object.entries(pairs)) {
      expect(name.startsWith('--')).toBe(true)
      expect(typeof modes.light).toBe('string')
      expect(typeof modes.dark).toBe('string')
      expect(modes.light.length).toBeGreaterThan(0)
      expect(modes.dark.length).toBeGreaterThan(0)
    }
  })

  it('is deterministic for the same inputs', () => {
    expect(buildCustomTokenPairs(LIGHT)).toEqual(buildCustomTokenPairs(LIGHT))
  })

  it('maps the accent into the brand and business tokens', () => {
    const pairs = buildCustomTokenPairs(LIGHT)
    expect(pairs['--dsw-alias-brand-primary']).toEqual({ light: LIGHT.accent, dark: LIGHT.accent })
    expect(pairs['--dsw-alias-button-primary-fill']).toEqual({ light: LIGHT.accent, dark: LIGHT.accent })
    expect(pairs['--dsw-alias-state-business-primary']).toEqual({ light: LIGHT.accent, dark: LIGHT.accent })
  })

  it('derives dark-mode text lighter than light-mode text and uses the base for surfaces', () => {
    const pairs = buildCustomTokenPairs(LIGHT)
    const lightLabel = pairs['--dsw-alias-label-primary']!.light
    const darkLabel = pairs['--dsw-alias-label-primary']!.dark
    expect(luminance(darkLabel)).toBeGreaterThan(luminance(lightLabel))
    expect(pairs['--dsw-alias-bg-base']).toEqual({ light: LIGHT.bgBase, dark: LIGHT.bgBase })
    expect(pairs['--dsw-alias-border-l1']).toEqual({ light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.06)' })
  })

  it('generates an independent set for dark inputs', () => {
    const pairs = buildCustomTokenPairs(DARK)
    expect(pairs['--dsw-alias-brand-primary']).toEqual({ light: DARK.accent, dark: DARK.accent })
    expect(pairs['--dsw-alias-bg-base']).toEqual({ light: DARK.bgBase, dark: DARK.bgBase })
    expect(luminance(pairs['--dsw-alias-label-primary']!.dark)).toBeGreaterThan(0.5)
  })
})
