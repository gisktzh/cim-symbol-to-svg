import { createEl } from '../../utils/svg-el'

export function getSizeAnimationElement(
  animation: __esri.CIMSymbolAnimationSize,
  layer: __esri.CIMSymbolLayer
) {
  if (layer.type !== 'CIMPictureMarker' && layer.type !== 'CIMVectorMarker') {
    return null
  }

  const el = createEl('animateTransform')
  el.setAttribute('additive', 'sum')
  el.setAttribute('type', 'scale')
  el.setAttribute('from', '1')
  el.setAttribute('to', (animation.toSize / layer.size).toString())

  return el
}
