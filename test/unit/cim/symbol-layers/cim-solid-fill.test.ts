import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CIMSolidFillTransformer,
  isCIMSolidFill,
} from '@/cim/symbol-layers/cim-solid-fill'
import * as animationsModule from '@/cim/animations'
import type { Globals } from '@/index'

describe('CIMSolidFillTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer = {
    type: 'CIMSolidFill',
    color: [255, 0, 0, 255],
    animations: [{ type: 'fade', duration: 1000 }],
  } as unknown as __esri.CIMSolidFill

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should detect CIMSolidFill layer', () => {
    expect(
      isCIMSolidFill({
        type: 'CIMSolidFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(true)
    expect(
      isCIMSolidFill({
        type: 'CIMPictureFill',
      } as unknown as __esri.CIMSymbolLayer)
    ).toBe(false)
  })

  it('should transform solid fill to SVG attributes', () => {
    const transformer = new CIMSolidFillTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    expect(attrs[0].name).toBe('fill')
    expect(attrs[0].value).toMatch(/^#ff0000$/i)

    expect(attrs[1].name).toBe('opacity')
    expect(attrs[1].value).toBe('1')
  })

  it('should return animation elements if present', () => {
    const mockAnimationEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    )
    const getAnimationElementsSpy = vi.spyOn(
      animationsModule,
      'getAnimationElements'
    )
    getAnimationElementsSpy.mockReturnValue(mockAnimationEl)

    const transformer = new CIMSolidFillTransformer(fakeLayer, globals)
    const els = transformer.getSvgElements()

    expect(els).toEqual([mockAnimationEl])

    getAnimationElementsSpy.mockRestore()
  })

  it('should return null if no animations', () => {
    const transformer = new CIMSolidFillTransformer(
      { ...fakeLayer, animations: undefined },
      globals
    )
    const els = transformer.getSvgElements()
    expect(els).toBeNull()
  })
})
