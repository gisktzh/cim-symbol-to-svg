import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMPictureMarkerTransformer,
  isCIMPictureMarker,
} from '@/cim/symbol-layers/cim-picture-marker'
import * as svgElUtils from '@/utils/svg-el'
import type { Globals } from '@/index'

describe('CIMPictureMarkerTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMPictureMarker',
    url: 'http://example.com/marker.png',
    size: 24,
    scaleX: 2,
    height: 30,
    width: 20,
    offsetX: 5,
    offsetY: 10,
    rotation: 45,
    rotateClockwise: true,
    anchorPoint: { x: 50, y: 50 },
    anchorPointUnits: 'Relative',
    animations: [],
  } as unknown as __esri.CIMPictureMarker

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMPictureMarker layer', () => {
    expect(
      isCIMPictureMarker({
        type: 'CIMPictureMarker',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMPictureMarker({
        type: 'CIMSolidFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should create image element with rotation and animation', () => {
    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const transformer = new CIMPictureMarkerTransformer(fakeLayer, globals)
    const [el] = transformer.getSvgElements()

    expect(el.tagName).toBe('image')
    expect(el.getAttribute('href')).toBe(fakeLayer.url)
    expect(el.getAttribute('width')).toBe(
      (fakeLayer.size * fakeLayer.scaleX!).toString()
    )
    expect(el.getAttribute('height')).toBe(fakeLayer.size.toString())
    expect(el.getAttribute('x')).toBe(fakeLayer.offsetX!.toString())
    expect(el.getAttribute('y')).toBe(fakeLayer.offsetY!.toString())

    expect(el.getAttribute('transform')).toBe(`rotate(${fakeLayer.rotation})`)
    expect(el.getAttribute('transform-origin')).toBe(
      `${fakeLayer.anchorPoint!.x}% ${fakeLayer.anchorPoint!.y}%`
    )

    createElSpy.mockRestore()
  })

  it('should handle empty animations', () => {
    const transformer = new CIMPictureMarkerTransformer(
      { ...fakeLayer, animations: [] },
      globals
    )
    const [el] = transformer.getSvgElements()
    expect(el.children.length).toBe(0)
  })
})
