/** Durable skin preferences stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'
import { SKIN_IDS } from './skins.ts'

export { SKIN_IDS, type SkinId } from './skins.ts'

/** Settings namespace owned by the skin plugin. */
export const SKIN_SETTINGS_NAMESPACE = 'ui-skins'

/** Field carrying the selected preset skin id (`default` follows the built-in preference). */
export const SKIN_FIELD = 'skin'

/** Field carrying the custom skin colors (only meaningful while `skin` is `custom`). */
export const CUSTOM_FIELD = 'custom'

/** Skin value meaning "follow the built-in Appearance preference". */
export const DEFAULT_SKIN = 'default'

/** Skin value meaning "use the user-defined custom colors". */
export const CUSTOM_SKIN = 'custom'

/** Custom skin colors: one accent, one base background, and the base palette. */
export interface CustomSkinColors {
  /** Base palette this custom skin builds on. */
  scheme: 'light' | 'dark'
  /** Brand/accent color (hex). */
  accent: string
  /** Base background color (hex). */
  bgBase: string
}

/** Fallback colors when the editor opens without a persisted custom section. */
export const DEFAULT_CUSTOM: CustomSkinColors = {
  scheme: 'light',
  accent: '#0e7490',
  bgBase: '#eef3f9',
}

/** Hex color shape accepted at the settings and editor boundaries. */
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

/** Durable skin section shared by the Host schema and the browser scope. */
export interface SkinSettings {
  /** Selected preset skin id, `custom`, or `default`. */
  skin: string
  /** User-defined custom colors (present while `skin` is `custom`). */
  custom?: CustomSkinColors
}

/** Durable skin schema; also the wire envelope the browser scope validates against. */
export const SkinSettingsSchema = z.object({
  [SKIN_FIELD]: z.union([...SKIN_IDS, CUSTOM_SKIN, DEFAULT_SKIN]).default(DEFAULT_SKIN),
  // Object fields are optional by default in schemastery: the custom section
  // stays absent until the user opens the editor, and a partial section (a
  // hand-edited value) validates as-is; resolveCustom fills the defaults.
  [CUSTOM_FIELD]: z.object({
    scheme: z.union(['light', 'dark']),
    accent: z.string().pattern(HEX_COLOR),
    bgBase: z.string().pattern(HEX_COLOR),
  }),
})

/**
 * Resolve the durable section into complete custom colors, filling the
 * defaults for an absent or partial section.
 * @param section - the durable section (or none).
 * @returns complete custom colors.
 */
export function resolveCustom(section: { skin?: string; custom?: Partial<CustomSkinColors> } | undefined): CustomSkinColors {
  const custom = section?.custom
  if (custom === undefined) return DEFAULT_CUSTOM
  return {
    scheme: custom.scheme ?? DEFAULT_CUSTOM.scheme,
    accent: custom.accent ?? DEFAULT_CUSTOM.accent,
    bgBase: custom.bgBase ?? DEFAULT_CUSTOM.bgBase,
  }
}
