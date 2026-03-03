import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTransparencyAnimationElement } from '@/cim/animations/animation-transparency'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'
import { CIMSymbolAnimationTransparency } from '@arcgis/core/symbols/cim/types'

describe('getTransparencyAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animate element with correct attributes', () => {
    const animation: CIMSymbolAnimationTransparency = {
      type: 'CIMSymbolAnimationTransparency',
      toTransparency: 0.3,
    }

    const el = getTransparencyAnimationElement(animation)

    expect(createEl).toHaveBeenCalledWith('animate')
    expect(el.tagName).toBe('animate')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('attributeName')).toBe('opacity')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('0.7') // 1 - 0.3
  })

  it('handles full transparency', () => {
    const animation: CIMSymbolAnimationTransparency = {
      type: 'CIMSymbolAnimationTransparency',
      toTransparency: 1,
    }

    const el = getTransparencyAnimationElement(animation)

    expect(el.getAttribute('to')).toBe('0') // 1 - 1
  })
})
