import { CIMGradientStroke } from '@arcgis/core/symbols/cim/types'

export function isCIMGradientStroke(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMGradientStroke {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMGradientStroke'
}
