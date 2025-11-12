import { createEl } from '../../utils/svg-el'
import { cimLineSymbolToSvg } from '../symbols/cim-line-symbol'
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer'
import { FillMixin } from './mixins/fill-mixin'

export function isCIMHatchFill(
  layer: __esri.CIMSymbolLayer
): layer is __esri.CIMHatchFill {
  return layer.type === 'CIMHatchFill'
}

export class CIMHatchFillTransformer extends FillMixin(
  AbstractCIMSymbolLayerTransformer<__esri.CIMHatchFill>
) {
  getSvgAttrs() {
    const lineEl = cimLineSymbolToSvg(this.layer.lineSymbol, this.globals)

    const patternHeight = 10 + (this.layer.offsetY ? this.layer.offsetY : 0)

    lineEl.setAttribute(
      'x1',
      this.layer.offsetX ? this.layer.offsetX.toString() : '0'
    )
    lineEl.setAttribute(
      'x2',
      this.layer.offsetX ? this.layer.offsetX.toString() : '0'
    )
    lineEl.setAttribute(
      'y1',
      this.layer.offsetY ? this.layer.offsetY.toString() : '0'
    )
    lineEl.setAttribute('y2', patternHeight.toString())

    const pattern = createEl('pattern')
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('width', this.layer.separation.toString())
    pattern.setAttribute('height', patternHeight.toString())

    const uuid = crypto.randomUUID()
    pattern.setAttribute('id', uuid)

    if (this.layer.rotation) {
      pattern.setAttribute('patternTransform', `rotate(${this.layer.rotation})`)
    }

    pattern.appendChild(lineEl)

    this.globals.defs.push(pattern)

    return this.transformFill(uuid)
  }

  getSvgElements() {
    return null
  }
}
