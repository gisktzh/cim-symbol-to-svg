import { describe, it, expect, vi, Mock } from 'vitest'
import cimSymbolToSVG from '@/index'

vi.mock('@/cim/symbols', () => ({
  innerSymbolToSvg: vi.fn(),
}))

import { innerSymbolToSvg } from '@/cim/symbols'

describe('cimSymbolToSVG', () => {
  it('should return an SVG element and update the global state correctly', () => {
    const mockCIMSymbol = {
      data: {
        symbol: {
          symbolLayers: [
            {
              enable: true,
              type: 'CIMSolidFill',
              color: [255, 0, 0, 255],
            },
          ],
        },
      },
    } as unknown as __esri.CIMSymbol

    const mockSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    ;(innerSymbolToSvg as Mock).mockReturnValue(mockSvg)

    const result = cimSymbolToSVG(mockCIMSymbol)

    expect(innerSymbolToSvg).toHaveBeenCalledWith(
      mockCIMSymbol.data.symbol,
      expect.any(Object)
    )

    expect(result).toBe(mockSvg)
  })
})
