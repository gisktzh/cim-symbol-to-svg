import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CIMVectorMarkerTransformer } from '@/cim/symbol-layers/cim-vector-marker'
import * as graphicsModule from '@/cim/graphics/cim-marker-graphic'
import type { Globals } from '@/index'
import { CIMVectorMarker } from '@arcgis/core/symbols/cim/types'

describe('CIMVectorMarkerTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer: CIMVectorMarker = {
    type: 'CIMVectorMarker',
    markerGraphics: [
      {
        type: 'CIMMarkerGraphic',
        geometry: undefined,
      },
    ],
    offsetX: 5,
    offsetY: 10,
    rotation: 45,
    rotateClockwise: true,
    animations: [{ type: 'CIMSymbolAnimationSize', toSize: 12 }],
    frame: {
      xmin: 0,
      ymin: 0,
      xmax: 0,
      ymax: 0,
    },
    size: 0,
    enable: false,
  }

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should return empty SVG attrs', () => {
    const transformer = new CIMVectorMarkerTransformer(fakeLayer, globals)
    expect(transformer.getSvgAttrs()).toEqual([])
  })

  it('should transform marker graphics to SVG elements', () => {
    const transformedGraphic = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )

    const spy = vi
      .spyOn(graphicsModule, 'transformMarkerGraphicToSvg')
      .mockImplementation(() => transformedGraphic)

    const transformer = new CIMVectorMarkerTransformer(fakeLayer, globals)
    const els = transformer.getSvgElements()

    expect(els).toHaveLength(1)
    expect(els[0]).toBe(transformedGraphic)

    spy.mockRestore()
  })

  it('should apply rotation attributes', () => {
    const transformedGraphic = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )

    vi.spyOn(graphicsModule, 'transformMarkerGraphicToSvg').mockImplementation(
      () => transformedGraphic
    )

    const transformer = new CIMVectorMarkerTransformer(fakeLayer, globals)
    const els = transformer.getSvgElements()

    expect(els[0].getAttribute('transform')).toBe('rotate(45)')
  })

  it('should append animation elements', () => {
    const transformedGraphic = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )
    const animationEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    )

    vi.spyOn(graphicsModule, 'transformMarkerGraphicToSvg').mockImplementation(
      () => transformedGraphic
    )
    const getAnimationElementsSpy = vi.spyOn(
      CIMVectorMarkerTransformer.prototype,
      'getAnimationElements'
    )
    getAnimationElementsSpy.mockReturnValue([animationEl])

    const transformer = new CIMVectorMarkerTransformer(fakeLayer, globals)
    const els = transformer.getSvgElements()

    expect(els[0].children.length).toBe(1)
    expect(els[0].children[0]).toStrictEqual(animationEl)

    getAnimationElementsSpy.mockRestore()
  })
})
