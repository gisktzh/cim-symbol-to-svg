import { describe, it, expect, vi } from 'vitest'
import * as cimLineSymbol from '@/cim/symbols/cim-line-symbol'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import * as svgElUtils from '@/utils/svg-el'
import { Globals } from '@/index'
import { createAttr } from '../../../test-utils/attr'
import { CIMLineSymbol, CIMSolidStroke } from '@arcgis/core/symbols/cim/types'

describe('cimLineSymbolToSvg', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should create a <line> element with correct attributes based on enabled symbol layers', () => {
    const mockLayer: CIMSolidStroke = {
      type: 'CIMSolidStroke',
      enable: true,
      color: [255, 0, 0, 255],
      width: 2,
    }

    const mockSymbol: CIMLineSymbol = {
      type: 'CIMLineSymbol',
      symbolLayers: [mockLayer],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
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
    const mockSymbol: CIMLineSymbol = {
      type: 'CIMLineSymbol',
      symbolLayers: [
        {
          type: 'CIMSolidStroke',
          enable: false,
          color: [255, 0, 0, 255],
          width: 2,
        },
      ],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
    )

    const svgLine = cimLineSymbol.cimLineSymbolToSvg(mockSymbol, globals)

    expect(svgLine.getAttribute('stroke')).toBeNull()
    expect(svgLine.getAttribute('stroke-width')).toBeNull()

    createElSpy.mockRestore()
  })

  it('should handle multiple enabled layers correctly', () => {
    const mockLayer1: CIMSolidStroke = {
      type: 'CIMSolidStroke',
      enable: true,
      color: [255, 0, 0, 255],
      width: 2,
    }

    const mockLayer2: CIMSolidStroke = {
      type: 'CIMSolidStroke',
      enable: true,
      color: [0, 0, 255, 255],
      width: 3,
    }

    const mockSymbol: CIMLineSymbol = {
      type: 'CIMLineSymbol',
      symbolLayers: [mockLayer1, mockLayer2],
    }

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation((tag: string) =>
      document.createElementNS('http://www.w3.org/2000/svg', tag)
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
