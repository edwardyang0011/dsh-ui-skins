import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region lib/types/skins.js
/** Registrable skin ids (built-in preference ids and `system` are reserved). */
const SKIN_IDS = [
	"ocean",
	"sakura",
	"forest",
	"midnight"
];
//#endregion
//#region lib/types/skin-settings.js
/** Durable skin preferences stored in the Host user-settings document. */
/** Settings namespace owned by the skin plugin. */
const SKIN_SETTINGS_NAMESPACE = "ui-skins";
/** Field carrying the selected preset skin id (`default` follows the built-in preference). */
const SKIN_FIELD = "skin";
/** Field carrying the custom skin colors (only meaningful while `skin` is `custom`). */
const CUSTOM_FIELD = "custom";
/** Skin value meaning "follow the built-in Appearance preference". */
const DEFAULT_SKIN = "default";
/** Skin value meaning "use the user-defined custom colors". */
const CUSTOM_SKIN = "custom";
/** Hex color shape accepted at the settings and editor boundaries. */
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
/** Durable skin schema; also the wire envelope the browser scope validates against. */
const SkinSettingsSchema = z.object({
	[SKIN_FIELD]: z.union([
		...SKIN_IDS,
		CUSTOM_SKIN,
		DEFAULT_SKIN
	]).default(DEFAULT_SKIN),
	[CUSTOM_FIELD]: z.object({
		scheme: z.union(["light", "dark"]),
		accent: z.string().pattern(HEX_COLOR),
		bgBase: z.string().pattern(HEX_COLOR)
	})
});
//#endregion
//#region lib/types/index.js
/** Host registration for the durable skin preference section. */
/**
* Register the durable skin section when the optional Host settings service is
* composed. The skins themselves are client-side registered themes; this half
* only owns the persisted `skin` field the browser scope validates against.
* @param ctx - Host context that may acquire the settings service.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(settingsNamespace(SKIN_SETTINGS_NAMESPACE), SkinSettingsSchema);
	});
}
//#endregion
export { DEFAULT_SKIN, SKIN_FIELD, SKIN_IDS, SKIN_SETTINGS_NAMESPACE, apply };
