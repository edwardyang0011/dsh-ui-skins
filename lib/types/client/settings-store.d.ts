/**
 * Skin row slot store: a mirror of the theme service snapshot's preference
 * plus the persisted custom colors. The plugin's apply-world change listener
 * writes the mirror through `sync`; the row face writes custom colors through
 * `setCustom` so a color edit reflects in the editor before the async
 * persistence round-trips.
 */
import { type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client';
import type { CustomSkinColors } from '../skin-settings.ts';
/** Store state mirrored from the theme snapshot and the durable section. */
export interface SkinRowState {
    /** The theme preference (`default` shows while a built-in preference is active). */
    selected: string;
    /** Persisted custom colors (null while no custom section exists). */
    custom: CustomSkinColors | null;
    /** Service revision; -1 until first sync so revision 0 lands as a change. */
    revision: number;
}
/** Declared action shape giving the exported factory a stable return type. */
type SkinRowActions = {
    /** Mirror the theme snapshot and the durable section (revision-guarded). */
    sync: (draft: SkinRowState, selected: string, custom: CustomSkinColors | null, revision: number) => void;
    /** Authoritative custom-color write from the row face (immediate, unguarded). */
    setCustom: (draft: SkinRowState, custom: CustomSkinColors) => void;
};
/**
 * Declares the Skin row state and write surface.
 * @returns the store handle.
 */
export declare function createSkinRowStore(): EngineStoreHandle<SkinRowState, SkinRowActions>;
export {};
//# sourceMappingURL=settings-store.d.ts.map