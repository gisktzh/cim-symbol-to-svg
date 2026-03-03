import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CIMSolidStrokeTransformer } from '@/cim/symbol-layers/cim-solid-stroke'
import * as animationsModule from '@/cim/animations'
import type { Globals } from '@/index'
import { CIMSolidStroke } from '@arcgis/core/symbols/cim/types'

describe('CIMSolidStrokeTransformer', () => {
  const fakeDefs: SVGDefsElement[] = []
  const globals: Globals = {
    dimensions: { width: 100, height: 100 },
    defs: fakeDefs,
  }

  const fakeLayer: CIMSolidStroke = {
    type: 'CIMSolidStroke',
    color: [0, 255, 0, 1],
    width: 2,
    capStyle: 'Round',
    joinStyle: 'Bevel',
    miterLimit: 10,
    animations: [
      {
        type: 'CIMSymbolAnimationColor',
        toColor: [255, 255, 255, 255],
      },
    ],
    enable: true,
  }

  beforeEach(() => {
    fakeDefs.length = 0
  })

  it('should transform solid stroke to SVG attributes', () => {
    const transformer = new CIMSolidStrokeTransformer(fakeLayer, globals)
    const attrs = transformer.getSvgAttrs()

    const attrNames = attrs.map((a) => a.name)
    const attrValues = attrs.map((a) => a.value)

    expect(attrNames).toContain('stroke')
    expect(attrValues[attrNames.indexOf('stroke')]).toMatch(/^#00ff00$/i)
    expect(attrNames).toContain('stroke-width')
    expect(attrValues[attrNames.indexOf('stroke-width')]).toBe('2')
    expect(attrNames).toContain('stroke-linecap')
    expect(attrValues[attrNames.indexOf('stroke-linecap')]).toBe('round')
    expect(attrNames).toContain('stroke-linejoin')
    expect(attrValues[attrNames.indexOf('stroke-linejoin')]).toBe('bevel')
    expect(attrNames).toContain('stroke-miterlimit')
    expect(attrValues[attrNames.indexOf('stroke-miterlimit')]).toBe('10')
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

    const transformer = new CIMSolidStrokeTransformer(fakeLayer, globals)
    const els = transformer.getSvgElements()

    expect(els).toEqual([mockAnimationEl])

    getAnimationElementsSpy.mockRestore()
  })

  it('should return null if no animations', () => {
    const transformer = new CIMSolidStrokeTransformer(
      { ...fakeLayer, animations: undefined },
      globals
    )
    const els = transformer.getSvgElements()
    expect(els).toBeNull()
  })
})
