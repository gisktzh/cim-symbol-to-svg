import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMHatchFillTransformer,
  isCIMHatchFill,
} from '@/cim/symbol-layers/cim-hatch-fill'
import * as svgElUtils from '@/utils/svg-el'
import * as cimLineSymbol from '@/cim/symbols/cim-line-symbol'
import { Globals } from '@/index'

describe('CIMHatchFillTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMHatchFill',
    lineSymbol: { type: 'CIMLineSymbol' },
    separation: 5,
    offsetX: 2,
    offsetY: 3,
    rotation: 45,
  } as unknown as __esri.CIMHatchFill

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMHatchFill layer', () => {
    expect(
      isCIMHatchFill({
        type: 'CIMHatchFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMHatchFill({
        type: 'CIMSolidFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should create pattern and transform fill', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const lineSpy = vi.spyOn(cimLineSymbol, 'cimLineSymbolToSvg')
    lineSpy.mockImplementation(() =>
      document.createElementNS('http://www.w3.org/2000/svg', 'line')
    )

    const transformer = new CIMHatchFillTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs.find((a: Attr) => a.name === 'fill')).toBeTruthy()
    expect(attrs.find((a: Attr) => a.name === 'fill')?.value).toMatch(
      /^url\(#.+\)$/
    )

    expect(fakeDefs.length).toBe(1)
    const patternEl = fakeDefs[0]
    expect(patternEl.tagName).toBe('pattern')
    expect(patternEl.getAttribute('patternTransform')).toBe('rotate(45)')

    createElSpy.mockRestore()
    lineSpy.mockRestore()
  })

  it('getSvgElements should return null', () => {
    const transformer = new CIMHatchFillTransformer(fakeLayer, globals)
    expect(transformer.getSvgElements()).toBeNull()
  })
})
