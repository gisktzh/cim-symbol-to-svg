import { CIMMarker } from '@arcgis/core/symbols/cim/types'
import { isCIMVectorMarker } from './cim-vector-marker'
import { isCIMPictureMarker } from './cim-picture-marker'

export function isCIMMarker(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMMarker {
  return isCIMVectorMarker(layer) || isCIMPictureMarker(layer)
}
