import { CIMPictureMarker } from '@arcgis/core/symbols/cim/types'

export function isCIMPictureMarker(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMPictureMarker {
  return Object.hasOwn(layer, 'type') && layer.type === 'CIMPictureMarker'
}
