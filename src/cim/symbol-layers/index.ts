import { CIMVectorMarkerTransformer } from './cim-vector-marker'
import { CIMSolidStrokeTransformer } from './cim-solid-stroke'
import { CIMSolidFillTransformer } from './cim-solid-fill'
import { CIMPictureStrokeTransformer } from './cim-picture-stroke'
import { CIMPictureMarkerTransformer } from './cim-picture-marker'
import { CIMPictureFillTransformer } from './cim-picture-fill'
import { CIMHatchFillTransformer } from './cim-hatch-fill'
import { CIMGradientStrokeTransformer } from './cim-gradient-stroke'
import { CIMGradientFillTransformer } from './cim-gradient-fill'
import { Globals } from '../..'
import { CIMSymbolLayerUnion } from '@arcgis/core/symbols/cim/types'

function getTransformer(layer: CIMSymbolLayerUnion, globals: Globals) {
  switch (layer.type) {
    case 'CIMGradientFill':
      return new CIMGradientFillTransformer(layer, globals)
    case 'CIMGradientStroke':
      return new CIMGradientStrokeTransformer(layer, globals)
    case 'CIMHatchFill':
      return new CIMHatchFillTransformer(layer, globals)
    case 'CIMPictureFill':
      return new CIMPictureFillTransformer(layer, globals)
    case 'CIMPictureMarker':
      return new CIMPictureMarkerTransformer(layer, globals)
    case 'CIMPictureStroke':
      return new CIMPictureStrokeTransformer(layer, globals)
    case 'CIMSolidFill':
      return new CIMSolidFillTransformer(layer, globals)
    case 'CIMSolidStroke':
      return new CIMSolidStrokeTransformer(layer, globals)
    case 'CIMVectorMarker':
      return new CIMVectorMarkerTransformer(layer, globals)
  }
}

export function cimSymbolLayerToSvgAttrs(
  layer: CIMSymbolLayerUnion,
  globals: Globals
) {
  const transformer = getTransformer(layer, globals)

  return transformer.getSvgAttrs()
}

export function cimSymbolLayerToSvgElement(
  layer: CIMSymbolLayerUnion,
  globals: Globals
) {
  const transformer = getTransformer(layer, globals)

  return transformer.getSvgElements()
}
