import { describe, it, expect, vi, beforeEach } from 'vitest'
import { innerSymbolToSvg } from '@/cim/symbols'
import * as cimSymbolLayers from '@/cim/symbol-layers'
import { warn } from '@/utils/logging'
import type { Globals } from '@/index'
import { CIMPointSymbol, CIMVectorMarker } from '@arcgis/core/symbols/cim/types'

vi.mock('@/utils/svg-el', () => ({
  createEl: vi.fn((tag: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', tag)
  ),
}))

vi.mock('@/cim/symbol-layers', () => ({
  cimSymbolLayerToSvgElement: vi.fn(() => []),
}))

vi.mock('@/utils/logging', () => ({
  warn: vi.fn(() => {}),
}))

describe('innerSymbolToSvg', () => {
  let globals: Globals

  beforeEach(() => {
    globals = {
      dimensions: { width: 0, height: 0 },
      defs: [],
    }
  })

  it('should warn when no symbol is provided', () => {
    innerSymbolToSvg(undefined, globals)

    expect(warn).toHaveBeenCalledWith('No symbol given - on purpose?')
  })

  it('should warn when symbol without layers is provided', () => {
    const symbol: CIMPointSymbol = {
      type: 'CIMPointSymbol',
      symbolLayers: undefined,
    }

    innerSymbolToSvg(symbol, globals)

    expect(warn).toHaveBeenCalledWith(
      'Symbol without layers given - on purpose?'
    )
  })

  it('should set dimensions and create svg when CIMVectorMarker is provided', () => {
    const marker: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      enable: true,
      frame: { xmin: 0, xmax: 10, ymin: 0, ymax: 10 },
      markerGraphics: [],
      size: 0,
    }

    const symbol: CIMPointSymbol = {
      symbolLayers: [marker],
      type: 'CIMPointSymbol',
    }

    const mockSvgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    )
    vi.spyOn(cimSymbolLayers, 'cimSymbolLayerToSvgElement').mockReturnValue([
      mockSvgElement,
    ])

    const svg = innerSymbolToSvg(symbol, globals)

    expect(svg).toBeTruthy()
    expect(globals.dimensions.width).toBe(10)
    expect(globals.dimensions.height).toBe(10)
    expect(svg!.querySelector('circle')).toBeTruthy()
  })

  it('should append defs to svg if globals.defs has elements', () => {
    const symbol: CIMPointSymbol = {
      type: 'CIMPointSymbol',
      symbolLayers: [
        {
          type: 'CIMVectorMarker',
          enable: true,
          frame: { xmin: 0, xmax: 10, ymin: 0, ymax: 10 },
          size: 10,
          markerGraphics: [],
        },
      ],
    }

    globals.defs.push(
      document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    )

    const svg = innerSymbolToSvg(symbol, globals)

    expect(svg).toBeTruthy()

    const defs = svg!.querySelector('defs')
    expect(defs).toBeTruthy()
    expect(defs?.children.length).toBeGreaterThan(0)
  })

  it('should handle an empty symbolLayers array', () => {
    const symbol: CIMPointSymbol = {
      type: 'CIMPointSymbol',
      symbolLayers: [],
    }

    const svg = innerSymbolToSvg(symbol, globals)

    expect(svg).toBeTruthy()
    expect(svg!.querySelectorAll('*').length).toBe(0)
  })

  it('should correctly calculate the max width and height for multiple vector marker layers', () => {
    const symbol: CIMPointSymbol = {
      type: 'CIMPointSymbol',
      symbolLayers: [
        {
          type: 'CIMVectorMarker',
          enable: true,
          frame: { xmin: 0, xmax: 5, ymin: 0, ymax: 5 },
          size: 10,
          markerGraphics: [],
        },
        {
          type: 'CIMVectorMarker',
          enable: true,
          frame: { xmin: 0, xmax: 10, ymin: 0, ymax: 10 },
          size: 10,
          markerGraphics: [],
        },
      ],
    }

    innerSymbolToSvg(symbol, globals)

    expect(globals.dimensions.width).toBe(10)
    expect(globals.dimensions.height).toBe(10)
  })

  it('should return undefined when no symbol is passed', () => {
    const svg = innerSymbolToSvg(undefined, globals)

    expect(svg).toBeUndefined()
  })
})
