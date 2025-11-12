import { describe, it, expect, vi } from 'vitest'
import { cimPolygonSymbolToSvg } from '@/cim/symbols/cim-polygon-symbol'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import { Globals } from '@/index'
import * as svgElUtils from '@/utils/svg-el'
import { createAttr } from '../../../test-utils/attr'

describe('cimPolygonSymbolToSvg', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should create a <path> element with correct attributes based on enabled symbol layers', () => {
    const mockLayer = {
      enable: true,
      type: 'CIMSolidFill',
      color: [255, 0, 0],
      width: 2,
    } as unknown as __esri.CIMSolidFill

    const mockSymbol = {
      symbolLayers: [mockLayer],
    } as unknown as __esri.CIMPolygonSymbol

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
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
    const mockSymbol = {
      symbolLayers: [{ enable: false }], // No enabled layer
    } as unknown as __esri.CIMPolygonSymbol

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
    )

    const svgPath = cimPolygonSymbolToSvg(mockSymbol, globals)

    expect(svgPath.getAttribute('fill')).toBe('none')
    expect(svgPath.getAttribute('stroke-width')).toBeNull()

    createElSpy.mockRestore()
  })

  it('should handle multiple enabled layers correctly', () => {
    const mockLayer1 = {
      enable: true,
      type: 'CIMSolidFill',
      color: [255, 0, 0],
      width: 2,
    } as unknown as __esri.CIMSolidFill

    const mockLayer2 = {
      enable: true,
      type: 'CIMSolidFill',
      color: [0, 0, 255],
      width: 3,
    } as unknown as __esri.CIMSolidFill

    const mockSymbol = {
      symbolLayers: [mockLayer1, mockLayer2],
    } as unknown as __esri.CIMPolygonSymbol

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
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
