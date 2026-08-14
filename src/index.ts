/** Host registration for the durable skin preference section. */

import type { Context } from '@deepseek-ai/cordis'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import { SKIN_SETTINGS_NAMESPACE, SkinSettingsSchema } from './skin-settings.ts'

export {
  DEFAULT_SKIN, SKIN_FIELD, SKIN_IDS, SKIN_SETTINGS_NAMESPACE,
  type SkinId, type SkinSettings,
} from './skin-settings.ts'

/**
 * Register the durable skin section when the optional Host settings service is
 * composed. The skins themselves are client-side registered themes; this half
 * only owns the persisted `skin` field the browser scope validates against.
 * @param ctx - Host context that may acquire the settings service.
 */
export function apply(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(settingsNamespace(SKIN_SETTINGS_NAMESPACE), SkinSettingsSchema)
  })
}
