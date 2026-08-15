window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-skins",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region src/skins.ts
		/** Registrable skin ids (built-in preference ids and `system` are reserved). */
		const SKIN_IDS = [
			"ocean",
			"sakura",
			"forest",
			"midnight"
		];
		/** All preset skins in picker order (registration order). */
		const SKINS = [
			{
				id: "ocean",
				colorScheme: "light",
				labelKey: "skins.ocean",
				description: "浅色蓝绿色系：海面蓝白底、深青色主色。",
				tokens: {
					"--dsw-alias-bg-base": "#eef3f9",
					"--dsw-alias-bg-layer-1": "#f6fafd",
					"--dsw-alias-bg-layer-2": "#edf3f9",
					"--dsw-alias-bg-layer-3": "#e3ecf5",
					"--dsw-alias-bg-overlay": "#f4f9fd",
					"--dsw-alias-bg-module-platform": "#e9f0f8",
					"--dsw-alias-border-l1": "rgba(19, 47, 79, 0.08)",
					"--dsw-alias-border-l2": "rgba(19, 47, 79, 0.14)",
					"--dsw-alias-border-l3": "rgba(19, 47, 79, 0.18)",
					"--dsw-alias-label-primary": "#123049",
					"--dsw-alias-label-secondary": "#41607c",
					"--dsw-alias-label-tertiary": "#6b87a0",
					"--dsw-alias-label-caption": "#6b87a0",
					"--dsw-alias-label-dimmed": "#8fa6ba",
					"--dsw-alias-brand-primary": "#0e7490",
					"--dsw-alias-brand-text": "#0e7490",
					"--dsw-alias-button-primary-fill": "#0e7490",
					"--dsw-alias-button-primary-hover": "#155e75",
					"--dsw-alias-button-info-fill": "#0e7490",
					"--dsw-alias-button-info-hover": "#155e75",
					"--dsw-alias-state-business-primary": "#0e7490",
					"--dsw-alias-state-business-tertiary": "#cfe8f2",
					"--dsw-alias-state-success-primary": "#0f9d6e",
					"--dsw-alias-state-error-primary": "#d64545",
					"--dsw-alias-state-warn-primary": "#e08a00",
					"--dsw-specific-sidebar-fill": "#e6eef7",
					"--dsw-specific-sidebar-nav-item-active": "#dbe7f2",
					"--dsw-specific-sidebar-nav-item-hover": "#eef4fa",
					"--dsw-specific-sidebar-nav-item-active-accent": "#bcd9ea",
					"--dsw-specific-bubble": "#e3eef7",
					"--dsw-specific-bubble-highlight": "#d3e6f3",
					"--dsw-specific-input-major": "#f6fafd",
					"--dsw-specific-menu": "#e3ecf5",
					"--dsw-specific-selector": "#e9f0f8",
					"--dsw-specific-tip": "#eef4fa",
					"--dsw-alias-markdown-code-block": "#f1f6fb",
					"--dsw-alias-markdown-code-block-banner": "#e9f0f8",
					"--dsw-alias-markdown-inline-code": "#e3eef7",
					"--dsw-alias-scrollbar-bg-l1": "#d5dde6",
					"--dsw-alias-scrollbar-hover-l1": "#b9c4d0"
				}
			},
			{
				id: "sakura",
				colorScheme: "light",
				labelKey: "skins.sakura",
				description: "浅色粉紫系：樱粉白底、玫红主色。",
				tokens: {
					"--dsw-alias-bg-base": "#fbf3f5",
					"--dsw-alias-bg-layer-1": "#fefafb",
					"--dsw-alias-bg-layer-2": "#f9eef1",
					"--dsw-alias-bg-layer-3": "#f5e6ea",
					"--dsw-alias-bg-overlay": "#fff8fa",
					"--dsw-alias-bg-module-platform": "#f7ebee",
					"--dsw-alias-border-l1": "rgba(122, 41, 70, 0.08)",
					"--dsw-alias-border-l2": "rgba(122, 41, 70, 0.14)",
					"--dsw-alias-border-l3": "rgba(122, 41, 70, 0.18)",
					"--dsw-alias-label-primary": "#4a2c38",
					"--dsw-alias-label-secondary": "#7d5564",
					"--dsw-alias-label-tertiary": "#a27c89",
					"--dsw-alias-label-caption": "#a27c89",
					"--dsw-alias-label-dimmed": "#c0a1ac",
					"--dsw-alias-brand-primary": "#c2416c",
					"--dsw-alias-brand-text": "#c2416c",
					"--dsw-alias-button-primary-fill": "#c2416c",
					"--dsw-alias-button-primary-hover": "#a1335a",
					"--dsw-alias-button-info-fill": "#c2416c",
					"--dsw-alias-button-info-hover": "#a1335a",
					"--dsw-alias-state-business-primary": "#c2416c",
					"--dsw-alias-state-business-tertiary": "#f6dbe4",
					"--dsw-alias-state-success-primary": "#0f9d6e",
					"--dsw-alias-state-error-primary": "#d64545",
					"--dsw-alias-state-warn-primary": "#e08a00",
					"--dsw-specific-sidebar-fill": "#f7e9ed",
					"--dsw-specific-sidebar-nav-item-active": "#f3dfe6",
					"--dsw-specific-sidebar-nav-item-hover": "#fbeef2",
					"--dsw-specific-sidebar-nav-item-active-accent": "#ecc3d1",
					"--dsw-specific-bubble": "#fceef2",
					"--dsw-specific-bubble-highlight": "#f8dfe7",
					"--dsw-specific-input-major": "#fefafb",
					"--dsw-specific-menu": "#f5e6ea",
					"--dsw-specific-selector": "#f7ebee",
					"--dsw-specific-tip": "#fbeef2",
					"--dsw-alias-markdown-code-block": "#fcf2f5",
					"--dsw-alias-markdown-code-block-banner": "#f7e9ed",
					"--dsw-alias-markdown-inline-code": "#fceef2",
					"--dsw-alias-scrollbar-bg-l1": "#ecd9df",
					"--dsw-alias-scrollbar-hover-l1": "#dbbcc7"
				}
			},
			{
				id: "forest",
				colorScheme: "dark",
				labelKey: "skins.forest",
				description: "深色松绿系：墨绿黑底、翠绿主色。",
				tokens: {
					"--dsw-alias-bg-base": "#0c1310",
					"--dsw-alias-bg-layer-1": "#111a15",
					"--dsw-alias-bg-layer-2": "#16221b",
					"--dsw-alias-bg-layer-3": "#1b2a21",
					"--dsw-alias-bg-overlay": "#223029",
					"--dsw-alias-bg-module-platform": "#1b2a21",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.06)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.12)",
					"--dsw-alias-border-l3": "rgba(255, 255, 255, 0.16)",
					"--dsw-alias-label-primary": "#e4efe7",
					"--dsw-alias-label-secondary": "#a8b8ad",
					"--dsw-alias-label-tertiary": "#85978b",
					"--dsw-alias-label-caption": "#85978b",
					"--dsw-alias-label-dimmed": "#6b7d71",
					"--dsw-alias-brand-primary": "#34d399",
					"--dsw-alias-brand-text": "#e4efe7",
					"--dsw-alias-button-primary-fill": "#34d399",
					"--dsw-alias-button-primary-hover": "#4ade80",
					"--dsw-alias-button-info-fill": "#34d399",
					"--dsw-alias-button-info-hover": "#4ade80",
					"--dsw-alias-state-business-primary": "#34d399",
					"--dsw-alias-state-business-tertiary": "#1b3a2c",
					"--dsw-alias-state-success-primary": "#34d399",
					"--dsw-alias-state-error-primary": "#f87171",
					"--dsw-alias-state-warn-primary": "#fbbf24",
					"--dsw-specific-sidebar-fill": "#0a100d",
					"--dsw-specific-sidebar-nav-item-active": "#1b2a21",
					"--dsw-specific-sidebar-nav-item-hover": "#131f18",
					"--dsw-specific-sidebar-nav-item-active-accent": "#20382b",
					"--dsw-specific-bubble": "#15201a",
					"--dsw-specific-bubble-highlight": "#1e3026",
					"--dsw-specific-input-major": "#16221b",
					"--dsw-specific-menu": "#1b2a21",
					"--dsw-specific-selector": "#1b2a21",
					"--dsw-specific-tip": "#16221b",
					"--dsw-alias-markdown-code-block": "#0f1813",
					"--dsw-alias-markdown-code-block-banner": "#131f18",
					"--dsw-alias-markdown-inline-code": "#1b2a21",
					"--dsw-alias-scrollbar-bg-l1": "#2a352e",
					"--dsw-alias-scrollbar-hover-l1": "#3b4a40"
				}
			},
			{
				id: "midnight",
				colorScheme: "dark",
				labelKey: "skins.midnight",
				description: "深色紫蓝系：深空紫黑底、淡紫主色。",
				tokens: {
					"--dsw-alias-bg-base": "#0e0d19",
					"--dsw-alias-bg-layer-1": "#151322",
					"--dsw-alias-bg-layer-2": "#1b1930",
					"--dsw-alias-bg-layer-3": "#211e3a",
					"--dsw-alias-bg-overlay": "#2a2542",
					"--dsw-alias-bg-module-platform": "#211e3a",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.07)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.13)",
					"--dsw-alias-border-l3": "rgba(255, 255, 255, 0.18)",
					"--dsw-alias-label-primary": "#ece8f6",
					"--dsw-alias-label-secondary": "#b7b1cf",
					"--dsw-alias-label-tertiary": "#948db2",
					"--dsw-alias-label-caption": "#948db2",
					"--dsw-alias-label-dimmed": "#756e97",
					"--dsw-alias-brand-primary": "#a78bfa",
					"--dsw-alias-brand-text": "#ece8f6",
					"--dsw-alias-button-primary-fill": "#a78bfa",
					"--dsw-alias-button-primary-hover": "#8b5cf6",
					"--dsw-alias-button-info-fill": "#a78bfa",
					"--dsw-alias-button-info-hover": "#8b5cf6",
					"--dsw-alias-state-business-primary": "#a78bfa",
					"--dsw-alias-state-business-tertiary": "#2c2450",
					"--dsw-alias-state-success-primary": "#34d399",
					"--dsw-alias-state-error-primary": "#f87171",
					"--dsw-alias-state-warn-primary": "#fbbf24",
					"--dsw-specific-sidebar-fill": "#0b0a15",
					"--dsw-specific-sidebar-nav-item-active": "#211e3a",
					"--dsw-specific-sidebar-nav-item-hover": "#191627",
					"--dsw-specific-sidebar-nav-item-active-accent": "#352c5c",
					"--dsw-specific-bubble": "#1a1730",
					"--dsw-specific-bubble-highlight": "#262238",
					"--dsw-specific-input-major": "#1b1930",
					"--dsw-specific-menu": "#211e3a",
					"--dsw-specific-selector": "#211e3a",
					"--dsw-specific-tip": "#1b1930",
					"--dsw-alias-markdown-code-block": "#121021",
					"--dsw-alias-markdown-code-block-banner": "#191627",
					"--dsw-alias-markdown-inline-code": "#211e3a",
					"--dsw-alias-scrollbar-bg-l1": "#2a2642",
					"--dsw-alias-scrollbar-hover-l1": "#3b3557"
				}
			}
		];
		//#endregion
		//#region src/custom-tokens.ts
		const WHITE = [
			255,
			255,
			255
		];
		const INK = [
			11,
			18,
			32
		];
		/** Parse `#rrggbb` into an rgb triple. */
		function hexToRgb(hex) {
			const int = Number.parseInt(hex.slice(1), 16);
			return [
				int >> 16 & 255,
				int >> 8 & 255,
				int & 255
			];
		}
		/** Format an rgb triple as `#rrggbb`. */
		function toHex(rgb) {
			return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
		}
		/** Linear mix toward `b` by `weightB` (0 = pure `a`, 1 = pure `b`). */
		function mix(a, b, weightB) {
			const [ar, ag, ab] = a;
			const [br, bg, bb] = b;
			return [
				ar + (br - ar) * weightB,
				ag + (bg - ag) * weightB,
				ab + (bb - ab) * weightB
			];
		}
		/**
		* Build the token override pair map for one custom color set. Each token
		* carries both palette modes so the theme presenter picks the value matching
		* the custom skin's active color scheme; editing colors only replaces this
		* layer, while switching the scheme re-registers the custom theme id.
		* @param colors - user accent, base background, and chosen palette.
		* @returns token-name to `{ light, dark }` value pairs.
		*/
		function buildCustomTokenPairs(colors) {
			const accent = hexToRgb(colors.accent);
			const base = hexToRgb(colors.bgBase);
			return {
				"--dsw-alias-bg-base": {
					light: colors.bgBase,
					dark: colors.bgBase
				},
				"--dsw-alias-bg-layer-1": {
					light: toHex(mix(base, WHITE, .35)),
					dark: toHex(mix(base, WHITE, .05))
				},
				"--dsw-alias-bg-layer-2": {
					light: toHex(mix(base, WHITE, .55)),
					dark: toHex(mix(base, WHITE, .09))
				},
				"--dsw-alias-bg-layer-3": {
					light: toHex(mix(base, WHITE, .72)),
					dark: toHex(mix(base, WHITE, .13))
				},
				"--dsw-alias-bg-overlay": {
					light: toHex(mix(base, WHITE, .5)),
					dark: toHex(mix(base, WHITE, .16))
				},
				"--dsw-alias-bg-module-platform": {
					light: toHex(mix(base, WHITE, .22)),
					dark: toHex(mix(base, WHITE, .07))
				},
				"--dsw-alias-border-l1": {
					light: "rgba(0, 0, 0, 0.08)",
					dark: "rgba(255, 255, 255, 0.06)"
				},
				"--dsw-alias-border-l2": {
					light: "rgba(0, 0, 0, 0.14)",
					dark: "rgba(255, 255, 255, 0.12)"
				},
				"--dsw-alias-border-l3": {
					light: "rgba(0, 0, 0, 0.18)",
					dark: "rgba(255, 255, 255, 0.16)"
				},
				"--dsw-alias-label-primary": {
					light: toHex(mix(base, INK, .82)),
					dark: toHex(mix(base, WHITE, .85))
				},
				"--dsw-alias-label-secondary": {
					light: toHex(mix(base, INK, .62)),
					dark: toHex(mix(base, WHITE, .6))
				},
				"--dsw-alias-label-tertiary": {
					light: toHex(mix(base, INK, .45)),
					dark: toHex(mix(base, WHITE, .45))
				},
				"--dsw-alias-label-caption": {
					light: toHex(mix(base, INK, .45)),
					dark: toHex(mix(base, WHITE, .45))
				},
				"--dsw-alias-label-dimmed": {
					light: toHex(mix(base, INK, .3)),
					dark: toHex(mix(base, WHITE, .32))
				},
				"--dsw-alias-brand-primary": {
					light: colors.accent,
					dark: colors.accent
				},
				"--dsw-alias-brand-text": {
					light: colors.accent,
					dark: toHex(mix(base, WHITE, .85))
				},
				"--dsw-alias-button-primary-fill": {
					light: colors.accent,
					dark: colors.accent
				},
				"--dsw-alias-button-primary-hover": {
					light: toHex(mix(accent, INK, .18)),
					dark: toHex(mix(accent, WHITE, .14))
				},
				"--dsw-alias-button-info-fill": {
					light: colors.accent,
					dark: colors.accent
				},
				"--dsw-alias-button-info-hover": {
					light: toHex(mix(accent, INK, .18)),
					dark: toHex(mix(accent, WHITE, .14))
				},
				"--dsw-alias-state-business-primary": {
					light: colors.accent,
					dark: colors.accent
				},
				"--dsw-alias-state-business-tertiary": {
					light: toHex(mix(accent, base, .82)),
					dark: toHex(mix(accent, base, .7))
				},
				"--dsw-alias-state-success-primary": {
					light: "#0f9d6e",
					dark: "#34d399"
				},
				"--dsw-alias-state-error-primary": {
					light: "#d64545",
					dark: "#f87171"
				},
				"--dsw-alias-state-warn-primary": {
					light: "#e08a00",
					dark: "#fbbf24"
				},
				"--dsw-specific-sidebar-fill": {
					light: toHex(mix(base, INK, .05)),
					dark: toHex(mix(base, INK, .25))
				},
				"--dsw-specific-sidebar-nav-item-active": {
					light: toHex(mix(base, INK, .1)),
					dark: toHex(mix(base, WHITE, .1))
				},
				"--dsw-specific-sidebar-nav-item-hover": {
					light: toHex(mix(base, INK, .04)),
					dark: toHex(mix(base, WHITE, .05))
				},
				"--dsw-specific-sidebar-nav-item-active-accent": {
					light: toHex(mix(accent, base, .7)),
					dark: toHex(mix(accent, base, .65))
				},
				"--dsw-specific-bubble": {
					light: toHex(mix(accent, base, .86)),
					dark: toHex(mix(accent, base, .82))
				},
				"--dsw-specific-bubble-highlight": {
					light: toHex(mix(accent, base, .74)),
					dark: toHex(mix(accent, base, .68))
				},
				"--dsw-specific-input-major": {
					light: toHex(mix(base, WHITE, .35)),
					dark: toHex(mix(base, WHITE, .07))
				},
				"--dsw-specific-menu": {
					light: toHex(mix(base, WHITE, .72)),
					dark: toHex(mix(base, WHITE, .13))
				},
				"--dsw-specific-selector": {
					light: toHex(mix(base, WHITE, .22)),
					dark: toHex(mix(base, WHITE, .07))
				},
				"--dsw-specific-tip": {
					light: toHex(mix(base, WHITE, .35)),
					dark: toHex(mix(base, WHITE, .05))
				},
				"--dsw-alias-markdown-code-block": {
					light: toHex(mix(base, WHITE, .6)),
					dark: toHex(mix(base, INK, .2))
				},
				"--dsw-alias-markdown-code-block-banner": {
					light: toHex(mix(base, WHITE, .42)),
					dark: toHex(mix(base, INK, .28))
				},
				"--dsw-alias-markdown-inline-code": {
					light: toHex(mix(accent, base, .86)),
					dark: toHex(mix(accent, base, .82))
				},
				"--dsw-alias-scrollbar-bg-l1": {
					light: toHex(mix(base, INK, .14)),
					dark: toHex(mix(base, WHITE, .18))
				},
				"--dsw-alias-scrollbar-hover-l1": {
					light: toHex(mix(base, INK, .22)),
					dark: toHex(mix(base, WHITE, .26))
				}
			};
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/misc.ts
		/** Return true when a value is `null` or `undefined`. */
		function isNullable(value) {
			return value === null || value === void 0;
		}
		/** Return true for non-array object values. */
		function isPlainObject(data) {
			return data && typeof data === "object" && !Array.isArray(data);
		}
		/** Filter object entries and return a new object. */
		function filterKeys(object, filter) {
			return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
		}
		/** Map object values while preserving the original key set. */
		function mapValues(object, transform) {
			return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
		}
		/** Pick selected keys from an object, optionally including `undefined` values. */
		function pick(source, keys, forced) {
			if (!keys) return { ...source };
			const result = {};
			for (const key of keys) if (forced || source[key] !== void 0) result[key] = source[key];
			return result;
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/types.ts
		/** Test values using `instanceof` with a `toStringTag` fallback. */
		function is(type, value) {
			if (arguments.length === 1) return (value) => is(type, value);
			return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
		}
		function isArrayBufferLike(value) {
			return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
		}
		function isArrayBufferSource(value) {
			return isArrayBufferLike(value) || ArrayBuffer.isView(value);
		}
		let Binary;
		(function(_Binary) {
			_Binary.is = isArrayBufferLike;
			_Binary.isSource = isArrayBufferSource;
			function fromSource(source) {
				if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
				else return source;
			}
			_Binary.fromSource = fromSource;
			function toBase64(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("base64");
				let binary = "";
				const bytes = new Uint8Array(source);
				for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
				return btoa(binary);
			}
			_Binary.toBase64 = toBase64;
			function fromBase64(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
				return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
			}
			_Binary.fromBase64 = fromBase64;
			function toHex(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
				return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
			}
			_Binary.toHex = toHex;
			function fromHex(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
				const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
				const buffer = [];
				for (let i = 0; i < hex.length; i += 2) buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
				return Uint8Array.from(buffer).buffer;
			}
			_Binary.fromHex = fromHex;
		})(Binary || (Binary = {}));
		Binary.fromBase64;
		Binary.toBase64;
		Binary.fromHex;
		Binary.toHex;
		/** Deep-clone common JavaScript values while preserving prototypes and cycles. */
		function clone(source, refs = /* @__PURE__ */ new Map()) {
			if (!source || typeof source !== "object") return source;
			if (is("Date", source)) return new Date(source.valueOf());
			if (is("RegExp", source)) return new RegExp(source.source, source.flags);
			if (isArrayBufferLike(source)) return source.slice(0);
			if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
			const cached = refs.get(source);
			if (cached) return cached;
			if (Array.isArray(source)) {
				const result = [];
				refs.set(source, result);
				source.forEach((value, index) => {
					result[index] = Reflect.apply(clone, null, [value, refs]);
				});
				return result;
			}
			const result = Object.create(Object.getPrototypeOf(source));
			refs.set(source, result);
			for (const key of Reflect.ownKeys(source)) {
				const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
				if ("value" in descriptor) descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
				Reflect.defineProperty(result, key, descriptor);
			}
			return result;
		}
		/** Deeply compare arrays, dates, regexps, buffers, and plain object fields. */
		function deepEqual(a, b, strict) {
			if (a === b) return true;
			if (!strict && isNullable(a) && isNullable(b)) return true;
			if (typeof a !== typeof b) return false;
			if (typeof a !== "object") return false;
			if (!a || !b) return false;
			function check(test, then) {
				return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
			}
			return check(Array.isArray, (a, b) => a.length === b.length && a.every((item, index) => deepEqual(item, b[index]))) ?? check(is("Date"), (a, b) => a.valueOf() === b.valueOf()) ?? check(is("RegExp"), (a, b) => a.source === b.source && a.flags === b.flags) ?? check(isArrayBufferLike, (a, b) => {
				if (a.byteLength !== b.byteLength) return false;
				const viewA = new Uint8Array(a);
				const viewB = new Uint8Array(b);
				for (let i = 0; i < viewA.length; i++) if (viewA[i] !== viewB[i]) return false;
				return true;
			}) ?? Object.keys({
				...a,
				...b
			}).every((key) => deepEqual(a[key], b[key], strict));
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/time.ts
		let Time;
		(function(_Time) {
			_Time.millisecond = 1;
			const second = _Time.second = 1e3;
			const minute = _Time.minute = second * 60;
			const hour = _Time.hour = minute * 60;
			const day = _Time.day = hour * 24;
			const week = _Time.week = day * 7;
			let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
			function setTimezoneOffset(offset) {
				timezoneOffset = offset;
			}
			_Time.setTimezoneOffset = setTimezoneOffset;
			function getTimezoneOffset() {
				return timezoneOffset;
			}
			_Time.getTimezoneOffset = getTimezoneOffset;
			function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
				if (typeof date === "number") date = new Date(date);
				if (offset === void 0) offset = timezoneOffset;
				return Math.floor((date.valueOf() / minute - offset) / 1440);
			}
			_Time.getDateNumber = getDateNumber;
			function fromDateNumber(value, offset) {
				const date = new Date(value * day);
				if (offset === void 0) offset = timezoneOffset;
				return new Date(+date + offset * minute);
			}
			_Time.fromDateNumber = fromDateNumber;
			const numeric = /\d+(?:\.\d+)?/.source;
			const timeRegExp = new RegExp(`^${[
				"w(?:eek(?:s)?)?",
				"d(?:ay(?:s)?)?",
				"h(?:our(?:s)?)?",
				"m(?:in(?:ute)?(?:s)?)?",
				"s(?:ec(?:ond)?(?:s)?)?"
			].map((unit) => `(${numeric}${unit})?`).join("")}$`);
			function parseTime(source) {
				const capture = timeRegExp.exec(source);
				if (!capture) return 0;
				return (parseFloat(capture[1]) * week || 0) + (parseFloat(capture[2]) * day || 0) + (parseFloat(capture[3]) * hour || 0) + (parseFloat(capture[4]) * minute || 0) + (parseFloat(capture[5]) * second || 0);
			}
			_Time.parseTime = parseTime;
			function parseDate(date) {
				const parsed = parseTime(date);
				if (parsed) date = Date.now() + parsed;
				else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
				else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
				return date ? new Date(date) : /* @__PURE__ */ new Date();
			}
			_Time.parseDate = parseDate;
			function format(ms) {
				const abs = Math.abs(ms);
				if (abs >= day - hour / 2) return Math.round(ms / day) + "d";
				else if (abs >= hour - minute / 2) return Math.round(ms / hour) + "h";
				else if (abs >= minute - second / 2) return Math.round(ms / minute) + "m";
				else if (abs >= second) return Math.round(ms / second) + "s";
				return ms + "ms";
			}
			_Time.format = format;
			function toDigits(source, length = 2) {
				return source.toString().padStart(length, "0");
			}
			_Time.toDigits = toDigits;
			function template(template, time = /* @__PURE__ */ new Date()) {
				return template.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
			}
			_Time.template = template;
		})(Time || (Time = {}));
		//#endregion
		//#region ../../../vendor/schemastery/src/index.ts
		const kSchema = Symbol.for("schemastery");
		const kValidationError = Symbol.for("ValidationError");
		globalThis.__schemastery_index__ ??= 0;
		globalThis.__schemastery_refs__ = void 0;
		var ValidationError = class extends TypeError {
			options;
			name = "ValidationError";
			constructor(message, options) {
				let prefix = "$";
				for (const segment of options.path || []) if (typeof segment === "string") prefix += "." + segment;
				else if (typeof segment === "number") prefix += "[" + segment + "]";
				else if (typeof segment === "symbol") prefix += `[Symbol(${segment.toString()})]`;
				if (prefix.startsWith(".")) prefix = prefix.slice(1);
				super((prefix === "$" ? "" : `${prefix} `) + message);
				this.options = options;
			}
			static is(error) {
				return !!error?.[kValidationError];
			}
		};
		Object.defineProperty(ValidationError.prototype, kValidationError, { value: true });
		const Schema = function(options) {
			const schema = function(data, options = {}) {
				return Schema.resolve(data, schema, options)[0];
			};
			if (options.refs) {
				const refs = mapValues(options.refs, (options) => new Schema(options));
				const getRef = (uid) => refs[uid];
				for (const key in refs) {
					const options = refs[key];
					options.sKey = getRef(options.sKey);
					options.inner = getRef(options.inner);
					options.list = options.list && options.list.map(getRef);
					options.dict = options.dict && mapValues(options.dict, getRef);
				}
				return refs[options.uid];
			}
			Object.assign(schema, options);
			if (typeof schema.callback === "string") try {
				schema.callback = new Function("return " + schema.callback)();
			} catch {}
			Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
			Object.setPrototypeOf(schema, Schema.prototype);
			schema.meta ||= {};
			schema.toString = schema.toString.bind(schema);
			return schema;
		};
		Schema.prototype = Object.create(Function.prototype);
		Schema.prototype[kSchema] = true;
		Object.defineProperty(Schema.prototype, "~standard", { get() {
			return {
				version: 1,
				vendor: "schemastery",
				validate: (value) => {
					try {
						return { value: Schema.resolve(value, this, {})[0] };
					} catch (error) {
						if (ValidationError.is(error)) return { issues: [{
							message: error.message,
							path: error.options.path
						}] };
						throw error;
					}
				}
			};
		} });
		Schema.ValidationError = ValidationError;
		Schema.prototype.toJSON = function toJSON() {
			if (globalThis.__schemastery_refs__) {
				globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
				return this.uid;
			}
			globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
			globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
			const result = {
				uid: this.uid,
				refs: globalThis.__schemastery_refs__
			};
			globalThis.__schemastery_refs__ = void 0;
			return result;
		};
		Schema.prototype.set = function set(key, value) {
			this.dict[key] = value;
			return this;
		};
		Schema.prototype.push = function push(value) {
			this.list.push(value);
			return this;
		};
		function mergeDesc(original, messages) {
			const result = typeof original === "string" ? { "": original } : { ...original };
			for (const locale in messages) {
				const value = messages[locale];
				if (value?.$description || value?.$desc) result[locale] = value.$description || value.$desc;
				else if (typeof value === "string") result[locale] = value;
			}
			return result;
		}
		function getInner(value) {
			return value?.$value ?? value?.$inner;
		}
		function extractKeys(data) {
			return filterKeys(data ?? {}, (key) => !key.startsWith("$"));
		}
		Schema.prototype.i18n = function i18n(messages) {
			const schema = Schema(this);
			const desc = mergeDesc(schema.meta.description, messages);
			if (Object.keys(desc).length) schema.meta.description = desc;
			if (schema.dict) schema.dict = mapValues(schema.dict, (inner, key) => {
				return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
			});
			if (schema.list) schema.list = schema.list.map((inner, index) => {
				return inner.i18n(mapValues(messages, (data = {}) => {
					if (Array.isArray(getInner(data))) return getInner(data)[index];
					if (Array.isArray(data)) return data[index];
					return extractKeys(data);
				}));
			});
			if (schema.inner) schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
				if (getInner(data)) return getInner(data);
				return extractKeys(data);
			}));
			if (schema.sKey) schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
			return schema;
		};
		Schema.prototype.extra = function extra(key, value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		};
		for (const key of [
			"required",
			"disabled",
			"collapse",
			"hidden",
			"loose"
		]) Object.assign(Schema.prototype, { [key](value = true) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		Schema.prototype.deprecated = function deprecated() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "deprecated",
				type: "danger"
			});
			return schema;
		};
		Schema.prototype.experimental = function experimental() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "experimental",
				type: "warning"
			});
			return schema;
		};
		Schema.prototype.pattern = function pattern(regexp) {
			const schema = Schema(this);
			const pattern = pick(regexp, ["source", "flags"]);
			schema.meta = {
				...schema.meta,
				pattern
			};
			return schema;
		};
		Schema.prototype.simplify = function simplify(value) {
			if (deepEqual(value, this.meta.default, this.type === "dict")) return null;
			if (isNullable(value)) return value;
			if (this.type === "object" || this.type === "dict") {
				const result = {};
				for (const key in value) {
					const item = (this.type === "object" ? this.dict[key] : this.inner)?.simplify(value[key]);
					if (this.type === "dict" || !isNullable(item)) result[key] = item;
				}
				if (deepEqual(result, this.meta.default, this.type === "dict")) return null;
				return result;
			} else if (this.type === "array" || this.type === "tuple") {
				const result = [];
				value.forEach((value, index) => {
					const schema = this.type === "array" ? this.inner : this.list[index];
					const item = schema ? schema.simplify(value) : value;
					result.push(item);
				});
				return result;
			} else if (this.type === "intersect") {
				const result = {};
				for (const item of this.list) Object.assign(result, item.simplify(value));
				return result;
			} else if (this.type === "union") for (const schema of this.list) try {
				Schema.resolve(value, schema, {});
				return schema.simplify(value);
			} catch {}
			return value;
		};
		Schema.prototype.toString = function toString(inline) {
			return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
		};
		Schema.prototype.role = function role(role, extra) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				role,
				extra
			};
			return schema;
		};
		for (const key of [
			"default",
			"link",
			"comment",
			"description",
			"max",
			"min",
			"step"
		]) Object.assign(Schema.prototype, { [key](value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		const resolvers = {};
		Schema.extend = function extend(type, resolve) {
			resolvers[type] = resolve;
		};
		Schema.resolve = function resolve(data, schema, options = {}, strict = false) {
			if (!schema) return [data];
			if (options.ignore?.(data, schema)) return [data];
			if (isNullable(data) && schema.type !== "lazy") {
				if (schema.meta.required) throw new ValidationError(`missing required value`, options);
				let current = schema;
				let fallback = schema.meta.default;
				while (current?.type === "intersect" && isNullable(fallback)) {
					current = current.list[0];
					fallback = current?.meta.default;
				}
				if (isNullable(fallback)) return [data];
				data = clone(fallback);
			}
			const callback = resolvers[schema.type];
			if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
			try {
				return callback(data, schema, options, strict);
			} catch (error) {
				if (!schema.meta.loose) throw error;
				return [schema.meta.default];
			}
		};
		Schema.from = function from(source) {
			if (isNullable(source)) return Schema.any();
			else if ([
				"string",
				"number",
				"boolean"
			].includes(typeof source)) return Schema.const(source).required();
			else if (source[kSchema]) return source;
			else if (typeof source === "function") switch (source) {
				case String: return Schema.string().required();
				case Number: return Schema.number().required();
				case Boolean: return Schema.boolean().required();
				case Function: return Schema.function().required();
				default: return Schema.is(source).required();
			}
			else throw new TypeError(`cannot infer schema from ${source}`);
		};
		Schema.lazy = function lazy(builder) {
			const toJSON = () => {
				if (!schema.inner[kSchema]) {
					schema.inner = schema.builder();
					schema.inner.meta = {
						...schema.meta,
						...schema.inner.meta
					};
				}
				return schema.inner.toJSON();
			};
			const schema = new Schema({
				type: "lazy",
				builder,
				inner: { toJSON }
			});
			return schema;
		};
		Schema.natural = function natural() {
			return Schema.number().step(1).min(0);
		};
		Schema.percent = function percent() {
			return Schema.number().step(.01).min(0).max(1).role("slider");
		};
		Schema.date = function date() {
			return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), (value, options) => {
				const date = new Date(value);
				if (isNaN(+date)) throw new ValidationError(`invalid date "${value}"`, options);
				return date;
			}, true)]);
		};
		Schema.regExp = function regExp(flag = "") {
			return Schema.union([Schema.is(RegExp), Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
				try {
					return new RegExp(value, flag);
				} catch (e) {
					throw new ValidationError(e.message, options);
				}
			}, true)]);
		};
		Schema.arrayBuffer = function arrayBuffer(encoding) {
			return Schema.union([
				Schema.is(ArrayBuffer),
				Schema.is(SharedArrayBuffer),
				Schema.transform(Schema.any(), (value, options) => {
					if (Binary.isSource(value)) return Binary.fromSource(value);
					throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
				}, true),
				...encoding ? [Schema.transform(Schema.string(), (value, options) => {
					try {
						return encoding === "base64" ? Binary.fromBase64(value) : Binary.fromHex(value);
					} catch (e) {
						throw new ValidationError(e.message, options);
					}
				}, true)] : []
			]);
		};
		Schema.extend("lazy", (data, schema, options, strict) => {
			if (!schema.inner[kSchema]) {
				schema.inner = schema.builder();
				schema.inner.meta = {
					...schema.meta,
					...schema.inner.meta
				};
			}
			return Schema.resolve(data, schema.inner, options, strict);
		});
		Schema.extend("any", (data) => {
			return [data];
		});
		Schema.extend("never", (data, _, options) => {
			throw new ValidationError(`expected nullable but got ${data}`, options);
		});
		Schema.extend("const", (data, { value }, options) => {
			if (deepEqual(data, value)) return [value];
			throw new ValidationError(`expected ${value} but got ${data}`, options);
		});
		function checkWithinRange(data, meta, description, options, skipMin = false) {
			const { max = Infinity, min = -Infinity } = meta;
			if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
			if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
		}
		Schema.extend("string", (data, { meta }, options) => {
			if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
			if (meta.pattern) {
				const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
				if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
			}
			checkWithinRange(data.length, meta, "string length", options);
			return [data];
		});
		function decimalShift(data, digits) {
			const str = data.toString();
			if (str.includes("e")) return data * Math.pow(10, digits);
			const index = str.indexOf(".");
			if (index === -1) return data * Math.pow(10, digits);
			const frac = str.slice(index + 1);
			const integer = str.slice(0, index);
			if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
			return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
		}
		function isMultipleOf(data, min, step) {
			step = Math.abs(step);
			if (!/^\d+\.\d+$/.test(step.toString())) return (data - min) % step === 0;
			const index = step.toString().indexOf(".");
			const digits = step.toString().slice(index + 1).length;
			return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
		}
		Schema.extend("number", (data, { meta }, options) => {
			if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
			checkWithinRange(data, meta, "number", options);
			const { step } = meta;
			if (step && !isMultipleOf(data, meta.min ?? 0, step)) throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
			return [data];
		});
		Schema.extend("boolean", (data, _, options) => {
			if (typeof data === "boolean") return [data];
			throw new ValidationError(`expected boolean but got ${data}`, options);
		});
		Schema.extend("bitset", (data, { bits, meta }, options) => {
			let value = 0, keys = [];
			if (typeof data === "number") {
				value = data;
				for (const key in bits) if (data & bits[key]) keys.push(key);
			} else if (Array.isArray(data)) {
				keys = data;
				for (const key of keys) {
					if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
					if (key in bits) value |= bits[key];
				}
			} else throw new ValidationError(`expected number or array but got ${data}`, options);
			if (value === meta.default) return [value];
			return [value, keys];
		});
		Schema.extend("function", (data, _, options) => {
			if (typeof data === "function") return [data];
			throw new ValidationError(`expected function but got ${data}`, options);
		});
		Schema.extend("is", (data, { constructor }, options) => {
			if (typeof constructor === "function") {
				if (data instanceof constructor) return [data];
				throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
			} else {
				if (isNullable(data)) throw new ValidationError(`expected ${constructor} but got ${data}`, options);
				let prototype = Object.getPrototypeOf(data);
				while (prototype) {
					if (prototype.constructor?.name === constructor) return [data];
					prototype = Object.getPrototypeOf(prototype);
				}
				throw new ValidationError(`expected ${constructor} but got ${data}`, options);
			}
		});
		function property(data, key, schema, options) {
			try {
				const [value, adapted] = Schema.resolve(data[key], schema, {
					...options,
					path: [...options.path || [], key]
				});
				if (adapted !== void 0) data[key] = adapted;
				return value;
			} catch (e) {
				if (!options?.autofix) throw e;
				delete data[key];
				return schema.meta.default;
			}
		}
		Schema.extend("array", (data, { inner, meta }, options) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			checkWithinRange(data.length, meta, "array length", options, !isNullable(inner.meta.default));
			return [data.map((_, index) => property(data, index, inner, options))];
		});
		Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in data) {
				let rKey;
				try {
					rKey = Schema.resolve(key, sKey, options)[0];
				} catch (error) {
					if (strict) continue;
					throw error;
				}
				result[rKey] = property(data, key, inner, options);
				data[rKey] = data[key];
				if (key !== rKey) delete data[key];
			}
			return [result];
		});
		Schema.extend("tuple", (data, { list }, options, strict) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			const result = list.map((inner, index) => property(data, index, inner, options));
			if (strict) return [result];
			result.push(...data.slice(list.length));
			return [result];
		});
		function merge(result, data) {
			for (const key in data) {
				if (key in result) continue;
				result[key] = data[key];
			}
		}
		Schema.extend("object", (data, { dict }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in dict) {
				const value = property(data, key, dict[key], options);
				if (!isNullable(value) || key in data) result[key] = value;
			}
			if (!strict) merge(result, data);
			return [result];
		});
		Schema.extend("union", (data, { list, toString }, options, strict) => {
			const messages = [];
			for (const inner of list) try {
				return Schema.resolve(data, inner, options, strict);
			} catch (error) {
				messages.push(error);
			}
			throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
		});
		Schema.extend("intersect", (data, { list, toString }, options, strict) => {
			if (!list.length) return [data];
			let result;
			for (const inner of list) {
				const value = Schema.resolve(data, inner, options, true)[0];
				if (isNullable(value)) continue;
				if (isNullable(result)) result = value;
				else if (typeof result !== typeof value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
				else if (typeof value === "object") merge(result ??= {}, value);
				else if (result !== value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
			}
			if (!strict && isPlainObject(data)) merge(result, data);
			return [result];
		});
		Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
			const [result, adapted = data] = Schema.resolve(data, inner, options, true);
			if (preserve) return [callback(result)];
			else return [callback(result), callback(adapted)];
		});
		const formatters = {};
		function defineMethod(name, keys, format) {
			formatters[name] = format;
			Object.assign(Schema, { [name](...args) {
				const schema = new Schema({ type: name });
				keys.forEach((key, index) => {
					switch (key) {
						case "sKey":
							schema.sKey = args[index] ?? Schema.string();
							break;
						case "inner":
							schema.inner = Schema.from(args[index]);
							break;
						case "list":
							schema.list = args[index].map(Schema.from);
							break;
						case "dict":
							schema.dict = mapValues(args[index], Schema.from);
							break;
						case "bits":
							schema.bits = {};
							for (const key in args[index]) {
								if (typeof args[index][key] !== "number") continue;
								schema.bits[key] = args[index][key];
							}
							break;
						case "callback": {
							const callback = schema.callback = args[index];
							callback["toJSON"] ||= () => callback.toString();
							break;
						}
						case "constructor": {
							const constructor = schema.constructor = args[index];
							if (typeof constructor === "function") constructor["toJSON"] ||= () => constructor["name"];
							break;
						}
						default: schema[key] = args[index];
					}
				});
				if (name === "object" || name === "dict") schema.meta.default = {};
				else if (name === "array" || name === "tuple") schema.meta.default = [];
				else if (name === "bitset") schema.meta.default = 0;
				return schema;
			} });
		}
		defineMethod("is", ["constructor"], ({ constructor }) => {
			if (typeof constructor === "function") return constructor.name;
			else return constructor;
		});
		defineMethod("any", [], () => "any");
		defineMethod("never", [], () => "never");
		defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
		defineMethod("string", [], () => "string");
		defineMethod("number", [], () => "number");
		defineMethod("boolean", [], () => "boolean");
		defineMethod("bitset", ["bits"], () => "bitset");
		defineMethod("function", [], () => "function");
		defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
		defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
		defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
		defineMethod("object", ["dict"], ({ dict }) => {
			if (Object.keys(dict).length === 0) return "{}";
			return `{ ${Object.entries(dict).map(([key, inner]) => {
				return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
			}).join(", ")} }`;
		});
		defineMethod("union", ["list"], ({ list }, inline) => {
			const result = list.map(({ toString: format }) => format()).join(" | ");
			return inline ? `(${result})` : result;
		});
		defineMethod("intersect", ["list"], ({ list }) => {
			return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
		});
		defineMethod("transform", [
			"inner",
			"callback",
			"preserve"
		], ({ inner }, isInner) => inner.toString(isInner));
		//#endregion
		//#region src/skin-settings.ts
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
		/** Fallback colors when the editor opens without a persisted custom section. */
		const DEFAULT_CUSTOM = {
			scheme: "light",
			accent: "#0e7490",
			bgBase: "#eef3f9"
		};
		/** Hex color shape accepted at the settings and editor boundaries. */
		const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
		Schema.object({
			[SKIN_FIELD]: Schema.union([
				...SKIN_IDS,
				CUSTOM_SKIN,
				DEFAULT_SKIN
			]).default(DEFAULT_SKIN),
			[CUSTOM_FIELD]: Schema.object({
				scheme: Schema.union(["light", "dark"]),
				accent: Schema.string().pattern(HEX_COLOR),
				bgBase: Schema.string().pattern(HEX_COLOR)
			})
		});
		/**
		* Resolve the durable section into complete custom colors, filling the
		* defaults for an absent or partial section.
		* @param section - the durable section (or none).
		* @returns complete custom colors.
		*/
		function resolveCustom(section) {
			const custom = section?.custom;
			if (custom === void 0) return DEFAULT_CUSTOM;
			return {
				scheme: custom.scheme ?? DEFAULT_CUSTOM.scheme,
				accent: custom.accent ?? DEFAULT_CUSTOM.accent,
				bgBase: custom.bgBase ?? DEFAULT_CUSTOM.bgBase
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region \0dsh-css:/Users/yangdebao/deepseek-harness/packages/client/ui-skins/src/client/SkinRow.module.css.mjs
		const css = "._1mw-4G_group{border-bottom:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:8px;padding:16px 0;display:flex}._1mw-4G_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}._1mw-4G_swatchRow{flex-wrap:wrap;align-items:stretch;gap:8px;display:flex}._1mw-4G_swatchButton{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:12px;flex-direction:column;flex:96px;justify-content:center;align-items:center;gap:6px;padding:12px 8px;font-size:13px;line-height:20px;display:flex}._1mw-4G_swatchButton:hover:not(._1mw-4G_selected){background:var(--dsw-alias-interactive-bg-hover)}._1mw-4G_selected{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}._1mw-4G_swatch{border:1px solid var(--dsw-alias-border-l2);border-radius:50%;width:24px;height:24px}._1mw-4G_swatch[data-skin=default]{background:linear-gradient(135deg,#fff 49%,#1b1b1d 51%)}._1mw-4G_swatch[data-skin=ocean]{background:#0e7490}._1mw-4G_swatch[data-skin=sakura]{background:#c2416c}._1mw-4G_swatch[data-skin=forest]{background:#34d399}._1mw-4G_swatch[data-skin=midnight]{background:#a78bfa}._1mw-4G_swatch[data-skin=custom]{background:conic-gradient(#e11d48,#f59e0b,#10b981,#3b82f6,#8b5cf6,#e11d48)}._1mw-4G_editor{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:12px;flex-direction:column;gap:10px;padding:12px;display:flex}._1mw-4G_schemeRow{gap:8px;display:flex}._1mw-4G_schemeButton{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;flex:1;padding:6px 12px;font-size:13px;line-height:20px}._1mw-4G_schemeButton:hover:not(._1mw-4G_schemeActive){background:var(--dsw-alias-interactive-bg-hover)}._1mw-4G_schemeActive{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-static-neutral-bluish-400)}._1mw-4G_field{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:12px;font-size:13px;line-height:20px;display:flex}._1mw-4G_colorInput{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:6px;width:44px;height:28px;padding:0}";
		const tagId = "@deepseek-ai/dsh-client-ui-skins/SkinRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-skins";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var SkinRow_module_css_default = {
			"title": "_1mw-4G_title",
			"schemeRow": "_1mw-4G_schemeRow",
			"editor": "_1mw-4G_editor",
			"group": "_1mw-4G_group",
			"field": "_1mw-4G_field",
			"selected": "_1mw-4G_selected",
			"swatchButton": "_1mw-4G_swatchButton",
			"swatch": "_1mw-4G_swatch",
			"colorInput": "_1mw-4G_colorInput",
			"swatchRow": "_1mw-4G_swatchRow",
			"schemeButton": "_1mw-4G_schemeButton",
			"schemeActive": "_1mw-4G_schemeActive"
		};
		//#endregion
		//#region src/client/SkinRow.tsx
		/**
		* Skin preference row registered into the General section item slot (same
		* seat as the Appearance row): title + one swatch button per preset skin plus
		* a Default button and a Custom swatch that opens the color editor. Selection
		* follows the theme preference mirror, never the resolved active theme.
		* Registered by this package — the skin feature owns its own settings surface.
		*/
		/** Picker order: Default first, the catalog in registration order, Custom last. */
		const CHOICES = [
			{
				id: DEFAULT_SKIN,
				labelKey: "skins.default"
			},
			...SKINS.map((skin) => ({
				id: skin.id,
				labelKey: skin.labelKey
			})),
			{
				id: CUSTOM_SKIN,
				labelKey: "skins.custom"
			}
		];
		/**
		* Render the Skin row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function SkinRow({ t, setSkin, setCustom, useStore }) {
			const selected = useStore((s) => s.selected);
			const colors = useStore((s) => s.custom) ?? DEFAULT_CUSTOM;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: SkinRow_module_css_default.group,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: SkinRow_module_css_default.title,
						children: t("skins.title")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: SkinRow_module_css_default.swatchRow,
						children: CHOICES.map(({ id, labelKey }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: clsx(SkinRow_module_css_default.swatchButton, selected === id && SkinRow_module_css_default.selected),
							"aria-pressed": selected === id,
							onClick: () => {
								setSkin(id);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: SkinRow_module_css_default.swatch,
								"data-skin": id,
								"aria-hidden": "true"
							}), t(labelKey)]
						}, id))
					}),
					selected === "custom" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: SkinRow_module_css_default.editor,
						"data-testid": "skin-custom-editor",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: SkinRow_module_css_default.schemeRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: clsx(SkinRow_module_css_default.schemeButton, colors.scheme === "light" && SkinRow_module_css_default.schemeActive),
									"aria-pressed": colors.scheme === "light",
									onClick: () => {
										setCustom({
											...colors,
											scheme: "light"
										});
									},
									children: t("skins.custom.schemeLight")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: clsx(SkinRow_module_css_default.schemeButton, colors.scheme === "dark" && SkinRow_module_css_default.schemeActive),
									"aria-pressed": colors.scheme === "dark",
									onClick: () => {
										setCustom({
											...colors,
											scheme: "dark"
										});
									},
									children: t("skins.custom.schemeDark")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: SkinRow_module_css_default.field,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skins.custom.accent") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: SkinRow_module_css_default.colorInput,
									type: "color",
									value: colors.accent,
									onChange: (event) => {
										setCustom({
											...colors,
											accent: event.target.value
										});
									}
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: SkinRow_module_css_default.field,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skins.custom.background") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: SkinRow_module_css_default.colorInput,
									type: "color",
									value: colors.bgBase,
									onChange: (event) => {
										setCustom({
											...colors,
											bgBase: event.target.value
										});
									}
								})]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Skin row slot store: a mirror of the theme service snapshot's preference
		* plus the persisted custom colors. The plugin's apply-world change listener
		* writes the mirror through `sync`; the row face writes custom colors through
		* `setCustom` so a color edit reflects in the editor before the async
		* persistence round-trips.
		*/
		/**
		* Declares the Skin row state and write surface.
		* @returns the store handle.
		*/
		function createSkinRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					selected: "default",
					custom: null,
					revision: -1
				}),
				actions: {
					sync: (d, selected, custom, revision) => {
						if (revision <= d.revision) return;
						d.selected = selected;
						d.custom = custom;
						d.revision = revision;
					},
					setCustom: (d, custom) => {
						d.custom = custom;
					}
				}
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.skins` namespace dictionaries (the Skin row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skins.title": "皮肤",
			"skins.default": "默认",
			"skins.ocean": "蔚蓝",
			"skins.sakura": "樱花",
			"skins.forest": "松林",
			"skins.midnight": "深空",
			"skins.custom": "自定义",
			"skins.custom.schemeLight": "浅色",
			"skins.custom.schemeDark": "深色",
			"skins.custom.accent": "主色",
			"skins.custom.background": "背景"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skins.title": "Skins",
			"skins.default": "Default",
			"skins.ocean": "Ocean",
			"skins.sakura": "Sakura",
			"skins.forest": "Forest",
			"skins.midnight": "Midnight",
			"skins.custom": "Custom",
			"skins.custom.schemeLight": "Light",
			"skins.custom.schemeDark": "Dark",
			"skins.custom.accent": "Accent",
			"skins.custom.background": "Background"
		};
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.skins";
		/** Built-in preference ids owned by the Appearance row (never persisted here). */
		const BUILTIN_PREFERENCES = [
			"light",
			"dark",
			"system"
		];
		/** Narrow a string to a built-in preference id. */
		function isBuiltinPreference(value) {
			return BUILTIN_PREFERENCES.includes(value);
		}
		/** Narrow a string to a catalog skin id. */
		function isSkinId(value) {
			return SKIN_IDS.includes(value);
		}
		/**
		* Required services: the ui-theme service (preference authority + theme
		* registry) plus the settings transport and slots/locale for the row.
		*/
		const inject = [
			"slots",
			"locale",
			"connection",
			"remote",
			"settingsScope",
			"theme"
		];
		/**
		* Client plugin body: register the skins, manage the dynamic custom theme,
		* keep the durable skin preference in agreement with the live theme
		* preference, and register the feature-owned Skin row into the General
		* section's item slot.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			const host = ctx.settingsScope.bind({ namespace: SKIN_SETTINGS_NAMESPACE });
			for (const skin of SKINS) {
				const { id, colorScheme, tokens } = skin;
				ctx.effect(() => ctx.theme.register({
					id,
					colorScheme,
					tokens
				}), `ui-skins: register "${id}"`);
			}
			/** Disposer of the registered `custom` theme (one per color scheme). */
			let customDisposer;
			/** Disposer of the custom token override layer (replaced on every color edit). */
			let customLayer;
			/** Color scheme the registered `custom` theme currently pins. */
			let activeCustomScheme;
			/** True while this plugin re-registers/applies the custom theme, so the
			* mirror's write-back arms do not fight the transient preference resets. */
			let reapplying = false;
			/** Register (or re-register per scheme) the `custom` theme and stack the
			* generated token layer over it, then activate it. Color edits replace only
			* the layer; a scheme flip re-registers the theme's colorScheme. */
			const applyCustom = (colors) => {
				reapplying = true;
				try {
					if (customDisposer === void 0 || activeCustomScheme !== colors.scheme) {
						customDisposer?.();
						customDisposer = ctx.theme.register({
							id: CUSTOM_SKIN,
							colorScheme: colors.scheme,
							tokens: {}
						});
						activeCustomScheme = colors.scheme;
					}
					customLayer?.();
					customLayer = ctx.theme.overrideTokens("ui-skins/custom", buildCustomTokenPairs(colors));
					ctx.theme.setTheme(CUSTOM_SKIN);
				} finally {
					reapplying = false;
				}
			};
			ctx.effect(() => () => {
				customLayer?.();
				customDisposer?.();
			}, "ui-skins: custom theme disposal");
			/** The last skin value this plugin acted on (re-entry guard for adopt). */
			let appliedSkin = DEFAULT_SKIN;
			/** Built-in preference captured when a skin was picked; restored by Default. */
			let fallback;
			/** Adopt the durable skin value: apply it, or restore the captured built-in. */
			const adopt = () => {
				const section = host.getSnapshot().value;
				const skin = section?.skin ?? "default";
				if (skin === appliedSkin) return;
				appliedSkin = skin;
				if (skin === "default") {
					if (fallback !== void 0) {
						const restore = fallback;
						fallback = void 0;
						ctx.theme.setTheme(restore);
					}
					return;
				}
				if (skin === "custom") {
					applyCustom(resolveCustom(section));
					return;
				}
				ctx.theme.setTheme(skin);
			};
			ctx.effect(() => host.subscribe(() => {
				adopt();
			}), "ui-skins: durable skin adoption");
			adopt();
			const store = createSkinRowStore();
			let bound;
			/** Mirror the theme preference into the row store and keep the durable skin
			* value in agreement: a skin (or custom) preference persists its id, a
			* built-in preference (the Appearance row won) clears it and forgets the
			* fallback. */
			const sync = (snapshot) => {
				const section = host.getSnapshot().value;
				const custom = section?.custom === void 0 ? null : resolveCustom(section);
				bound?.sync(snapshot.preference, custom, snapshot.revision);
				if (reapplying) return;
				const preference = snapshot.preference;
				const persisted = section?.skin ?? "default";
				if (isSkinId(preference) || preference === "custom") {
					if (persisted !== preference) host.set(SKIN_FIELD, preference);
					return;
				}
				/* v8 ignore next 4 -- every registrable id is a catalog skin or `custom`
				* (handled above) or the built-in light/dark/system pair; setTheme rejects
				* any other id and the product composition registers no third-party
				* themes, so the false path here is unreachable. */
				if (isBuiltinPreference(preference)) {
					fallback = void 0;
					if (persisted !== "default") host.set(SKIN_FIELD, DEFAULT_SKIN);
				}
			};
			ctx.on("theme/change", sync);
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "ui-skins: settings row dictionaries");
			const injected = (actions) => {
				bound = actions;
				sync(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						if (id !== "default" && id !== "custom" && !isSkinId(id)) throw new Error(`skin "${id}" is not registered`);
						if (id === appliedSkin) return;
						if (id === "default") {
							const restore = fallback ?? "system";
							fallback = void 0;
							appliedSkin = DEFAULT_SKIN;
							ctx.theme.setTheme(restore);
							host.set(SKIN_FIELD, id);
							return;
						}
						const current = ctx.theme.getTheme().preference;
						if (isBuiltinPreference(current)) fallback = current;
						appliedSkin = id;
						if (id === "custom") {
							applyCustom(resolveCustom(host.getSnapshot().value));
							host.set(CUSTOM_FIELD, resolveCustom(host.getSnapshot().value));
						} else ctx.theme.setTheme(id);
						host.set(SKIN_FIELD, id);
					},
					setCustom: (colors) => {
						if (appliedSkin !== "custom") {
							appliedSkin = CUSTOM_SKIN;
							host.set(SKIN_FIELD, CUSTOM_SKIN);
						}
						applyCustom(colors);
						bound?.setCustom(colors);
						host.set(CUSTOM_FIELD, colors);
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, SkinRow));
		}
		//#endregion
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map