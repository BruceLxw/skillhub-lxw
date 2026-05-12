import { describe, expect, it } from 'vitest'
import { getAppTopbarClassName } from './layout-header-style'

describe('getAppTopbarClassName', () => {
  it('keeps the topbar flat before the page starts scrolling', () => {
    expect(getAppTopbarClassName(false)).not.toContain('shadow-[0_1px_0')
  })

  it('adds a subtle drop shadow after the topbar becomes sticky', () => {
    expect(getAppTopbarClassName(true)).toContain('shadow')
  })
})
