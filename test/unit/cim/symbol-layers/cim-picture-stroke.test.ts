import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CIMPictureStrokeTransformer } from '@/cim/symbol-layers/cim-picture-stroke'
import * as svgElUtils from '@/utils/svg-el'
import { Globals } from '@/index'
import { CIMPictureStroke } from '@arcgis/core/symbols/cim/types'

describe('CIMPictureStrokeTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer: CIMPictureStroke = {
    type: 'CIMPictureStroke',
    url: 'http://example.com/stroke.png',
    width: 5,
    capStyle: 'Round',
    joinStyle: 'Miter',
    miterLimit: 10,
    enable: false,
  }

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should transform picture stroke to SVG attributes', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const transformer = new CIMPictureStrokeTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs[0].name).toBe('stroke')
    expect(attrs[0].value).toMatch(/^url\(#.+\)$/)

    expect(attrs[1].name).toBe('stroke-width')
    expect(attrs[1].value).toBe(fakeLayer.width.toString())
    expect(attrs[2].name).toBe('stroke-linecap')
    expect(attrs[2].value).toBe(fakeLayer.capStyle!.toLowerCase())
    expect(attrs[3].name).toBe('stroke-linejoin')
    expect(attrs[3].value).toBe(fakeLayer.joinStyle!.toLowerCase())
    expect(attrs[4].name).toBe('stroke-miterlimit')
    expect(attrs[4].value).toBe(fakeLayer.miterLimit!.toString())

    createElSpy.mockRestore()
  })
})
