import { describe, it, expect, vi } from 'vitest'
import { cimPolygonSymbolToSvg } from '@/cim/symbols/cim-polygon-symbol'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import { Globals } from '@/index'
import * as svgElUtils from '@/utils/svg-el'
import { createAttr } from '../../../test-utils/attr'
import { CIMPolygonSymbol, CIMSolidFill } from '@arcgis/core/symbols/cim/types'

describe('cimPolygonSymbolToSvg', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should create a <path> element with correct attributes based on enabled symbol layers', () => {
    const mockLayer: CIMSolidFill = {
      type: 'CIMSolidFill',
      enable: true,
      color: [255, 0, 0, 255],
    }

    const mockSymbol: CIMPolygonSymbol = {
      type: 'CIMPolygonSymbol',
      symbolLayers: [mockLayer],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const spyAttrs = vi
      .spyOn(cimSymbolLayers, 'cimSymbolLayerToSvgAttrs')
      .mockReturnValue([
        createAttr('fill', 'rgb(255, 0, 0)'),
        createAttr('stroke-width', '2'),
      ])

    const svgPath = cimPolygonSymbolToSvg(mockSymbol, globals)

    expect(svgPath.tagName).toBe('path')
    expect(svgPath.getAttribute('fill')).toBe('rgb(255, 0, 0)')
    expect(svgPath.getAttribute('stroke-width')).toBe('2')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })

  it('should not add any attributes when there are no enabled layers', () => {
    const mockSymbol: CIMPolygonSymbol = {
      type: 'CIMPolygonSymbol',
      symbolLayers: [
        {
          type: 'CIMSolidFill',
          enable: false,
          color: [255, 0, 0, 255],
        },
      ],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const svgPath = cimPolygonSymbolToSvg(mockSymbol, globals)

    expect(svgPath.getAttribute('fill')).toBe('none')
    expect(svgPath.getAttribute('stroke-width')).toBeNull()

    createElSpy.mockRestore()
  })

  it('should handle multiple enabled layers correctly', () => {
    const mockLayer1: CIMSolidFill = {
      type: 'CIMSolidFill',
      enable: true,
      color: [255, 0, 0, 255],
    }

    const mockLayer2: CIMSolidFill = {
      enable: true,
      type: 'CIMSolidFill',
      color: [0, 0, 255, 255],
    }

    const mockSymbol: CIMPolygonSymbol = {
      type: 'CIMPolygonSymbol',
      symbolLayers: [mockLayer1, mockLayer2],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const spyAttrs = vi
      .spyOn(cimSymbolLayers, 'cimSymbolLayerToSvgAttrs')
      .mockReturnValue([
        createAttr('fill', 'rgb(255, 0, 0)'),
        createAttr('stroke-width', '2'),
      ])

    const svgPath = cimPolygonSymbolToSvg(mockSymbol, globals)

    expect(svgPath.getAttribute('fill')).toBe('rgb(255, 0, 0)')
    expect(svgPath.getAttribute('stroke-width')).toBe('2')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })
})
