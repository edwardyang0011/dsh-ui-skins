import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { createSkinRowStore } from './settings-store.ts';
/** Injected business face: the skin write (t rides the standard locale seat). */
export interface SkinRowInjected {
    /** Switch the preset skin (`default` restores the built-in Appearance preference). */
    setSkin: (id: string) => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type SkinRowComponentProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createSkinRowStore>> & PropsLocale<'settings.skins'> & SkinRowInjected;
/**
 * Render the Skin row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export declare function SkinRow({ t, setSkin, useStore }: SkinRowComponentProps): import("react").JSX.Element;
//# sourceMappingURL=SkinRow.d.ts.map