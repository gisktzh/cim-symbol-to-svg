import { CIMHatchFill } from '@arcgis/core/symbols/cim/types'

export function isCIMHatchFill(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMHatchFill {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMHatchFill'
}
