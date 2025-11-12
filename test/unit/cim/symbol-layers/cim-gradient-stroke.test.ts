import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMGradientStrokeTransformer,
  isCIMGradientStroke,
} from '@/cim/symbol-layers/cim-gradient-stroke'
import * as svgElUtils from '@/utils/svg-el'
import type { Globals } from '@/index'

describe('CIMGradientStrokeTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMGradientStroke',
    colorRamp: {
      type: 'CIMLinearContinuousColorRamp',
      fromColor: [0, 0, 0, 1],
      toColor: [255, 255, 255, 1],
    },
    gradientMethod: 'Linear',
    width: 4,
    capStyle: 'Round',
    joinStyle: 'Miter',
    miterLimit: 10,
    gradientSize: 100,
    gradientSizeUnits: 'Relative',
  } as unknown as __esri.CIMGradientStroke

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMGradientStroke layer', () => {
    expect(
      isCIMGradientStroke({
        type: 'CIMGradientStroke',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMGradientStroke({
        type: 'CIMSolidStroke',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should transform gradient and stroke', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const transformer = new CIMGradientStrokeTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs.find((a: Attr) => a.name === 'stroke')).toBeTruthy()
    expect(attrs.find((a: Attr) => a.name === 'stroke')?.value).toMatch(
      /^url\(#.+\)$/
    )
    expect(attrs.find((a: Attr) => a.name === 'stroke-width')?.value).toBe('4')
    expect(fakeDefs.length).toBeGreaterThan(0)

    createElSpy.mockRestore()
  })

  it('getSvgElements should return null', () => {
    const transformer = new CIMGradientStrokeTransformer(fakeLayer, globals)
    expect(transformer.getSvgElements()).toBeNull()
  })
})
