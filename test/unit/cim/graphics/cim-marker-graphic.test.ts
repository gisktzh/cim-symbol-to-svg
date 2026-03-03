/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { transformMarkerGraphicToSvg } from '@/cim/graphics/cim-marker-graphic'
import type { Globals } from '@/index'

vi.mock('@/cim/symbols/cim-line-symbol', () => ({
  cimLineSymbolToSvg: vi.fn((_symbol: CIMLineSymbol, _globals: Globals) =>
    document.createElementNS('http://www.w3.org/2000/svg', 'line')
  ),
}))
vi.mock('@/cim/symbols/cim-point-symbol', () => ({
  cimPointSymbolToSvg: vi.fn((_symbol: CIMPointSymbol, _globals: Globals) =>
    document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  ),
}))
vi.mock('@/cim/symbols/cim-polygon-symbol', () => ({
  cimPolygonSymbolToSvg: vi.fn((_symbol: CIMPolygonSymbol, _globals: Globals) =>
    document.createElementNS('http://www.w3.org/2000/svg', 'path')
  ),
}))
vi.mock('@/cim/symbols/cim-text-symbol', () => ({
  cimTextSymbolToSvg: vi.fn((_symbol: CIMTextSymbol, _text: string) =>
    document.createElementNS('http://www.w3.org/2000/svg', 'text')
  ),
}))

import { cimLineSymbolToSvg } from '@/cim/symbols/cim-line-symbol'
import { cimPointSymbolToSvg } from '@/cim/symbols/cim-point-symbol'
import { cimPolygonSymbolToSvg } from '@/cim/symbols/cim-polygon-symbol'
import { cimTextSymbolToSvg } from '@/cim/symbols/cim-text-symbol'
import {
  CIMLineSymbol,
  CIMMarkerGraphic,
  CIMPointSymbol,
  CIMPolygonSymbol,
  CIMTextSymbol,
} from '@arcgis/core/symbols/cim/types'
import Extent from '@arcgis/core/geometry/Extent'

const globals: Globals = {
  dimensions: { width: 100, height: 50 },
  defs: [],
}

describe('transformMarkerGraphicToSvg', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('delegates to cimLineSymbolToSvg for CIMLineSymbol', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMLineSymbol' },
      geometry: undefined,
    }
    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimLineSymbolToSvg).toHaveBeenCalledWith(graphic.symbol, globals)
    expect(el?.tagName).toBe('line')
  })

  it('delegates to cimPointSymbolToSvg for CIMPointSymbol', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMPointSymbol' },
      geometry: undefined,
    }
    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimPointSymbolToSvg).toHaveBeenCalledWith(graphic.symbol, globals)
    expect(el?.tagName).toBe('circle')
  })

  it('delegates to cimTextSymbolToSvg for CIMTextSymbol', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMTextSymbol' },
      textString: 'Hello',
      geometry: undefined,
    }
    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimTextSymbolToSvg).toHaveBeenCalledWith(graphic.symbol, 'Hello')
    expect(el?.tagName).toBe('text')
  })

  it('delegates to cimPolygonSymbolToSvg and sets "d" attribute if geometry has rings', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMPolygonSymbol' },
      geometry: {
        rings: [
          [
            [0, 0],
            [50, 50],
          ],
        ],
      },
    }

    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimPolygonSymbolToSvg).toHaveBeenCalledWith(graphic.symbol, globals)
    expect(el?.tagName).toBe('path')
    expect(el?.getAttribute('d')).toContain('M')
    expect(el?.getAttribute('d')).toContain('Z')
  })

  it('delegates to cimPolygonSymbolToSvg and sets "d" attribute if geometry has paths', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMPolygonSymbol' },
      geometry: {
        paths: [
          [
            [0, 0],
            [50, 50],
          ],
        ],
      },
    }

    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimPolygonSymbolToSvg).toHaveBeenCalledWith(graphic.symbol, globals)
    expect(el?.tagName).toBe('path')
    expect(el?.getAttribute('d')).toContain('M')
    expect(el?.getAttribute('d')).not.toContain('Z') // paths are not closed
  })

  it('returns cimPolygonSymbolToSvg element if no geometry', () => {
    const graphic: CIMMarkerGraphic = {
      type: 'CIMMarkerGraphic',
      symbol: { type: 'CIMPolygonSymbol' },
      geometry: undefined,
    }
    const el = transformMarkerGraphicToSvg(
      graphic,
      { xmin: 0, ymin: 0, xmax: 100, ymax: 100 },
      globals
    )
    expect(cimPolygonSymbolToSvg).toHaveBeenCalled()
    expect(el?.tagName).toBe('path')
    expect(el?.getAttribute('d')).toBeNull()
  })
})
