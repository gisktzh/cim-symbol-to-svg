import { CIMSymbolLayer } from '@arcgis/core/symbols/cim/types'
import { Globals } from '../..'

export abstract class AbstractCIMSymbolLayerTransformer<
  T extends CIMSymbolLayer = CIMSymbolLayer,
> {
  constructor(
    public layer: T,
    public globals: Globals
  ) {}
  abstract getSvgAttrs(): Attr[]
  abstract getSvgElements(): SVGElement[] | null
}
