# @deepseek-ai/dsh-client-ui-skins

[English](README.md) | 中文

换肤插件（Skin plugin）：在 ui-theme 服务上把预设配色皮肤注册为别名令牌主题，拥有持久化的 `ui-skins.skin` 偏好，并把「皮肤」行注册进设置页「通用」分区（紧挨着「外观」行）。

每个预设皮肤是一个 `ThemeDefinition`（`{ id, colorScheme, tokens }`），通过 `ctx.theme.register` 注册——即主题注册表认可的第三方扩展点。主题 presenter 把合成后的令牌以内联 CSS 变量写到 `body` 上，因此皮肤复用了整套 `--dsw-*` 机制（调色板切换、`theme/change` 快照、meta theme-color），无需改动任何样式表。

内置的「外观」行仍是偏好权威。插件镜像 `theme/change`，并让持久化皮肤 id 与当前生效的偏好保持一致：

- 选择某个预设皮肤会把偏好切到该皮肤 id，并把它持久化到 `ui-skins.skin` 下；
- 「默认」选项恢复切换皮肤时捕获的内置偏好（没有捕获时回落为 `system`）；
- 操作「外观」行（内置偏好胜出）会清除持久化皮肤，因此两行不会漂移——后写者胜。

持久化 schema（`ui-skins`）：`skin` ∈ `default | ocean | sakura | forest | midnight`，默认 `default`。

预设皮肤：

| id | 配色方案 | 色系 |
| --- | --- | --- |
| `ocean` | 浅色 | 蓝绿海洋：海面蓝白底、深青色主色 |
| `sakura` | 浅色 | 樱花粉：樱粉白底、玫红主色 |
| `forest` | 深色 | 松林绿：墨绿黑底、翠绿主色 |
| `midnight` | 深色 | 深空紫：紫黑底、淡紫主色 |

色块（swatch）外观颜色在 `SkinRow.module.css` 中；`src/skins.ts` 中的令牌表才是主题值本身。

## Install

从本仓库安装该包（已提交预构建的 `lib/`）：

```sh
pnpm add github:<owner>/<repo>
```

然后在你的 DSH profile patch —— `$DSH_HOME/profiles/...` 下的 `cordis.patch.yml` —— 中注册该行：

```yaml
- id: ui-skins
  name: '@deepseek-ai/dsh-client-ui-skins'
```

重启 `dsh web`，在 设置 → 通用 中选择皮肤。peer 依赖与已发布的 `0.1.0-rc.5` dsh 家族版本一致。

## Model Experience

None, as skins are a browser-side preference.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **皮肤是主题覆盖而非完整主题**——每个皮肤覆盖一组精选的别名令牌；未覆盖的值保持基础调色板，因此皮肤不会重新定义每一个表面。
- **每个皮肤固定一种配色方案**——主题注册表为每个已注册主题固定 `colorScheme`，因此皮肤要么是浅色要么是深色，而不是随系统自适应。
