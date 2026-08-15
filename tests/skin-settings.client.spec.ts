/** Durable skin section schema: default value, accepted catalog ids, custom
 * colors, resolution defaults, and rejection of unknown ids or malformed
 * colors. */
import { describe, expect, it } from 'vitest'
import {
  CUSTOM_FIELD, CUSTOM_SKIN, DEFAULT_CUSTOM, DEFAULT_SKIN, SKIN_FIELD, SkinSettingsSchema, resolveCustom,
} from '../src/skin-settings.ts'
import { SKIN_IDS } from '../src/skins.ts'

describe('ui-skins durable settings schema', () => {
  it('defaults the skin field to the built-in-following value', () => {
    expect(SkinSettingsSchema(undefined)[SKIN_FIELD]).toBe(DEFAULT_SKIN)
    expect(SkinSettingsSchema({})[SKIN_FIELD]).toBe(DEFAULT_SKIN)
  })

  it('accepts every catalog skin id and the custom id', () => {
    for (const id of [...SKIN_IDS, CUSTOM_SKIN]) {
      expect(SkinSettingsSchema({ [SKIN_FIELD]: id })[SKIN_FIELD]).toBe(id)
    }
  })

  it('rejects an unknown skin id at the wire boundary', () => {
    expect(() => SkinSettingsSchema({ [SKIN_FIELD]: 'sepia' })).toThrow()
  })

  it('round-trips a complete custom color section and accepts a partial one as-is', () => {
    const full = SkinSettingsSchema({
      [SKIN_FIELD]: CUSTOM_SKIN,
      [CUSTOM_FIELD]: { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' },
    })
    expect(full[CUSTOM_FIELD]).toEqual({ scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })
    // A partial section validates as-is (object fields are optional); the
    // client resolves the missing fields from the defaults.
    const partial = SkinSettingsSchema({ [CUSTOM_FIELD]: { accent: '#123456' } })
    expect(partial[CUSTOM_FIELD]).toEqual({ accent: '#123456' })
  })

  it('rejects malformed custom colors at the wire boundary', () => {
    expect(() => SkinSettingsSchema({ [CUSTOM_FIELD]: { accent: '#12' } })).toThrow()
    expect(() => SkinSettingsSchema({ [CUSTOM_FIELD]: { bgBase: 'white' } })).toThrow()
  })

  it('resolveCustom fills defaults for absent or partial sections', () => {
    expect(resolveCustom(undefined)).toEqual(DEFAULT_CUSTOM)
    expect(resolveCustom({ [SKIN_FIELD]: CUSTOM_SKIN })).toEqual(DEFAULT_CUSTOM)
    expect(resolveCustom({ [SKIN_FIELD]: CUSTOM_SKIN, [CUSTOM_FIELD]: { accent: '#123456' } }))
      .toEqual({ scheme: 'light', accent: '#123456', bgBase: '#eef3f9' })
    expect(resolveCustom({ [SKIN_FIELD]: CUSTOM_SKIN, [CUSTOM_FIELD]: { scheme: 'dark' } }))
      .toEqual({ scheme: 'dark', accent: '#0e7490', bgBase: '#eef3f9' })
    expect(resolveCustom({ [SKIN_FIELD]: CUSTOM_SKIN, [CUSTOM_FIELD]: { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' } }))
      .toEqual({ scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })
  })
})
