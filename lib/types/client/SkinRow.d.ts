import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { createSkinRowStore } from './settings-store.ts';
import { type CustomSkinColors } from '../skin-settings.ts';
/** Injected business face: the skin write and the custom-color write (t rides
 * the standard locale seat). */
export interface SkinRowInjected {
    /** Switch the skin (`default` restores the built-in Appearance preference). */
    setSkin: (id: string) => void;
    /** Apply and persist the custom colors (also activates the custom skin). */
    setCustom: (colors: CustomSkinColors) => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type SkinRowComponentProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createSkinRowStore>> & PropsLocale<'settings.skins'> & SkinRowInjected;
/**
 * Render the Skin row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export declare function SkinRow({ t, setSkin, setCustom, useStore }: SkinRowComponentProps): import("react").JSX.Element;
//# sourceMappingURL=SkinRow.d.ts.map