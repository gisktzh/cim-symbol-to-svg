import { CIMSymbolLayerUnion } from '@arcgis/core/symbols/cim/types'

const allLayerTypes: CIMSymbolLayerUnion['type'][] = [
  'CIMGradientFill',
  'CIMPictureMarker',
  'CIMVectorMarker',
  'CIMGradientStroke',
  'CIMHatchFill',
  'CIMPictureFill',
  'CIMPictureStroke',
  'CIMSolidFill',
  'CIMSolidStroke',
]

export default function getOtherLayerTypes(
  theseLayerTypes: CIMSymbolLayerUnion['type'][]
) {
  return allLayerTypes.filter((x) => !theseLayerTypes.includes(x))
}
