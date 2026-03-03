import {
  CIMAnimatedSymbolProperties,
  CIMSymbolAnimation,
  CIMSymbolLayerUnion,
} from '@arcgis/core/symbols/cim/types'
import { getColorAnimationElement } from './animation-color'
import { getOffsetAnimationElement } from './animation-offset'
import { getRotationAnimationElement } from './animation-rotation'
import { getScaleAnimationElement } from './animation-scale'
import { getSizeAnimationElement } from './animation-size'
import { getTransparencyAnimationElement } from './animation-transparency'
import { isCIMMarker } from '@/typeguards/cim-marker'
import { isCIMSymbolColorAnimatable } from '@/typeguards/cim-symbol-color-animatable'
import { isCIMSymbolOffsetAnimatable } from '@/typeguards/cim-symbol-offset-animatable'
import { isCIMSymbolRotationAnimatable } from '@/typeguards/cim-symbol-rotation-animatable'

export function getAnimationElements<T extends CIMSymbolAnimation>(
  animation: T,
  layer: CIMSymbolLayerUnion
) {
  if (!animation.animatedSymbolProperties?.playAnimation) {
    return null
  }

  let el

  switch (animation.type) {
    case 'CIMSymbolAnimationColor':
      if (!isCIMSymbolColorAnimatable(layer)) {
        throw new TypeError(
          `Given CIMSymbolLayer does not implement color animations, received ${layer.type}`
        )
      }
      el = getColorAnimationElement(animation, layer)
      break
    case 'CIMSymbolAnimationOffset':
      if (!isCIMSymbolOffsetAnimatable(layer)) {
        throw new Error(
          `Given CIMSymbolLayer does not implement offset animations, received ${layer.type}`
        )
      }
      el = getOffsetAnimationElement(animation, layer)
      break
    case 'CIMSymbolAnimationRotation':
      if (!isCIMSymbolRotationAnimatable(layer)) {
        throw new Error(
          `Given CIMSymbolLayer does not implement rotation animations, received ${layer.type}`
        )
      }
      el = getRotationAnimationElement(animation, layer)
      break
    case 'CIMSymbolAnimationScale':
      el = getScaleAnimationElement(animation)
      break
    case 'CIMSymbolAnimationSize':
      if (!isCIMMarker(layer)) {
        throw new Error(
          `Given CIMSymbolLayer does not implement size animations, received ${layer.type}`
        )
      }
      el = getSizeAnimationElement(animation, layer)
      break
    case 'CIMSymbolAnimationTransparency':
      el = getTransparencyAnimationElement(animation)
      break
  }

  if (!animation.animatedSymbolProperties) {
    return el
  }

  const props = animation.animatedSymbolProperties // We checked this beforehand.
  let from = el.getAttribute('from')!
  let to = el.getAttribute('to')!

  if (props.reverseAnimation) {
    const tmp = from
    el.setAttribute('from', to)
    from = to
    el.setAttribute('to', tmp)
    to = tmp
  }

  if (props.repeatType === 'Loop') {
    el.setAttribute('repeatCount', 'indefinite')
  }

  const repeatDelay = props.repeatDelay || 0
  const durationAnimation = props.duration || 3
  const durationTotal = durationAnimation + repeatDelay
  const motionRatio = durationTotal / durationAnimation
  const halfRatio = motionRatio / 2

  el.setAttribute('dur', `${durationTotal}s`)

  const easeMap: Record<
    Exclude<CIMAnimatedSymbolProperties['easing'], undefined>,
    string
  > = {
    Linear: '0 0 1 1',
    EaseIn: '0.42 0 1 1',
    EaseOut: '0 0 0.58 1',
    EaseInOut: '0.42 0 0.58 1',
  }

  const bezier = props.easing ? easeMap[props.easing] : easeMap['Linear']

  let values = `${from}:${to}`
  let keySplines = bezier
  let keyTimes = '0;'

  if (props.repeatType === 'Oscillate') {
    values += `:${from}`
    keySplines += `;${bezier}`

    if (!repeatDelay) {
      keyTimes += `0.5;`
    }
  }

  if (repeatDelay) {
    keySplines += ';0 0 1 1'
    if (props.repeatType === 'Oscillate') {
      values += `:${from}`
      keyTimes += `${halfRatio};`
    } else {
      values += `:${to}`
    }

    keyTimes += `${motionRatio};`
  }

  keyTimes += '1'

  el.removeAttribute('from')
  el.removeAttribute('to')
  el.setAttribute('values', values)
  el.setAttribute('keyTimes', keyTimes)
  el.setAttribute('keySplines', keySplines)
  el.setAttribute('calcMode', 'spline')

  if (props.startTimeOffset) {
    el.setAttribute('begin', props.startTimeOffset.toString() + 's')
  }

  return el
}
