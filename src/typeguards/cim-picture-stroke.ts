import { CIMPictureStroke } from '@arcgis/core/symbols/cim/types'

export function isCIMPictureStroke(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMPictureStroke {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMPictureStroke'
}
