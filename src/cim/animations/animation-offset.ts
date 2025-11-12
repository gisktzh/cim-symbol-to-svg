import { createEl } from '../../utils/svg-el'

export function getOffsetAnimationElement(
  animation: __esri.CIMSymbolAnimationOffset,
  layer: __esri.CIMSymbolLayer
) {
  if (
    layer.type !== 'CIMHatchFill' &&
    layer.type !== 'CIMPictureFill' &&
    layer.type !== 'CIMPictureMarker' &&
    layer.type !== 'CIMVectorMarker'
  ) {
    // All other layer types do not support offset animation
    return null
  }

  let toOffsetX = 0
  let toOffsetY = 0

  if (animation.offsetX) {
    toOffsetX = animation.offsetX - (layer.offsetX || 0) // We use the offset in positioning. Here, we animate the translate property.
  }

  if (animation.offsetY) {
    toOffsetY = animation.offsetY - (layer.offsetY || 0) // We use the offset in positioning. Here, we animate the translate property.
  }

  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'translate')
  el.setAttribute('from', '0 0')
  el.setAttribute('to', `${toOffsetX} ${toOffsetY}`)

  return el
}
