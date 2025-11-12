import { describe, it, expect, vi } from 'vitest'
import * as cimLineSymbol from '@/cim/symbols/cim-line-symbol'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import * as svgElUtils from '@/utils/svg-el'
import { Globals } from '@/index'
import { createAttr } from '../../../test-utils/attr'

describe('cimLineSymbolToSvg', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should create a <line> element with correct attributes based on enabled symbol layers', () => {
    const mockLayer = {
      enable: true,
      type: 'CIMSolidStroke',
      color: [255, 0, 0],
      width: 2,
    } as unknown as __esri.CIMSolidStroke

    const mockSymbol = {
      symbolLayers: [mockLayer],
    } as unknown as __esri.CIMLineSymbol

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
        createAttr('stroke', 'rgb(255, 0, 0)'),
        createAttr('stroke-width', '2'),
      ])

    const svgLine = cimLineSymbol.cimLineSymbolToSvg(mockSymbol, globals)

    expect(svgLine.tagName).toBe('line')
    expect(svgLine.getAttribute('stroke')).toBe('rgb(255, 0, 0)')
    expect(svgLine.getAttribute('stroke-width')).toBe('2')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })

  it('should not add any attributes when there are no enabled layers', () => {
    const mockSymbol = {
      symbolLayers: [{ enable: false }], // No enabled layer
    } as unknown as __esri.CIMLineSymbol

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
    )

    const svgLine = cimLineSymbol.cimLineSymbolToSvg(mockSymbol, globals)

    expect(svgLine.getAttribute('stroke')).toBeNull()
    expect(svgLine.getAttribute('stroke-width')).toBeNull()

    createElSpy.mockRestore()
  })

  it('should handle multiple enabled layers correctly', () => {
    const mockLayer1 = {
      enable: true,
      type: 'CIMSolidStroke',
      color: [255, 0, 0],
      width: 2,
    } as unknown as __esri.CIMSolidStroke

    const mockLayer2 = {
      enable: true,
      type: 'CIMSolidStroke',
      color: [0, 0, 255],
      width: 3,
    } as unknown as __esri.CIMSolidStroke

    const mockSymbol = {
      symbolLayers: [mockLayer1, mockLayer2],
    } as unknown as __esri.CIMLineSymbol

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
        createAttr('stroke', 'rgb(255, 0, 0)'),
        createAttr('stroke-width', '2'),
      ])

    const svgLine = cimLineSymbol.cimLineSymbolToSvg(mockSymbol, globals)

    expect(svgLine.getAttribute('stroke')).toBe('rgb(255, 0, 0)')
    expect(svgLine.getAttribute('stroke-width')).toBe('2')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })
})
