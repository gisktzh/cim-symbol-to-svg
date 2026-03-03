import { CIMSolidStroke } from '@arcgis/core/symbols/cim/types'

export function isCIMSolidStroke(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMSolidStroke {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMSolidStroke'
}
