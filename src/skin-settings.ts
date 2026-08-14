/** Durable skin preferences stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'
import { SKIN_IDS } from './skins.ts'

export { SKIN_IDS, type SkinId } from './skins.ts'

/** Settings namespace owned by the skin plugin. */
export const SKIN_SETTINGS_NAMESPACE = 'ui-skins'

/** Field carrying the selected preset skin id (`default` follows the built-in preference). */
export const SKIN_FIELD = 'skin'

/** Skin value meaning "follow the built-in Appearance preference". */
export const DEFAULT_SKIN = 'default'

/** Durable skin section shared by the Host schema and the browser scope. */
export interface SkinSettings {
  /** Selected preset skin id or `default`. */
  skin: string
}

/** Durable skin schema; also the wire envelope the browser scope validates against. */
export const SkinSettingsSchema = z.object({
  [SKIN_FIELD]: z.union([...SKIN_IDS, DEFAULT_SKIN]).default(DEFAULT_SKIN),
})
