import { CIMGradientFill } from '@arcgis/core/symbols/cim/types'

export function isCIMGradientFill(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMGradientFill {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMGradientFill'
}
