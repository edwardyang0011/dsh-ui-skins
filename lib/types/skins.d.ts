/**
 * Preset skin catalog. Each skin is a registered `ThemeDefinition`: a base
 * color scheme plus alias-token overrides applied by the theme presenter as
 * inline CSS variables on body (values may be plain colors or rgba strings —
 * the presenter writes them verbatim). Swatch chrome colors live in
 * SkinRow.module.css; the token maps here are the theme values.
 */
import type { ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client';
import type { SkinKey } from './client/locales.ts';
/** Registrable skin ids (built-in preference ids and `system` are reserved). */
export declare const SKIN_IDS: readonly ["ocean", "sakura", "forest", "midnight"];
/** One skin id from the catalog. */
export type SkinId = typeof SKIN_IDS[number];
/** One preset skin: theme registration data plus the row's label key. */
export interface SkinDefinition {
    /** Skin id (the setSkin/theme.setTheme argument). */
    id: SkinId;
    /** Base palette this skin builds on; the presenter switches the dark body attribute from it. */
    colorScheme: 'light' | 'dark';
    /** Settings-row label key inside the `settings.skins` dictionary. */
    labelKey: SkinKey;
    /** One-line description (documentation only). */
    description: string;
    /** Alias-token overrides applied as inline CSS variables over the base palette. */
    tokens: ThemeTokens;
}
/** All preset skins in picker order (registration order). */
export declare const SKINS: readonly SkinDefinition[];
//# sourceMappingURL=skins.d.ts.map