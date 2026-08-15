/**
 * Custom-skin token generator: derives the alias-token override pair map from
 * two user colors (accent + base background) plus the chosen base palette.
 * The same recipe family as the preset skins — surfaces tint from the base,
 * accents and bubbles tint from the accent, text and borders come from the
 * scheme — so a two-color input still produces a coherent token set. Pure
 * hex math, no DOM, fully deterministic.
 */
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import type { CustomSkinColors } from './skin-settings.ts'

type Rgb = readonly [number, number, number]

const WHITE: Rgb = [255, 255, 255]
const INK: Rgb = [11, 18, 32]

/** Parse `#rrggbb` into an rgb triple. */
function hexToRgb(hex: string): Rgb {
  const int = Number.parseInt(hex.slice(1), 16)
  return [(int >> 16) & 0xff, (int >> 8) & 0xff, int & 0xff] as const
}

/** Format an rgb triple as `#rrggbb`. */
function toHex(rgb: Rgb): string {
  return `#${rgb.map(channel => Math.round(channel).toString(16).padStart(2, '0')).join('')}`
}

/** Linear mix toward `b` by `weightB` (0 = pure `a`, 1 = pure `b`). */
function mix(a: Rgb, b: Rgb, weightB: number): Rgb {
  const [ar, ag, ab] = a
  const [br, bg, bb] = b
  return [
    ar + (br - ar) * weightB,
    ag + (bg - ag) * weightB,
    ab + (bb - ab) * weightB,
  ] as const
}

/**
 * Build the token override pair map for one custom color set. Each token
 * carries both palette modes so the theme presenter picks the value matching
 * the custom skin's active color scheme; editing colors only replaces this
 * layer, while switching the scheme re-registers the custom theme id.
 * @param colors - user accent, base background, and chosen palette.
 * @returns token-name to `{ light, dark }` value pairs.
 */
export function buildCustomTokenPairs(colors: CustomSkinColors): ThemeTokenOverrides {
  const accent = hexToRgb(colors.accent)
  const base = hexToRgb(colors.bgBase)
  return {
    '--dsw-alias-bg-base': { light: colors.bgBase, dark: colors.bgBase },
    '--dsw-alias-bg-layer-1': { light: toHex(mix(base, WHITE, 0.35)), dark: toHex(mix(base, WHITE, 0.05)) },
    '--dsw-alias-bg-layer-2': { light: toHex(mix(base, WHITE, 0.55)), dark: toHex(mix(base, WHITE, 0.09)) },
    '--dsw-alias-bg-layer-3': { light: toHex(mix(base, WHITE, 0.72)), dark: toHex(mix(base, WHITE, 0.13)) },
    '--dsw-alias-bg-overlay': { light: toHex(mix(base, WHITE, 0.5)), dark: toHex(mix(base, WHITE, 0.16)) },
    '--dsw-alias-bg-module-platform': { light: toHex(mix(base, WHITE, 0.22)), dark: toHex(mix(base, WHITE, 0.07)) },
    '--dsw-alias-border-l1': { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.06)' },
    '--dsw-alias-border-l2': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(255, 255, 255, 0.12)' },
    '--dsw-alias-border-l3': { light: 'rgba(0, 0, 0, 0.18)', dark: 'rgba(255, 255, 255, 0.16)' },
    '--dsw-alias-label-primary': { light: toHex(mix(base, INK, 0.82)), dark: toHex(mix(base, WHITE, 0.85)) },
    '--dsw-alias-label-secondary': { light: toHex(mix(base, INK, 0.62)), dark: toHex(mix(base, WHITE, 0.6)) },
    '--dsw-alias-label-tertiary': { light: toHex(mix(base, INK, 0.45)), dark: toHex(mix(base, WHITE, 0.45)) },
    '--dsw-alias-label-caption': { light: toHex(mix(base, INK, 0.45)), dark: toHex(mix(base, WHITE, 0.45)) },
    '--dsw-alias-label-dimmed': { light: toHex(mix(base, INK, 0.3)), dark: toHex(mix(base, WHITE, 0.32)) },
    '--dsw-alias-brand-primary': { light: colors.accent, dark: colors.accent },
    '--dsw-alias-brand-text': { light: colors.accent, dark: toHex(mix(base, WHITE, 0.85)) },
    '--dsw-alias-button-primary-fill': { light: colors.accent, dark: colors.accent },
    '--dsw-alias-button-primary-hover': { light: toHex(mix(accent, INK, 0.18)), dark: toHex(mix(accent, WHITE, 0.14)) },
    '--dsw-alias-button-info-fill': { light: colors.accent, dark: colors.accent },
    '--dsw-alias-button-info-hover': { light: toHex(mix(accent, INK, 0.18)), dark: toHex(mix(accent, WHITE, 0.14)) },
    '--dsw-alias-state-business-primary': { light: colors.accent, dark: colors.accent },
    '--dsw-alias-state-business-tertiary': { light: toHex(mix(accent, base, 0.82)), dark: toHex(mix(accent, base, 0.7)) },
    '--dsw-alias-state-success-primary': { light: '#0f9d6e', dark: '#34d399' },
    '--dsw-alias-state-error-primary': { light: '#d64545', dark: '#f87171' },
    '--dsw-alias-state-warn-primary': { light: '#e08a00', dark: '#fbbf24' },
    '--dsw-specific-sidebar-fill': { light: toHex(mix(base, INK, 0.05)), dark: toHex(mix(base, INK, 0.25)) },
    '--dsw-specific-sidebar-nav-item-active': { light: toHex(mix(base, INK, 0.1)), dark: toHex(mix(base, WHITE, 0.1)) },
    '--dsw-specific-sidebar-nav-item-hover': { light: toHex(mix(base, INK, 0.04)), dark: toHex(mix(base, WHITE, 0.05)) },
    '--dsw-specific-sidebar-nav-item-active-accent': { light: toHex(mix(accent, base, 0.7)), dark: toHex(mix(accent, base, 0.65)) },
    '--dsw-specific-bubble': { light: toHex(mix(accent, base, 0.86)), dark: toHex(mix(accent, base, 0.82)) },
    '--dsw-specific-bubble-highlight': { light: toHex(mix(accent, base, 0.74)), dark: toHex(mix(accent, base, 0.68)) },
    '--dsw-specific-input-major': { light: toHex(mix(base, WHITE, 0.35)), dark: toHex(mix(base, WHITE, 0.07)) },
    '--dsw-specific-menu': { light: toHex(mix(base, WHITE, 0.72)), dark: toHex(mix(base, WHITE, 0.13)) },
    '--dsw-specific-selector': { light: toHex(mix(base, WHITE, 0.22)), dark: toHex(mix(base, WHITE, 0.07)) },
    '--dsw-specific-tip': { light: toHex(mix(base, WHITE, 0.35)), dark: toHex(mix(base, WHITE, 0.05)) },
    '--dsw-alias-markdown-code-block': { light: toHex(mix(base, WHITE, 0.6)), dark: toHex(mix(base, INK, 0.2)) },
    '--dsw-alias-markdown-code-block-banner': { light: toHex(mix(base, WHITE, 0.42)), dark: toHex(mix(base, INK, 0.28)) },
    '--dsw-alias-markdown-inline-code': { light: toHex(mix(accent, base, 0.86)), dark: toHex(mix(accent, base, 0.82)) },
    '--dsw-alias-scrollbar-bg-l1': { light: toHex(mix(base, INK, 0.14)), dark: toHex(mix(base, WHITE, 0.18)) },
    '--dsw-alias-scrollbar-hover-l1': { light: toHex(mix(base, INK, 0.22)), dark: toHex(mix(base, WHITE, 0.26)) },
  }
}
