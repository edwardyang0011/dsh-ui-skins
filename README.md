# @deepseek-ai/dsh-client-ui-skins

English | [中文](README.zh.md)

换肤插件（Skin plugin）: registers preset color skins as alias-token themes on the ui-theme service, owns the durable `ui-skins.skin` preference, and registers a Skin row into the settings General section (next to the Appearance row).

Each preset skin is a `ThemeDefinition` (`{ id, colorScheme, tokens }`) registered through `ctx.theme.register` — the theme registry's sanctioned third-party extension point. The theme presenter applies the composed tokens as inline CSS variables on `body`, so the skins reuse the entire `--dsw-*` machinery (palette switching, `theme/change` snapshots, meta theme-color) without touching any stylesheet.

The built-in Appearance row stays the preference authority. The plugin mirrors `theme/change` and keeps the durable skin id in agreement with whatever preference is live:

- picking a preset skin switches the preference to that skin id and persists it under `ui-skins.skin`;
- the **Default** choice restores the built-in preference captured when the skin was picked (or `system` when none was);
- touching the Appearance row (a built-in preference wins) clears the persisted skin, so the two rows cannot drift — the last write wins.

Durable schema (`ui-skins`): `skin` ∈ `default | custom | ocean | sakura | forest | midnight` (default `default`), plus the optional `custom` colors section (`scheme`, `accent`, `bgBase`).

Presets:

| id | scheme | palette |
| --- | --- | --- |
| `ocean` | light | 蓝绿海洋：海面蓝白底、深青色主色 |
| `sakura` | light | 樱花粉：樱粉白底、玫红主色 |
| `forest` | dark | 松林绿：墨绿黑底、翠绿主色 |
| `midnight` | dark | 深空紫：紫黑底、淡紫主色 |

Swatch chrome colors live in `SkinRow.module.css`; the token maps in `src/skins.ts` are the theme values.

Custom colors: the **自定义 (Custom)** swatch opens an editor (base palette, accent, background) that derives the full token set from two colors via `buildCustomTokenPairs` and stacks it as an `overrideTokens` layer over a registered `custom` theme — editing colors only replaces the layer, switching the palette re-registers the theme. Colors persist under `ui-skins.custom` and re-apply on boot; an Appearance-row write clears the custom skin like any other.

## Install

Install this package from the repository (the prebuilt `lib/` is committed):

```sh
pnpm add github:edwardyang0011/dsh-ui-skins
```

Then register the row in your DSH profile patch — `cordis.patch.yml` under `$DSH_HOME/profiles/...`:

```yaml
- id: ui-skins
  name: '@deepseek-ai/dsh-client-ui-skins'
```

Restart `dsh web` and pick a skin under Settings → General. The peer dependencies match the published `0.1.0-rc.5` dsh family.

**Host prerequisite:** persistence needs the `ui-skins` namespace on the Host API-proxy's Web settings allowlist (`WEB_SETTINGS_NAMESPACES` in dsh-host-apiproxy). Official builds that ship the skin plugin include it; a stock build without it rejects the browser's settings writes with `settings-not-exposed` and every choice resets on refresh.

## Model Experience

None, as skins are a browser-side preference.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **Skins are theme overrides, not full themes** — each skin overrides a curated alias-token set; values absent from the override keep the base palette, so a skin does not re-author every surface.
- **One scheme per skin** — the theme registry pins a `colorScheme` per registered theme, so a skin is either light or dark rather than scheme-aware.
