import { describe, it, expect } from 'vitest'
import { MarkerMixin } from '@/cim/symbol-layers/mixins/marker-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { createAttr } from '@/utils/attr'

describe('MarkerMixin', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Base = class extends AbstractCIMSymbolLayerTransformer<any> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = MarkerMixin(Base)

  it('should return empty array when no rotation', () => {
    const instance = new MixinClass(
      {},
      { defs: [], dimensions: { width: -1, height: -1 } }
    )
    expect(instance.getRotationAttrs()).toEqual([])
  })

  it('should apply rotation correctly when rotateClockwise is true', () => {
    const instance = new MixinClass(
      { rotation: 45, rotateClockwise: true },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )
    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(45)'),
    ])
  })

  it('should apply rotation correctly when rotateClockwise is false', () => {
    const instance = new MixinClass(
      { rotation: 30, rotateClockwise: false },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )
    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(-30)'),
    ])
  })

  it('should include transform-origin when anchorPoint is defined', () => {
    const instance = new MixinClass(
      {
        rotation: 90,
        rotateClockwise: true,
        anchorPoint: { x: 10, y: 20 },
      },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )

    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(90)'),
      createAttr('transform-origin', '10 20'),
    ])
  })

  it('should use % for transform-origin when anchorPointUnits is Relative', () => {
    const instance = new MixinClass(
      {
        rotation: 90,
        rotateClockwise: true,
        anchorPoint: { x: 10, y: 20 },
        anchorPointUnits: 'Relative',
      },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )

    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(90)'),
      createAttr('transform-origin', '10% 20%'),
    ])
  })
})
