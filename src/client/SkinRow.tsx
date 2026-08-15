/**
 * Skin preference row registered into the General section item slot (same
 * seat as the Appearance row): title + one swatch button per preset skin plus
 * a Default button and a Custom swatch that opens the color editor. Selection
 * follows the theme preference mirror, never the resolved active theme.
 * Registered by this package — the skin feature owns its own settings surface.
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { SkinKey } from './locales.ts'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { createSkinRowStore } from './settings-store.ts'
import { CUSTOM_SKIN, DEFAULT_CUSTOM, DEFAULT_SKIN, type CustomSkinColors } from '../skin-settings.ts'
import { SKINS } from '../skins.ts'
import css from './SkinRow.module.css'

/** Injected business face: the skin write and the custom-color write (t rides
 * the standard locale seat). */
export interface SkinRowInjected {
  /** Switch the skin (`default` restores the built-in Appearance preference). */
  setSkin: (id: string) => void
  /** Apply and persist the custom colors (also activates the custom skin). */
  setCustom: (colors: CustomSkinColors) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type SkinRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createSkinRowStore>>
  & PropsLocale<'settings.skins'> & SkinRowInjected

/** Picker order: Default first, the catalog in registration order, Custom last. */
const CHOICES: readonly { id: string; labelKey: SkinKey }[] = [
  { id: DEFAULT_SKIN, labelKey: 'skins.default' },
  ...SKINS.map(skin => ({ id: skin.id, labelKey: skin.labelKey })),
  { id: CUSTOM_SKIN, labelKey: 'skins.custom' },
]

/**
 * Render the Skin row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function SkinRow({ t, setSkin, setCustom, useStore }: SkinRowComponentProps) {
  const selected = useStore(s => s.selected)
  const custom = useStore(s => s.custom)
  const colors = custom ?? DEFAULT_CUSTOM
  return (
    <div className={css.group}>
      <div className={css.title}>{t('skins.title')}</div>
      <div className={css.swatchRow}>
        {CHOICES.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            className={clsx(css.swatchButton, selected === id && css.selected)}
            aria-pressed={selected === id}
            onClick={() => { setSkin(id) }}
          >
            <span className={css.swatch} data-skin={id} aria-hidden="true" />
            {t(labelKey)}
          </button>
        ))}
      </div>
      {selected === CUSTOM_SKIN && (
        <div className={css.editor} data-testid="skin-custom-editor">
          <div className={css.schemeRow}>
            <button
              type="button"
              className={clsx(css.schemeButton, colors.scheme === 'light' && css.schemeActive)}
              aria-pressed={colors.scheme === 'light'}
              onClick={() => { setCustom({ ...colors, scheme: 'light' }) }}
            >
              {t('skins.custom.schemeLight')}
            </button>
            <button
              type="button"
              className={clsx(css.schemeButton, colors.scheme === 'dark' && css.schemeActive)}
              aria-pressed={colors.scheme === 'dark'}
              onClick={() => { setCustom({ ...colors, scheme: 'dark' }) }}
            >
              {t('skins.custom.schemeDark')}
            </button>
          </div>
          <label className={css.field}>
            <span>{t('skins.custom.accent')}</span>
            <input
              className={css.colorInput}
              type="color"
              value={colors.accent}
              onChange={(event) => { setCustom({ ...colors, accent: event.target.value }) }}
            />
          </label>
          <label className={css.field}>
            <span>{t('skins.custom.background')}</span>
            <input
              className={css.colorInput}
              type="color"
              value={colors.bgBase}
              onChange={(event) => { setCustom({ ...colors, bgBase: event.target.value }) }}
            />
          </label>
        </div>
      )}
    </div>
  )
}
