import { CIMPictureFill } from '@arcgis/core/symbols/cim/types'

export function isCIMPictureFill(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMPictureFill {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMPictureFill'
}
