/** ui-skins host half: registers, validates, and disposes the durable skin
 * namespace with its fiber. */
import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it } from 'vitest'
import { SettingsProvider, settingsNamespace, type SettingsNamespace } from '@deepseek-ai/dsh-settings'
import { apply, DEFAULT_SKIN, SKIN_SETTINGS_NAMESPACE } from '@deepseek-ai/dsh-client-ui-skins'

class MemorySettings extends SettingsProvider {
  readonly writable = true
  protected load(): Promise<Record<string, unknown>> { return Promise.resolve({}) }
  protected persist(_ns: SettingsNamespace, _section: Record<string, unknown>): Promise<void> {
    return Promise.resolve()
  }
}

describe('ui-skins host', () => {
  it('registers, validates, and disposes the durable skin namespace with its fiber', async () => {
    const ctx = new Context()
    await ctx.plugin(MemorySettings).await()
    const fiber = ctx.plugin({ apply })
    await fiber.await()
    const ns = settingsNamespace(SKIN_SETTINGS_NAMESPACE)
    // The normalized section materializes the all-optional custom field as an
    // empty object; the browser scope carries raw values (absent stays absent).
    expect(ctx.settings.get(ns)).toEqual({ skin: DEFAULT_SKIN, custom: {} })
    await ctx.settings.update(ns, { skin: 'ocean' })
    expect(ctx.settings.get(ns)).toEqual({ skin: 'ocean', custom: {} })
    await expect(ctx.settings.update(ns, { skin: 'sepia' })).rejects.toThrow()
    await fiber.dispose()
    expect(ctx.settings.describe().map(row => row.ns)).not.toContain(ns)
  })
})
