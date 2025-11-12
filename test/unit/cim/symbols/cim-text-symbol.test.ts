import { describe, it, expect, vi } from 'vitest'
import { cimTextSymbolToSvg } from '@/cim/symbols/cim-text-symbol'
import * as svgElUtils from '@/utils/svg-el'

describe('cimTextSymbolToSvg', () => {
  it('should create a <text> element with innerHTML set to the provided textString', () => {
    const textString = 'Hello, world!'

    const createElSpy = vi.spyOn(svgElUtils, 'createEl')
    createElSpy.mockImplementation(
      (tag: string) =>
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          tag
        ) as SVGElement
    )

    const svgText = cimTextSymbolToSvg(
      {} as unknown as __esri.CIMTextSymbol,
      textString
    )

    expect(svgText.tagName).toBe('text')
    expect(svgText.innerHTML).toBe(textString)

    createElSpy.mockRestore()
  })

  it('should create a <text> element with empty innerHTML if no textString is provided', () => {
    const svgText = cimTextSymbolToSvg(
      {} as unknown as __esri.CIMTextSymbol,
      undefined
    )

    expect(svgText.tagName).toBe('text')
    expect(svgText.innerHTML).toBe('')
  })
})
