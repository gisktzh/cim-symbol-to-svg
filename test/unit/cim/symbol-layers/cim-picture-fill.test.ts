import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMPictureFillTransformer,
  isCIMPictureFill,
} from '@/cim/symbol-layers/cim-picture-fill'
import * as svgElUtils from '@/utils/svg-el'
import * as logging from '@/utils/logging'
import type { Globals } from '@/index'

describe('CIMPictureFillTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMPictureFill',
    url: 'http://example.com/image.png',
    colorSubstitutions: [{ from: [255, 0, 0, 255], to: [0, 255, 0, 255] }],
  } as unknown as __esri.CIMPictureFill

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMPictureFill layer', () => {
    expect(
      isCIMPictureFill({
        type: 'CIMPictureFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMPictureFill({
        type: 'CIMSolidFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should create a pattern and transform fill', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const warnSpy = vi.spyOn(logging, 'warn').mockImplementation(() => {})

    const transformer = new CIMPictureFillTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs.find((a: Attr) => a.name === 'fill')).toBeTruthy()
    expect(attrs.find((a: Attr) => a.name === 'fill')?.value).toMatch(
      /^url\(#.+\)$/
    )

    expect(fakeDefs.length).toBe(1)
    const patternEl = fakeDefs[0]
    expect(patternEl.tagName).toBe('pattern')
    expect(patternEl.querySelector('image')?.getAttribute('href')).toBe(
      fakeLayer.url
    )

    expect(warnSpy).toHaveBeenCalledWith(
      'Color substitution is currently not supported'
    )

    createElSpy.mockRestore()
    warnSpy.mockRestore()
  })

  it('getSvgElements should return null', () => {
    const transformer = new CIMPictureFillTransformer(fakeLayer, globals)
    expect(transformer.getSvgElements()).toBeNull()
  })
})
