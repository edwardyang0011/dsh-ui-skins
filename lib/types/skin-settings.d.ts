/** Durable skin preferences stored in the Host user-settings document. */
import z from '@deepseek-ai/schemastery';
export { SKIN_IDS, type SkinId } from './skins.ts';
/** Settings namespace owned by the skin plugin. */
export declare const SKIN_SETTINGS_NAMESPACE = "ui-skins";
/** Field carrying the selected preset skin id (`default` follows the built-in preference). */
export declare const SKIN_FIELD = "skin";
/** Field carrying the custom skin colors (only meaningful while `skin` is `custom`). */
export declare const CUSTOM_FIELD = "custom";
/** Skin value meaning "follow the built-in Appearance preference". */
export declare const DEFAULT_SKIN = "default";
/** Skin value meaning "use the user-defined custom colors". */
export declare const CUSTOM_SKIN = "custom";
/** Custom skin colors: one accent, one base background, and the base palette. */
export interface CustomSkinColors {
    /** Base palette this custom skin builds on. */
    scheme: 'light' | 'dark';
    /** Brand/accent color (hex). */
    accent: string;
    /** Base background color (hex). */
    bgBase: string;
}
/** Fallback colors when the editor opens without a persisted custom section. */
export declare const DEFAULT_CUSTOM: CustomSkinColors;
/** Durable skin section shared by the Host schema and the browser scope. */
export interface SkinSettings {
    /** Selected preset skin id, `custom`, or `default`. */
    skin: string;
    /** User-defined custom colors (present while `skin` is `custom`). */
    custom?: CustomSkinColors;
}
/** Durable skin schema; also the wire envelope the browser scope validates against. */
export declare const SkinSettingsSchema: z<Schemastery.ObjectS<{
    skin: z<string, string>;
    custom: z<Schemastery.ObjectS<{
        scheme: z<"light" | "dark", "light" | "dark">;
        accent: z<string, string>;
        bgBase: z<string, string>;
    }>, Schemastery.ObjectT<{
        scheme: z<"light" | "dark", "light" | "dark">;
        accent: z<string, string>;
        bgBase: z<string, string>;
    }>>;
}>, Schemastery.ObjectT<{
    skin: z<string, string>;
    custom: z<Schemastery.ObjectS<{
        scheme: z<"light" | "dark", "light" | "dark">;
        accent: z<string, string>;
        bgBase: z<string, string>;
    }>, Schemastery.ObjectT<{
        scheme: z<"light" | "dark", "light" | "dark">;
        accent: z<string, string>;
        bgBase: z<string, string>;
    }>>;
}>>;
/**
 * Resolve the durable section into complete custom colors, filling the
 * defaults for an absent or partial section.
 * @param section - the durable section (or none).
 * @returns complete custom colors.
 */
export declare function resolveCustom(section: {
    skin?: string;
    custom?: Partial<CustomSkinColors>;
} | undefined): CustomSkinColors;
//# sourceMappingURL=skin-settings.d.ts.map