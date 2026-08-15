/**
 * Custom-skin token generator: derives the alias-token override pair map from
 * two user colors (accent + base background) plus the chosen base palette.
 * The same recipe family as the preset skins — surfaces tint from the base,
 * accents and bubbles tint from the accent, text and borders come from the
 * scheme — so a two-color input still produces a coherent token set. Pure
 * hex math, no DOM, fully deterministic.
 */
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client';
import type { CustomSkinColors } from './skin-settings.ts';
/**
 * Build the token override pair map for one custom color set. Each token
 * carries both palette modes so the theme presenter picks the value matching
 * the custom skin's active color scheme; editing colors only replaces this
 * layer, while switching the scheme re-registers the custom theme id.
 * @param colors - user accent, base background, and chosen palette.
 * @returns token-name to `{ light, dark }` value pairs.
 */
export declare function buildCustomTokenPairs(colors: CustomSkinColors): ThemeTokenOverrides;
//# sourceMappingURL=custom-tokens.d.ts.map