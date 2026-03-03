import { CIMSolidFill, CIMSolidStroke } from '@arcgis/core/symbols/cim/types'
import { isCIMSolidFill } from './cim-solid-fill'
import { isCIMSolidStroke } from './cim-solid-stroke'

export function isCIMSymbolColorAnimatable(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMSolidFill | CIMSolidStroke {
  return isCIMSolidFill(layer) || isCIMSolidStroke(layer)
}
