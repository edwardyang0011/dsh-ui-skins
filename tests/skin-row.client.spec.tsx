// @vitest-environment jsdom
/** SkinRow behavior: Default plus one swatch per preset skin plus Custom with
 * its color editor; selection follows the preference mirror, clicks drive
 * setSkin, and color edits drive setCustom. */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createSnapshotStore, type SessionListState, type WorkspaceListState } from '@deepseek-ai/dsh-client-runtime/client'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-web-react'
import { SkinRow } from '../src/client/SkinRow.tsx'
import type { SkinRowComponentProps } from '../src/client/SkinRow.tsx'
import { createSkinRowStore } from '../src/client/settings-store.ts'
import type { CustomSkinColors } from '../src/skin-settings.ts'

afterEach(cleanup)

const COPY: Record<string, string> = {
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
}

/** Empty global standard-kit hooks (the row reads neither). */
function emptySessions() {
  const store = createSnapshotStore<SessionListState>(
    { ids: [], byId: {}, current: undefined, phase: 'ready', subagentsByParent: {}, jobsBySession: {}, currentAddress: undefined })
  return bindSnapshotSelector(store)
}
function emptyWorkspaces() {
  const store = createSnapshotStore<WorkspaceListState>({
    items: [], archivedSessionIds: [], state: 'idle', phase: 'ready', error: null,
    baselinesReady: true, recentWorkspaceId: undefined,
  })
  return bindSnapshotSelector(store)
}

function mount(selected = 'default', custom: CustomSkinColors | null = null) {
  // Real store instance — the sanctioned zero-machinery path for tests.
  const store = createSkinRowStore().create()
  store.actions.sync(selected, custom, 0)
  const setSkin = vi.fn()
  const setCustom = vi.fn()
  const props: SkinRowComponentProps = {
    useSessions: emptySessions(),
    useWorkspaces: emptyWorkspaces(),
    useStore: bindSnapshotSelector(store),
    actions: store.actions,
    t: (key: string) => COPY[key] ?? key,
    setSkin,
    setCustom,
  }
  render(<SkinRow {...props} />)
  return { store, setSkin, setCustom }
}

const pressed = (name: RegExp): string | null =>
  screen.getByRole('button', { name }).getAttribute('aria-pressed')

describe('SkinRow', () => {
  it('renders the title and all six choices with the selected one pressed', () => {
    mount('sakura')
    expect(screen.getByText('皮肤')).toBeDefined()
    for (const label of ['默认', '蔚蓝', '樱花', '松林', '深空', '自定义']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeDefined()
    }
    expect(pressed(/樱花/)).toBe('true')
    expect(pressed(/默认/)).toBe('false')
  })

  it('click drives setSkin; selection follows the store mirror, not the click echo', () => {
    const b = mount('default')
    fireEvent.click(screen.getByRole('button', { name: /蔚蓝/ }))
    expect(b.setSkin).toHaveBeenCalledWith('ocean')
    // No store write yet: selection is unchanged.
    expect(pressed(/默认/)).toBe('true')
    act(() => { b.store.actions.sync('ocean', null, 1) })
    expect(pressed(/蔚蓝/)).toBe('true')
    expect(pressed(/默认/)).toBe('false')
  })

  it('reveals the color editor only while Custom is selected and drives setCustom', () => {
    const b = mount('custom', { scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })
    expect(screen.getByTestId('skin-custom-editor')).toBeDefined()

    // Scheme toggle: light first (store still dark), then re-render as light
    // and toggle back to dark so both pressed states render and both handlers
    // fire.
    fireEvent.click(screen.getByRole('button', { name: /浅色/ }))
    expect(b.setCustom).toHaveBeenCalledWith({ scheme: 'light', accent: '#a78bfa', bgBase: '#0e0d19' })
    act(() => { b.store.actions.setCustom({ scheme: 'light', accent: '#a78bfa', bgBase: '#0e0d19' }) })
    expect(pressed(/浅色/)).toBe('true')
    expect(pressed(/深色/)).toBe('false')
    fireEvent.click(screen.getByRole('button', { name: /深色/ }))
    expect(b.setCustom).toHaveBeenLastCalledWith({ scheme: 'dark', accent: '#a78bfa', bgBase: '#0e0d19' })

    // Color inputs fire with the edited channel only (scheme now light from
    // the store re-render above).
    const accentInput = screen.getByLabelText('主色') as HTMLInputElement
    fireEvent.change(accentInput, { target: { value: '#ff0000' } })
    expect(b.setCustom).toHaveBeenLastCalledWith({ scheme: 'light', accent: '#ff0000', bgBase: '#0e0d19' })

    const bgInput = screen.getByLabelText('背景') as HTMLInputElement
    fireEvent.change(bgInput, { target: { value: '#ffffff' } })
    expect(b.setCustom).toHaveBeenLastCalledWith({ scheme: 'light', accent: '#a78bfa', bgBase: '#ffffff' })

    // Editor hides once a different choice is selected.
    act(() => { b.store.actions.sync('forest', null, 1) })
    expect(screen.queryByTestId('skin-custom-editor')).toBeNull()
  })

  it('drops stale store syncs at or below the current revision; setCustom writes immediately', () => {
    const { store } = mount('default')
    store.actions.sync('ocean', null, 1)
    expect(store.getSnapshot().selected).toBe('ocean')
    // A late duplicate of the same revision must not regress the mirror.
    store.actions.sync('sakura', null, 1)
    expect(store.getSnapshot().selected).toBe('ocean')
    store.actions.sync('forest', null, 2)
    expect(store.getSnapshot().selected).toBe('forest')
    // The authoritative custom write ignores the revision guard.
    store.actions.setCustom({ scheme: 'dark', accent: '#123456', bgBase: '#000000' })
    expect(store.getSnapshot().custom).toEqual({ scheme: 'dark', accent: '#123456', bgBase: '#000000' })
  })
})
