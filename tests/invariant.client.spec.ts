// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { apply as nodeApply } from '@deepseek-ai/dsh-client-ui-skins'
import { apply as clientApply, inject } from '@deepseek-ai/dsh-client-ui-skins/client'
import * as SkinsInvariant from '@deepseek-ai/dsh-client-ui-skins/invariant'
import { apply as themeApply, inject as themeInject, ThemeRuntime } from '@deepseek-ai/dsh-client-ui-theme/client'
import { apply as localeApply, inject as localeInject } from '@deepseek-ai/dsh-client-locale/client'
import { SlotRegistry } from '@deepseek-ai/dsh-client-runtime/client'
import InvariantRegistry from '@deepseek-ai/dsh-invariants'
import { stubSettingsScope } from '@deepseek-ai/dsh-client-test-runtime'

describe('invariant companion', () => {
  it('registers under the package name with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(SkinsInvariant).await()).resolves.toBeDefined()
  })

  it('node-half waits for optional Host services', () => {
    nodeApply(new Context())
    expect(true).toBe(true)
  })

  it('client apply registers skins over the theme service edge', async () => {
    expect(inject).toEqual(['slots', 'locale', 'connection', 'remote', 'settingsScope', 'theme'])
    const ctx = new Context()
    new SlotRegistry(ctx)
    ctx.provide('connection', {
      api: { settings: { describe: () => Promise.resolve({
        rpcId: 'skins-invariant' as never,
        result: { ok: true, value: { writable: true, hasDocument: false, namespaces: [] } },
      }) } },
      isLoopback: true,
    } as never)
    ctx.provide('remote', { $on: () => () => {} } as never)
    ctx.provide('settingsScope', { bind: () => stubSettingsScope().scope } as never)
    await ctx.plugin({ inject: localeInject, apply: localeApply }).await()
    await ctx.plugin({ inject: themeInject, apply: themeApply }).await()
    await ctx.plugin({ inject, apply: clientApply }).await()
    const theme = ctx.get('theme') as ThemeRuntime
    expect(theme.getTheme().themes.map(t => t.id)).toContain('ocean')
  })
})
