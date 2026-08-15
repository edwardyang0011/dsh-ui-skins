/** ui-skins apply wiring: skin registration on the theme service, durable skin
 * adoption, preference agreement between the Skin row and the Appearance row,
 * declaration-aware Skin row registration, and HMR collapse recovery. */
import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it, vi } from 'vitest'
import { SlotRegistry } from '@deepseek-ai/dsh-client-runtime/client'
import { LocaleRuntime } from '@deepseek-ai/dsh-client-locale/client'
import { TestRemote, usePinnedBrowserLanguages } from '@deepseek-ai/dsh-client-test-runtime'
import { SettingsScopeBinder } from '@deepseek-ai/dsh-client-ui-settings/client'
import { apply as themeApply, inject as themeInject } from '@deepseek-ai/dsh-client-ui-theme/client'
import type { ThemeRuntime } from '@deepseek-ai/dsh-client-ui-theme/client'
import { THEME_SETTINGS_NAMESPACE, ThemeSettingsSchema } from '@deepseek-ai/dsh-client-ui-theme/src/theme-settings.ts'
import { apply, inject, SETTINGS_NS } from '@deepseek-ai/dsh-client-ui-skins/client'
import type { SkinRowInjected } from '@deepseek-ai/dsh-client-ui-skins/client'
import { SKIN_SETTINGS_NAMESPACE, SkinSettingsSchema } from '../src/skin-settings.ts'
import { SkinRow } from '../src/client/SkinRow.tsx'
import type { createSkinRowStore } from '../src/client/settings-store.ts'

// The service reads its initial locale from the browser; these specs assert
// the shipped Chinese copy, so they state the browser they assume.
usePinnedBrowserLanguages('zh-CN')

const SLOT = 'settings.general.item'

/** Stand in for the settings shell: declare the General item slot from root. */
function declareItems(slots: SlotRegistry): () => void {
  return slots.register(
    { name: 'root', children: { [SLOT]: { kind: 'list', scope: 'root' } } } as never,
    () => null,
  )
}

/** Mirror the framework's inject choreography: bake a real instance from the
 * declared handle and hand its actions to the entry's inject factory. */
function faceOf(slots: SlotRegistry) {
  const entry = slots.entries(SLOT).find(e => e.component === SkinRow)!
  const handle = entry.store as ReturnType<typeof createSkinRowStore>
  const instance = handle.create()
  const face = (entry.inject as unknown as (a: typeof instance.actions) => SkinRowInjected)(instance.actions)
  return { entry, instance, face }
}

describe('ui-skins apply', () => {
  it('declares the expected service edges', () => {
    expect(inject).toEqual(['slots', 'locale', 'connection', 'remote', 'settingsScope', 'theme'])
  })

  it('registers the skins on the theme service and the localized Skin row', async () => {
    const b = await bench()
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()

    const theme = b.ctx.get('theme') as ThemeRuntime
    expect(theme.getTheme().themes.map(t => t.id)).toEqual(['light', 'dark', 'ocean', 'sakura', 'forest', 'midnight'])
    expect(theme.getTheme().themes.find(t => t.id === 'ocean')?.colorScheme).toBe('light')
    expect(theme.getTheme().themes.find(t => t.id === 'midnight')?.colorScheme).toBe('dark')

    expect(b.locale.bind(SETTINGS_NS)('skins.title')).toBe('皮肤')
    b.locale.setLocale('en')
    expect(b.locale.bind(SETTINGS_NS)('skins.title')).toBe('Skins')

    const entry = b.slots.entries(SLOT).find(e => e.component === SkinRow)!
    expect(entry.options).toMatchObject({ id: 'skin', order: 20 })
    expect(entry.locale).toBe(SETTINGS_NS)
  })

  it('adopts a persisted skin at boot and stays on the built-in preference for default', async () => {
    const withSkin = await bench()
    withSkin.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'ocean'
    declareItems(withSkin.slots)
    await withSkin.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await withSkin.ctx.plugin({ inject, apply }).await()
    const theme = withSkin.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('ocean') })

    const withDefault = await bench()
    withDefault.values[THEME_SETTINGS_NAMESPACE]!.preference = 'dark'
    declareItems(withDefault.slots)
    await withDefault.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await withDefault.ctx.plugin({ inject, apply }).await()
    const darkTheme = withDefault.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(darkTheme.getTheme().preference).toBe('dark') })
  })

  it('routes Skin row writes to the theme service and persists them; Default restores the captured built-in', async () => {
    const b = await bench()
    b.values[THEME_SETTINGS_NAMESPACE]!.preference = 'dark'
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })

    const { instance, face } = faceOf(b.slots)
    face.setSkin('sakura')
    expect(theme.getTheme().preference).toBe('sakura')
    expect(instance.getSnapshot().selected).toBe('sakura')
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('sakura')
    })

    // Picking the active skin again is a no-op.
    face.setSkin('sakura')
    expect(theme.getTheme().preference).toBe('sakura')

    // Skin-to-skin switch keeps the built-in preference captured at the first
    // switch (the current preference is a skin id, not a built-in).
    face.setSkin('forest')
    expect(theme.getTheme().preference).toBe('forest')
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('forest')
    })

    face.setSkin('default')
    expect(theme.getTheme().preference).toBe('dark')
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('default')
    })
  })

  it('restores the captured built-in when the host resets the skin to default', async () => {
    const b = await bench()
    b.values[THEME_SETTINGS_NAMESPACE]!.preference = 'dark'
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })

    const { face } = faceOf(b.slots)
    face.setSkin('sakura')
    expect(theme.getTheme().preference).toBe('sakura')
    // Let both queued skin writes settle so the simulated host reset below is
    // not overwritten by a write that was already in flight.
    await vi.waitFor(() => { expect(b.mutate).toHaveBeenCalledTimes(2) })
    await new Promise(resolve => setTimeout(resolve, 0))

    // A host-side reset back to default (e.g. another window) adopts through
    // the scope and restores the built-in preference captured at the switch.
    b.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'default'
    b.ctx.remote.$dispatch('settings/document-updated', [SKIN_SETTINGS_NAMESPACE, 0])
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })
  })

  it('falls back to system when Default is picked with no built-in captured this session', async () => {
    const b = await bench()
    b.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'ocean'
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('ocean') })

    const { face } = faceOf(b.slots)
    face.setSkin('default')
    expect(theme.getTheme().preference).toBe('system')
  })

  it('keeps a remote browser selection process-local with no persistence writes', async () => {
    const b = await bench(false)
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    const { instance, face } = faceOf(b.slots)
    face.setSkin('midnight')
    expect(theme.getTheme().preference).toBe('midnight')
    expect(instance.getSnapshot().selected).toBe('midnight')
    await Promise.resolve()
    expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('default')
  })

  it('clears the persisted skin when a built-in preference wins (Appearance row)', async () => {
    const b = await bench()
    b.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'forest'
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('forest') })

    theme.setTheme('dark')
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('default')
    })

    // The row mirror follows the preference, not the skin setting.
    const { instance } = faceOf(b.slots)
    expect(instance.getSnapshot().selected).toBe('dark')
  })

  it('picks the custom skin, persists its colors, and Default restores the captured built-in', async () => {
    const b = await bench()
    b.values[THEME_SETTINGS_NAMESPACE]!.preference = 'dark'
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })

    const { instance, face } = faceOf(b.slots)
    face.setSkin('custom')
    expect(theme.getTheme().preference).toBe('custom')
    expect(instance.getSnapshot().selected).toBe('custom')
    const active = theme.getTheme().active
    expect(active.colorScheme).toBe('light')
    expect(active.tokens['--dsw-alias-brand-primary']).toBe('#0e7490')
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('custom')
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.custom).toEqual({ scheme: 'light', accent: '#0e7490', bgBase: '#eef3f9' })
    })

    face.setSkin('default')
    expect(theme.getTheme().preference).toBe('dark')
  })

  it('boots a persisted custom skin from its stored colors', async () => {
    const b = await bench()
    b.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'custom'
    b.values[SKIN_SETTINGS_NAMESPACE]!.custom = { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' }
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    const fiber = b.ctx.plugin({ inject, apply })
    await fiber.await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('custom') })
    const active = theme.getTheme().active
    expect(active.colorScheme).toBe('dark')
    expect(active.tokens['--dsw-alias-brand-primary']).toBe('#a78bfa')
    expect(active.tokens['--dsw-alias-bg-base']).toBe('#0e0d19')

    // Teardown removes the custom theme and its token layer.
    await fiber.dispose()
    expect(theme.getTheme().themes.map(t => t.id)).toEqual(['light', 'dark'])
  })

  it('editing custom colors replaces the token layer, flips the scheme, and persists', async () => {
    const b = await bench()
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime

    const { instance, face } = faceOf(b.slots)
    // A direct color write activates the custom skin even without a prior pick.
    face.setCustom({ scheme: 'light', accent: '#ff0000', bgBase: '#ffffff' })
    expect(theme.getTheme().preference).toBe('custom')
    expect(instance.getSnapshot().custom).toEqual({ scheme: 'light', accent: '#ff0000', bgBase: '#ffffff' })
    expect(theme.getTheme().active.colorScheme).toBe('light')
    expect(theme.getTheme().active.tokens['--dsw-alias-brand-primary']).toBe('#ff0000')
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('custom')
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.custom).toEqual({ scheme: 'light', accent: '#ff0000', bgBase: '#ffffff' })
    })

    // Scheme flip re-registers the theme (dispose + register) with the new palette.
    face.setCustom({ scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })
    expect(theme.getTheme().active.colorScheme).toBe('dark')
    expect(instance.getSnapshot().custom).toEqual({ scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })

    // Back to light exercises the flip-again path.
    face.setCustom({ scheme: 'light', accent: '#123456', bgBase: '#f0f0f0' })
    expect(theme.getTheme().active.colorScheme).toBe('light')
    expect(theme.getTheme().active.tokens['--dsw-alias-brand-primary']).toBe('#123456')

    // Same-scheme edit skips the re-registration and only replaces the layer.
    face.setCustom({ scheme: 'light', accent: '#00aa44', bgBase: '#f0f0f0' })
    expect(theme.getTheme().active.colorScheme).toBe('light')
    expect(theme.getTheme().active.tokens['--dsw-alias-brand-primary']).toBe('#00aa44')
  })

  it('clears a custom skin when a built-in preference wins (Appearance row)', async () => {
    const b = await bench()
    b.values[SKIN_SETTINGS_NAMESPACE]!.skin = 'custom'
    b.values[SKIN_SETTINGS_NAMESPACE]!.custom = { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' }
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('custom') })

    theme.setTheme('dark')
    await vi.waitFor(() => { expect(theme.getTheme().preference).toBe('dark') })
    await vi.waitFor(() => {
      expect(b.values[SKIN_SETTINGS_NAMESPACE]!.skin).toBe('default')
    })
    const { instance } = faceOf(b.slots)
    expect(instance.getSnapshot().selected).toBe('dark')
  })

  it('rejects an unknown skin id through the row face', async () => {
    const b = await bench()
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    const { face } = faceOf(b.slots)
    expect(() => { face.setSkin('sepia') }).toThrow(/skin "sepia" is not registered/)
  })

  it('recovers after an HMR collapse of the declaring entry', async () => {
    const b = await bench()
    const host = declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await b.ctx.plugin({ inject, apply }).await()
    expect(b.slots.entries(SLOT).some(e => e.component === SkinRow)).toBe(true)

    host()
    expect(b.slots.entries(SLOT).some(e => e.component === SkinRow)).toBe(false)

    declareItems(b.slots)
    await Promise.resolve()
    expect(b.slots.entries(SLOT).some(e => e.component === SkinRow)).toBe(true)
  })

  it('teardown removes the row, the dictionaries, and the registered skins', async () => {
    const b = await bench()
    declareItems(b.slots)
    await b.ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    const fiber = b.ctx.plugin({ inject, apply })
    await fiber.await()
    const theme = b.ctx.get('theme') as ThemeRuntime
    expect(theme.getTheme().themes).toHaveLength(6)

    await fiber.dispose()
    expect(b.slots.entries(SLOT).some(e => e.component === SkinRow)).toBe(false)
    expect(theme.getTheme().themes.map(t => t.id)).toEqual(['light', 'dark'])
    // Dictionary disposal: translation falls back to the bare key.
    expect(b.locale.bind(SETTINGS_NS)('skins.title')).toBe('skins.title')
  })
})

async function bench(isLoopback = true) {
  const ctx = new Context()
  await ctx.plugin(SlotRegistry).await()
  const locale = new LocaleRuntime(ctx)
  ctx.provide('locale', locale)
  // Mutable fixture source of truth; every describe/mutate response carries a
  // fresh copy because the scope's snapshot store freezes accepted values.
  const values: Record<string, Record<string, unknown>> = {
    [THEME_SETTINGS_NAMESPACE]: { preference: 'system' },
    [SKIN_SETTINGS_NAMESPACE]: { skin: 'default' },
  }
  const schemas: Record<string, unknown> = {
    [THEME_SETTINGS_NAMESPACE]: ThemeSettingsSchema.toJSON(),
    [SKIN_SETTINGS_NAMESPACE]: SkinSettingsSchema.toJSON(),
  }
  const namespaceOf = (ns: string) => ({
    ns,
    schema: schemas[ns],
    value: { ...values[ns]! },
    applies: 'live' as const,
    secrets: [],
    revision: 0,
  })
  const describe = vi.fn(() => Promise.resolve({
    rpcId: 'skins-describe' as never,
    result: {
      ok: true as const,
      value: {
        writable: true,
        hasDocument: true,
        namespaces: [namespaceOf(THEME_SETTINGS_NAMESPACE), namespaceOf(SKIN_SETTINGS_NAMESPACE)],
      },
    },
  }))
  const mutate = vi.fn((request: { ns: string; ops: { path: string[]; value: unknown }[] }) => {
    for (const op of request.ops) {
      values[request.ns]![op.path[0]!] = op.value
    }
    return Promise.resolve({
      rpcId: 'skins-mutate' as never,
      result: { ok: true as const, value: namespaceOf(request.ns) },
    })
  })
  ctx.provide('connection', { api: { settings: { describe, mutate } }, isLoopback } as never)
  // The settings transport and the forwarded-event port the plugin injects.
  new TestRemote(ctx)
  await ctx.plugin(SettingsScopeBinder).await()
  return { ctx, slots: ctx.get('slots') as SlotRegistry, locale, values, describe, mutate }
}
