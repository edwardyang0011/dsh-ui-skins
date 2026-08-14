/**
 * Skin preference row registered into the General section item slot (same
 * seat as the Appearance row): title + one swatch button per preset skin plus
 * a Default button. Selection follows the theme preference mirror, never the
 * resolved active theme. Registered by this package — the skin feature owns
 * its own settings surface.
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { SkinKey } from './locales.ts'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { createSkinRowStore } from './settings-store.ts'
import { DEFAULT_SKIN } from '../skin-settings.ts'
import { SKINS } from '../skins.ts'
import css from './SkinRow.module.css'

/** Injected business face: the skin write (t rides the standard locale seat). */
export interface SkinRowInjected {
  /** Switch the preset skin (`default` restores the built-in Appearance preference). */
  setSkin: (id: string) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type SkinRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createSkinRowStore>>
  & PropsLocale<'settings.skins'> & SkinRowInjected

/** Picker order: Default first, then the catalog in registration order. */
const CHOICES: readonly { id: string; labelKey: SkinKey }[] = [
  { id: DEFAULT_SKIN, labelKey: 'skins.default' },
  ...SKINS.map(skin => ({ id: skin.id, labelKey: skin.labelKey })),
]

/**
 * Render the Skin row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function SkinRow({ t, setSkin, useStore }: SkinRowComponentProps) {
  const selected = useStore(s => s.selected)
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
    </div>
  )
}
