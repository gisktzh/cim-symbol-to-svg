import { createEl } from '../../utils/svg-el'

export function cimTextSymbolToSvg(
  symbol: __esri.CIMTextSymbol,
  textString: string | undefined
): SVGTextElement {
  const el = createEl('text')

  if (textString) {
    el.innerHTML = textString
  }

  return el
}
