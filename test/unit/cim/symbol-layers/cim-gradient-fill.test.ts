import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMGradientFillTransformer,
  isCIMGradientFill,
} from '@/cim/symbol-layers/cim-gradient-fill'
import * as svgElUtils from '@/utils/svg-el'
import type { Globals } from '@/index'

describe('CIMGradientFillTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMGradientFill',
    colorRamp: {
      type: 'CIMLinearContinuousColorRamp',
      fromColor: [0, 0, 0, 1],
      toColor: [255, 255, 255, 1],
    },
    gradientMethod: 'Linear',
    gradientSize: 100,
    gradientSizeUnits: 'Relative',
  } as unknown as __esri.CIMGradientFill

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMGradientFill layer', () => {
    expect(
      isCIMGradientFill({
        type: 'CIMGradientFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMGradientFill({
        type: 'CIMSolidFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should transform gradient and fill', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const transformer = new CIMGradientFillTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs[0].name).toBe('fill')
    expect(attrs[0].value).toMatch(/^url\(#.+\)$/)
    expect(fakeDefs.length).toBeGreaterThan(0)

    createElSpy.mockRestore()
  })

  it('getSvgElements should return null', () => {
    const transformer = new CIMGradientFillTransformer(fakeLayer, globals)
    expect(transformer.getSvgElements()).toBeNull()
  })
})
