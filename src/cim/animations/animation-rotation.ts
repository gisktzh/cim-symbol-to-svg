import { createEl } from '../../utils/svg-el'

export function getRotationAnimationElement(
  animation: __esri.CIMSymbolAnimationRotation,
  layer: __esri.CIMSymbolLayer
) {
  if (
    layer.type !== 'CIMHatchFill' &&
    layer.type !== 'CIMPictureFill' &&
    layer.type !== 'CIMPictureMarker' &&
    layer.type !== 'CIMVectorMarker'
  ) {
    return null
  }

  let toRotation = animation.toRotation
  if (!animation.rotateClockwise) {
    toRotation *= -1
  }

  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'rotation')
  el.setAttribute('from', (layer.rotation || 0).toString())
  el.setAttribute('to', toRotation.toString())

  return el
}
