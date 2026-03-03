import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getColorAnimationElement } from '@/cim/animations/animation-color'

vi.mock('@/utils/color', () => ({
  rgbaArrayToHex: vi.fn(() => '#deadbeef'),
}))

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

import { rgbaArrayToHex } from '@/utils/color'
import { createEl } from '@/utils/svg-el'
import {
  CIMSolidFill,
  CIMSolidStroke,
  CIMSymbolAnimationColor,
} from '@arcgis/core/symbols/cim/types'

describe('getColorAnimationElement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an animate element for CIMSolidFill layers', () => {
    const animation: CIMSymbolAnimationColor = {
      type: 'CIMSymbolAnimationColor',
      toColor: [171, 205, 239, 255],
    }

    const layer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [255, 0, 0, 255],
      enable: true,
    }

    const el = getColorAnimationElement(animation, layer)

    expect(createEl).toHaveBeenCalledWith('animate')
    expect(rgbaArrayToHex).toHaveBeenCalledWith(layer.color)

    expect(el.tagName).toBe('animate')
    expect(el.getAttribute('additive')).toBe('sum')
    expect(el.getAttribute('attributeName')).toBe('fill')
    expect(el.getAttribute('from')).toBe('#deadbeef')
    expect(el.getAttribute('to')).toBe('#deadbeef')
  })

  it('creates an animate element for CIMSolidStroke layers', () => {
    const animation: CIMSymbolAnimationColor = {
      type: 'CIMSymbolAnimationColor',
      toColor: [0, 255, 0, 255],
    }

    const layer: CIMSolidStroke = {
      type: 'CIMSolidStroke',
      color: [0, 0, 255, 255],
      width: 1,
      enable: true,
    }

    const el = getColorAnimationElement(animation, layer)

    expect(el.getAttribute('attributeName')).toBe('stroke')
    expect(el.getAttribute('from')).toBe('#deadbeef')
    expect(el.getAttribute('to')).toBe('#deadbeef')
  })
})
