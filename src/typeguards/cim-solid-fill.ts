import { CIMSolidFill } from '@arcgis/core/symbols/cim/types'

export function isCIMSolidFill(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMSolidFill {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMSolidFill'
}
