import {
  CIMGradientStroke,
  CIMPictureStroke,
  CIMSolidStroke,
} from '@arcgis/core/symbols/cim/types'
import { isCIMSolidStroke } from './cim-solid-stroke'
import { isCIMPictureStroke } from './cim-picture-stroke'
import { isCIMGradientStroke } from './cim-gradient-stroke'

export function isCIMStroke(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any
): layer is CIMSolidStroke | CIMPictureStroke | CIMGradientStroke {
  return (
    isCIMSolidStroke(layer) ||
    isCIMPictureStroke(layer) ||
    isCIMGradientStroke(layer)
  )
}
