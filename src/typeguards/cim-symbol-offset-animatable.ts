import {
  CIMHatchFill,
  CIMMarker,
  CIMPictureFill,
} from '@arcgis/core/symbols/cim/types'
import { isCIMMarker } from './cim-marker'
import { isCIMPictureFill } from './cim-picture-fill'
import { isCIMHatchFill } from './cim-hatch-fill'

export function isCIMSymbolOffsetAnimatable(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMMarker | CIMPictureFill | CIMHatchFill {
  return isCIMMarker(layer) || isCIMPictureFill(layer) || isCIMHatchFill(layer)
}
