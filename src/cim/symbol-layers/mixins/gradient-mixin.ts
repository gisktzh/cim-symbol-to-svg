import { warn } from '@/utils/logging'
import { rgbaArrayToHex } from '../../../utils/color'
import { createEl } from '../../../utils/svg-el'
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer'
import type { AbstractConstructor } from './types'
import {
  CIMFixedColorRamp,
  CIMGradientFill,
  CIMGradientStroke,
  CIMLinearContinuousColorRamp,
  CIMMultipartColorRamp,
} from '@arcgis/core/symbols/cim/types'

export function GradientMixin<
  C extends AbstractConstructor<
    AbstractCIMSymbolLayerTransformer<CIMGradientFill | CIMGradientStroke>
  >,
>(Base: C) {
  abstract class MixinClass extends Base {
    getStops(
      colorRamp:
        | CIMLinearContinuousColorRamp
        | CIMFixedColorRamp
        | CIMMultipartColorRamp,
      startOffset: number,
      endOffset: number
    ): SVGStopElement[] {
      if (colorRamp.type === 'CIMLinearContinuousColorRamp') {
        const stop1 = createEl('stop')
        stop1.setAttribute('stop-color', rgbaArrayToHex(colorRamp.fromColor))
        stop1.setAttribute('offset', startOffset + '%')

        const stop2 = createEl('stop')
        stop2.setAttribute('stop-color', rgbaArrayToHex(colorRamp.toColor))
        stop2.setAttribute('offset', endOffset + '%')

        return [stop1, stop2]
      }
      if (colorRamp.type === 'CIMFixedColorRamp') {
        const offsetStepValue =
          (endOffset - startOffset) / colorRamp.colors.length - 1
        return colorRamp.colors.map((color, i) => {
          const stop = createEl('stop')
          stop.setAttribute('stop-color', rgbaArrayToHex(color))
          stop.setAttribute('offset', startOffset + i * offsetStepValue + '%')

          return stop
        })
      }
      if (colorRamp.type === 'CIMMultipartColorRamp') {
        const weights = [0, ...colorRamp.weights]
        return colorRamp.colorRamps
          .map((ramp, i) =>
            this.getStops(
              ramp,
              (endOffset - startOffset) * weights[i],
              (endOffset - startOffset) * weights[i + 1]
            )
          )
          .flat()
      }

      return []
    }

    transformGradient() {
      const stops = this.getStops(this.layer.colorRamp, 0, 100)
      let el!: SVGLinearGradientElement | SVGRadialGradientElement

      if (this.layer.gradientMethod === 'Linear') {
        el = createEl('linearGradient')
      }

      if (this.layer.gradientMethod === 'Circular') {
        el = createEl('radialGradient')
      }

      if (this.layer.gradientMethod === 'Rectangular') {
        el = createEl('linearGradient')
        warn('Rectangular gradients are currently not supported')
      }

      if (this.layer.gradientMethod === 'AcrossLine') {
        el = createEl('linearGradient')
        warn('AcrossLine gradients are currently not supported')
      }

      if (this.layer.gradientMethod === 'AlongLine') {
        el = createEl('linearGradient')
        warn('AlongLine gradients are currently not supported')
      }

      el.append(...stops)

      const gradientUuid = crypto.randomUUID()
      el.setAttribute('id', gradientUuid)
      this.globals.defs.push(el)

      if (!this.layer.gradientSize) {
        // Trivial case: Full-size gradient.
        return gradientUuid
      }

      if (
        this.layer.gradientSizeUnits === 'Relative' &&
        this.layer.gradientSize === 100
      ) {
        // Trivial case: Full-size gradient.
        return gradientUuid
      }

      const patternEl = createEl('pattern')
      const patternUuid = crypto.randomUUID()
      patternEl.setAttribute('viewBox', '0 0 100 100')

      const rectEl = createEl('rect')
      rectEl.setAttribute('height', '100')
      rectEl.setAttribute('fill', `url(#${gradientUuid})`)

      if (this.layer.gradientSizeUnits === 'Relative') {
        rectEl.setAttribute('width', this.layer.gradientSize.toString())
      } else {
        rectEl.setAttribute('width', '100')
        patternEl.setAttribute('width', this.layer.gradientSize.toString())
      }

      patternEl.appendChild(rectEl)
      patternEl.setAttribute('id', patternUuid)

      return patternUuid
    }
  }

  return MixinClass
}
