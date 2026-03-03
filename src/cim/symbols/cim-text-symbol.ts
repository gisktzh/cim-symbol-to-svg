import { CIMTextSymbol } from '@arcgis/core/symbols/cim/types'
import { createEl } from '../../utils/svg-el'

export function cimTextSymbolToSvg(
  symbol: CIMTextSymbol,
  textString: string | undefined
): SVGTextElement {
  const el = createEl('text')

  if (textString) {
    el.innerHTML = textString
  }

  return el
}
