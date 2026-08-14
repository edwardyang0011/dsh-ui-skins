/** Skin catalog invariants: registrable ids, palette coverage, label keys,
 * and well-formed token overrides. */
import { describe, expect, it } from 'vitest'
import { SKIN_IDS, SKINS } from '../src/skins.ts'
import { zh } from '../src/client/locales.ts'

describe('ui-skins catalog', () => {
  it('has unique registrable ids that never collide with the built-in theme pair or system', () => {
    const ids = SKINS.map(skin => skin.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(['light', 'dark', 'system']).not.toContain(id)
      expect(SKIN_IDS).toContain(id)
    }
    expect(ids.length).toBeGreaterThan(0)
  })

  it('covers both base palettes', () => {
    const schemes = SKINS.map(skin => skin.colorScheme)
    expect(schemes).toContain('light')
    expect(schemes).toContain('dark')
    for (const scheme of schemes) {
      expect(['light', 'dark']).toContain(scheme)
    }
  })

  it('labels every skin with a real dictionary key', () => {
    for (const skin of SKINS) {
      expect(Object.prototype.hasOwnProperty.call(zh, skin.labelKey)).toBe(true)
    }
  })

  it('declares non-empty alias-token overrides with well-formed CSS variable names', () => {
    for (const skin of SKINS) {
      expect(Object.keys(skin.tokens).length).toBeGreaterThan(0)
      for (const [name, value] of Object.entries(skin.tokens)) {
        expect(name.startsWith('--')).toBe(true)
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
    }
  })
})
