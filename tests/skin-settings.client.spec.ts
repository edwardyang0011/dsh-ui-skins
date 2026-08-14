/** Durable skin section schema: default value, accepted catalog ids, and
 * rejection of unknown ids. */
import { describe, expect, it } from 'vitest'
import { DEFAULT_SKIN, SKIN_FIELD, SkinSettingsSchema } from '../src/skin-settings.ts'
import { SKIN_IDS } from '../src/skins.ts'

describe('ui-skins durable settings schema', () => {
  it('defaults the skin field to the built-in-following value', () => {
    expect(SkinSettingsSchema(undefined)[SKIN_FIELD]).toBe(DEFAULT_SKIN)
    expect(SkinSettingsSchema({})[SKIN_FIELD]).toBe(DEFAULT_SKIN)
  })

  it('accepts every catalog skin id', () => {
    for (const id of SKIN_IDS) {
      expect(SkinSettingsSchema({ [SKIN_FIELD]: id })[SKIN_FIELD]).toBe(id)
    }
  })

  it('rejects an unknown skin id at the wire boundary', () => {
    expect(() => SkinSettingsSchema({ [SKIN_FIELD]: 'sepia' })).toThrow()
  })
})
