/**
 * Browser skin registry: registers the preset skins as alias-token themes on
 * the ui-theme service, owns the durable `ui-skins.skin` preference, and
 * registers the Skin row into the settings General section. The theme service
 * remains the single preference authority — this plugin only mirrors it and
 * keeps the persisted skin id in agreement with whatever preference is live,
 * so the Appearance row and the Skin row cannot drift (the last write wins).
 */
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: the ctx.settingsScope Context merge. Cross-plugin collaboration
// goes through the service, never a value import (client bundle purity gate).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the theme service type and the cordis Context augmentation
// that types ctx.theme and the 'theme/change' event.
import type { ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import { SKIN_IDS, SKINS, type SkinId } from '../skins.ts'
import { DEFAULT_SKIN, SKIN_FIELD, SKIN_SETTINGS_NAMESPACE, type SkinSettings } from '../skin-settings.ts'
import { SkinRow, type SkinRowInjected } from './SkinRow.tsx'
import { createSkinRowStore } from './settings-store.ts'
import { en, zh, type SkinKey } from './locales.ts'

export type { SkinRowComponentProps, SkinRowInjected } from './SkinRow.tsx'
export type { SkinRowState } from './settings-store.ts'
export type { SkinKey } from './locales.ts'

/** Namespace owning this feature's settings-row copy. */
export const SETTINGS_NS = 'settings.skins'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The Skin settings row's copy. */
    'settings.skins': SkinKey
  }
}

/** Built-in preference ids owned by the Appearance row (never persisted here). */
const BUILTIN_PREFERENCES = ['light', 'dark', 'system'] as const
type BuiltinPreference = typeof BUILTIN_PREFERENCES[number]

/** Narrow a string to a built-in preference id. */
function isBuiltinPreference(value: string): value is BuiltinPreference {
  return (BUILTIN_PREFERENCES as readonly string[]).includes(value)
}

/** Narrow a string to a catalog skin id. */
function isSkinId(value: string): value is SkinId {
  return (SKIN_IDS as readonly string[]).includes(value)
}

/**
 * Required services: the ui-theme service (preference authority + theme
 * registry) plus the settings transport and slots/locale for the row.
 */
export const inject = ['slots', 'locale', 'connection', 'remote', 'settingsScope', 'theme']

/**
 * Client plugin body: register the skins, keep the durable skin preference in
 * agreement with the live theme preference, and register the feature-owned
 * Skin row into the General section's item slot.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  const host = ctx.settingsScope.bind<SkinSettings>({ namespace: SKIN_SETTINGS_NAMESPACE })

  for (const skin of SKINS) {
    const { id, colorScheme, tokens } = skin
    ctx.effect(
      () => ctx.theme.register({ id, colorScheme, tokens }),
      `ui-skins: register "${id}"`,
    )
  }

  /** The last skin value this plugin acted on (re-entry guard for adopt). */
  let appliedSkin = DEFAULT_SKIN
  /** Built-in preference captured when a skin was picked; restored by Default. */
  let fallback: BuiltinPreference | undefined

  /** Adopt the durable skin value: apply it, or restore the captured built-in. */
  const adopt = (): void => {
    const skin = host.getSnapshot().value?.skin ?? DEFAULT_SKIN
    if (skin === appliedSkin) return
    appliedSkin = skin
    if (skin === DEFAULT_SKIN) {
      if (fallback !== undefined) {
        const restore = fallback
        fallback = undefined
        ctx.theme.setTheme(restore)
      }
      return
    }
    ctx.theme.setTheme(skin)
  }

  ctx.effect(() => host.subscribe(() => { adopt() }), 'ui-skins: durable skin adoption')
  adopt()

  const store = createSkinRowStore()
  let bound: BoundActions<typeof store> | undefined

  /** Mirror the theme preference into the row store and keep the durable skin
   * value in agreement: a skin preference persists its id, a built-in
   * preference (the Appearance row won) clears it and forgets the fallback. */
  const sync = (snapshot: ThemeSnapshot): void => {
    bound?.sync(snapshot.preference, snapshot.revision)
    const preference = snapshot.preference
    const persisted = host.getSnapshot().value?.skin ?? DEFAULT_SKIN
    if (isSkinId(preference)) {
      if (persisted !== preference) void host.set(SKIN_FIELD, preference)
      return
    }
    /* v8 ignore next 4 -- every registrable id is a catalog skin (above) or the
     * built-in light/dark/system pair; setTheme rejects any other id, and the
     * product composition registers no third-party themes, so the false path
     * here is unreachable. */
    if (isBuiltinPreference(preference)) {
      fallback = undefined
      if (persisted !== DEFAULT_SKIN) void host.set(SKIN_FIELD, DEFAULT_SKIN)
    }
  }
  ctx.on('theme/change', sync)

  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), 'ui-skins: settings row dictionaries')

  const injected = (actions: BoundActions<typeof store>): SkinRowInjected => {
    bound = actions
    // Re-sync from the getter so no event is lost between registration and
    // first render (the store's revision guard drops stale duplicates).
    sync(ctx.theme.getTheme())
    return {
      setSkin: (id: string): void => {
        if (id !== DEFAULT_SKIN && !isSkinId(id)) {
          throw new Error(`skin "${id}" is not registered`)
        }
        if (id === appliedSkin) return
        if (id !== DEFAULT_SKIN) {
          const current = ctx.theme.getTheme().preference
          if (isBuiltinPreference(current)) fallback = current
          appliedSkin = id
          ctx.theme.setTheme(id)
        } else {
          // Default: restore the captured built-in preference (or follow the
          // OS scheme when none was captured this session).
          const restore = fallback ?? 'system'
          fallback = undefined
          appliedSkin = DEFAULT_SKIN
          ctx.theme.setTheme(restore)
        }
        void host.set(SKIN_FIELD, id)
      },
    }
  }

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'skin',
    order: 20,
    store,
    locale: SETTINGS_NS,
    inject: injected,
  }, SkinRow))
}
