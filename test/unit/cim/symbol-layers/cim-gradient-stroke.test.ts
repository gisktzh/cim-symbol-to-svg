import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CIMGradientStrokeTransformer } from '@/cim/symbol-layers/cim-gradient-stroke'
import * as svgElUtils from '@/utils/svg-el'
import type { Globals } from '@/index'
import { CIMGradientStroke } from '@arcgis/core/symbols/cim/types'
import * as logging from '@/utils/logging'

describe('CIMGradientStrokeTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer: CIMGradientStroke = {
    type: 'CIMGradientStroke',
    colorRamp: {
      type: 'CIMLinearContinuousColorRamp',
      fromColor: [0, 0, 0, 1],
      toColor: [255, 255, 255, 1],
    },
    gradientMethod: 'AcrossLine',
    width: 4,
    capStyle: 'Round',
    joinStyle: 'Miter',
    miterLimit: 10,
    gradientSize: 100,
    gradientSizeUnits: 'Relative',
    enable: false,
  }

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should transform gradient and stroke', () => {
    const warnSpy = vi.spyOn(logging, 'warn').mockImplementation(() => {})

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
    expect(warnSpy).toHaveBeenCalledWith(
      'AcrossLine gradients are currently not supported'
    )

    createElSpy.mockRestore()
  })

  it('getSvgElements should return null', () => {
    const transformer = new CIMGradientStrokeTransformer(fakeLayer, globals)
    expect(transformer.getSvgElements()).toBeNull()
  })
})
