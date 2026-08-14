// @vitest-environment jsdom
/** SkinRow behavior: Default plus one swatch per preset skin, selection
 * follows the preference mirror, clicks drive setSkin. */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createSnapshotStore, type SessionListState, type WorkspaceListState } from '@deepseek-ai/dsh-client-runtime/client'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-web-react'
import { SkinRow } from '../src/client/SkinRow.tsx'
import type { SkinRowComponentProps } from '../src/client/SkinRow.tsx'
import { createSkinRowStore } from '../src/client/settings-store.ts'

afterEach(cleanup)

const COPY: Record<string, string> = {
  'skins.title': '皮肤',
  'skins.default': '默认',
  'skins.ocean': '蔚蓝',
  'skins.sakura': '樱花',
  'skins.forest': '松林',
  'skins.midnight': '深空',
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

function mount(selected = 'default') {
  // Real store instance — the sanctioned zero-machinery path for tests.
  const store = createSkinRowStore().create()
  store.actions.sync(selected, 0)
  const setSkin = vi.fn()
  const props: SkinRowComponentProps = {
    useSessions: emptySessions(),
    useWorkspaces: emptyWorkspaces(),
    useStore: bindSnapshotSelector(store),
    actions: store.actions,
    t: (key: string) => COPY[key] ?? key,
    setSkin,
  }
  render(<SkinRow {...props} />)
  return { store, setSkin }
}

const pressed = (name: RegExp): string | null =>
  screen.getByRole('button', { name }).getAttribute('aria-pressed')

describe('SkinRow', () => {
  it('renders the title and all five choices with the selected one pressed', () => {
    mount('sakura')
    expect(screen.getByText('皮肤')).toBeDefined()
    for (const label of ['默认', '蔚蓝', '樱花', '松林', '深空']) {
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
    act(() => { b.store.actions.sync('ocean', 1) })
    expect(pressed(/蔚蓝/)).toBe('true')
    expect(pressed(/默认/)).toBe('false')
  })

  it('drops stale store syncs at or below the current revision', () => {
    const { store } = mount('default')
    store.actions.sync('ocean', 1)
    expect(store.getSnapshot().selected).toBe('ocean')
    // A late duplicate of the same revision must not regress the mirror.
    store.actions.sync('sakura', 1)
    expect(store.getSnapshot().selected).toBe('ocean')
    store.actions.sync('forest', 2)
    expect(store.getSnapshot().selected).toBe('forest')
  })
})
