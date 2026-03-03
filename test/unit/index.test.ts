import { describe, it, expect, vi } from 'vitest'
import cimSymbolToSVG from '@/index'

vi.mock('@/cim/symbols', () => ({
  innerSymbolToSvg: vi.fn(),
}))

import { innerSymbolToSvg } from '@/cim/symbols'
import CIMSymbol from '@arcgis/core/symbols/CIMSymbol'

describe('cimSymbolToSVG', () => {
  it('should return an SVG element and update the global state correctly', () => {
    const mockCIMSymbol: CIMSymbol = {
      data: {
        type: 'CIMSymbolReference',
        symbol: {
          type: 'CIMPointSymbol',
          symbolLayers: [
            {
              enable: true,
              type: 'CIMSolidFill',
              color: [255, 0, 0, 255],
            },
          ],
        },
      },
    } as CIMSymbol // Would want a _ton_ of other things implemented otherwise.

    const mockSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    vi.mocked(innerSymbolToSvg).mockReturnValue(mockSvg)

    const result = cimSymbolToSVG(mockCIMSymbol)

    expect(innerSymbolToSvg).toHaveBeenCalledWith(
      mockCIMSymbol.data.symbol,
      expect.any(Object)
    )

    expect(result).toBe(mockSvg)
  })
})
