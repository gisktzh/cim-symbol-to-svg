import { describe, it, expect, vi } from 'vitest'
import { cimPointSymbolToSvg } from '@/cim/symbols/cim-point-symbol'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import { Globals } from '@/index'
import * as svgElUtils from '@/utils/svg-el'
import { createAttr } from '../../../test-utils/attr'

describe('cimPointSymbolToSvg', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should create a <use> element with correct attributes based on enabled symbol layers', () => {
    const mockLayer = {
      enable: true,
      type: 'CIMPictureMarker',
      url: 'https://example.com/image.png',
      size: 20,
    } as unknown as __esri.CIMPictureMarker

    const mockSymbol = {
      symbolLayers: [mockLayer],
    } as unknown as __esri.CIMPointSymbol

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
        createAttr('xlink:href', 'https://example.com/image.png'),
        createAttr('width', '20'),
      ])

    const svgUse = cimPointSymbolToSvg(mockSymbol, globals)

    expect(svgUse.tagName).toBe('use')
    expect(svgUse.getAttribute('xlink:href')).toBe(
      'https://example.com/image.png'
    )
    expect(svgUse.getAttribute('width')).toBe('20')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })

  it('should not add any attributes when there are no enabled layers', () => {
    const mockSymbol = {
      symbolLayers: [{ enable: false }],
    } as unknown as __esri.CIMPointSymbol

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
    )

    const svgUse = cimPointSymbolToSvg(mockSymbol, globals)

    expect(svgUse.getAttribute('xlink:href')).toBeNull()
    expect(svgUse.getAttribute('width')).toBeNull()

    createElSpy.mockRestore()
  })

  it('should handle multiple enabled layers correctly', () => {
    const mockLayer1 = {
      enable: true,
      type: 'CIMPictureMarker',
      url: 'https://example.com/image1.png',
      size: 20,
    } as unknown as __esri.CIMPictureMarker

    const mockLayer2 = {
      enable: true,
      type: 'CIMPictureMarker',
      url: 'https://example.com/image2.png',
      size: 30,
    } as unknown as __esri.CIMPictureMarker

    const mockSymbol = {
      symbolLayers: [mockLayer1, mockLayer2],
    } as unknown as __esri.CIMPointSymbol

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
        createAttr('xlink:href', 'https://example.com/image.png'),
        createAttr('width', '20'),
      ])

    const svgUse = cimPointSymbolToSvg(mockSymbol, globals)

    expect(svgUse.getAttribute('xlink:href')).toBe(
      'https://example.com/image.png'
    )
    expect(svgUse.getAttribute('width')).toBe('20')

    createElSpy.mockRestore()
    spyAttrs.mockRestore()
  })
})
