import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type SkinKey } from './locales.ts';
export type { SkinRowComponentProps, SkinRowInjected } from './SkinRow.tsx';
export type { SkinRowState } from './settings-store.ts';
export type { SkinKey } from './locales.ts';
/** Namespace owning this feature's settings-row copy. */
export declare const SETTINGS_NS = "settings.skins";
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The Skin settings row's copy. */
        'settings.skins': SkinKey;
    }
}
/**
 * Required services: the ui-theme service (preference authority + theme
 * registry) plus the settings transport and slots/locale for the row.
 */
export declare const inject: string[];
/**
 * Client plugin body: register the skins, keep the durable skin preference in
 * agreement with the live theme preference, and register the feature-owned
 * Skin row into the General section's item slot.
 * @param ctx - client cordis context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map