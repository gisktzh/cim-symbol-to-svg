import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTransparencyAnimationElement } from '@/cim/animations/animation-transparency'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { createEl } from '@/utils/svg-el'

describe('getTransparencyAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animate element with correct attributes', () => {
    const animation = {
      toTransparency: 0.3,
    } as unknown as __esri.CIMSymbolAnimationTransparency

    const el = getTransparencyAnimationElement(animation) as SVGElement

    expect(createEl).toHaveBeenCalledWith('animate')
    expect(el.tagName).toBe('animate')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('attributeName')).toBe('opacity')
    expect(el.getAttribute('from')).toBe('1')
    expect(el.getAttribute('to')).toBe('0.7') // 1 - 0.3
  })

  it('defaults to 0 transparency if not defined', () => {
    const animation = {} as unknown as __esri.CIMSymbolAnimationTransparency

    const el = getTransparencyAnimationElement(animation) as SVGElement

    expect(el.getAttribute('to')).toBe('1') // 1 - 0
  })

  it('handles full transparency', () => {
    const animation = {
      toTransparency: 1,
    } as unknown as __esri.CIMSymbolAnimationTransparency

    const el = getTransparencyAnimationElement(animation) as SVGElement

    expect(el.getAttribute('to')).toBe('0') // 1 - 1
  })
})
