/**
 * Skin row slot store: a mirror of the theme service snapshot's preference.
 * The plugin's apply-world change listener is the only writer; the row
 * component reads via props.useStore.
 */
import { type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client';
/** Store state mirrored from the theme snapshot. */
export interface SkinRowState {
    /** The theme preference (`default` shows while a built-in preference is active). */
    selected: string;
    /** Service revision; -1 until first sync so revision 0 lands as a change. */
    revision: number;
}
/** Declared action shape giving the exported factory a stable return type. */
type SkinRowActions = {
    sync: (draft: SkinRowState, selected: string, revision: number) => void;
};
/**
 * Declares the Skin row state and write surface.
 * @returns the store handle.
 */
export declare function createSkinRowStore(): EngineStoreHandle<SkinRowState, SkinRowActions>;
export {};
//# sourceMappingURL=settings-store.d.ts.map