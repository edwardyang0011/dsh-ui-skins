/** `settings.skins` namespace dictionaries (the Skin row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'skins.title': '皮肤',
  'skins.default': '默认',
  'skins.ocean': '蔚蓝',
  'skins.sakura': '樱花',
  'skins.forest': '松林',
  'skins.midnight': '深空',
  'skins.custom': '自定义',
  'skins.custom.schemeLight': '浅色',
  'skins.custom.schemeDark': '深色',
  'skins.custom.accent': '主色',
  'skins.custom.background': '背景',
} satisfies Record<string, string>

/** The settings.skins namespace key union. */
export type SkinKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'skins.title': 'Skins',
  'skins.default': 'Default',
  'skins.ocean': 'Ocean',
  'skins.sakura': 'Sakura',
  'skins.forest': 'Forest',
  'skins.midnight': 'Midnight',
  'skins.custom': 'Custom',
  'skins.custom.schemeLight': 'Light',
  'skins.custom.schemeDark': 'Dark',
  'skins.custom.accent': 'Accent',
  'skins.custom.background': 'Background',
} satisfies Record<SkinKey, string>
