import { describe, it, expect } from 'vitest'
import { MarkerMixin } from '@/cim/symbol-layers/mixins/marker-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { createAttr } from '@/utils/attr'
import { CIMMarker, CIMSymbolUnits } from '@arcgis/core/symbols/cim/types'
import { Point } from '@arcgis/core/portal/jsonTypes'

class MockCIMSymbolLayer implements CIMMarker {
  size: number = 12
  type!: 'MockCIMSymbolLayer'
  enable: boolean = true
  rotation?: number = 42
  rotateClockwise?: boolean = true
  anchorPoint?: Point = undefined
  anchorPointUnits?: CIMSymbolUnits = undefined
}

describe('MarkerMixin', () => {
  const Base = class extends AbstractCIMSymbolLayerTransformer<MockCIMSymbolLayer> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = MarkerMixin(Base)

  it('should return empty array when no rotation', () => {
    const layer: MockCIMSymbolLayer = {
      size: 0,
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })
    expect(instance.getRotationAttrs()).toEqual([])
  })

  it('should apply rotation correctly when rotateClockwise is true', () => {
    const layer: MockCIMSymbolLayer = {
      rotation: 45,
      rotateClockwise: true,
      size: 0,
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })
    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(45)'),
      createAttr('transform-origin', 'center'),
    ])
  })

  it('should apply rotation correctly when rotateClockwise is false', () => {
    const layer: MockCIMSymbolLayer = {
      rotation: 30,
      rotateClockwise: false,
      size: 0,
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })
    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(-30)'),
      createAttr('transform-origin', 'center'),
    ])
  })

  it('should include transform-origin when anchorPoint is defined', () => {
    const layer: MockCIMSymbolLayer = {
      rotation: 90,
      rotateClockwise: true,
      anchorPoint: { x: 10, y: 20 },
      size: 0,
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })

    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(90)'),
      createAttr('transform-origin', '10 20'),
    ])
  })

  it('should use % for transform-origin when anchorPointUnits is Relative', () => {
    const layer: MockCIMSymbolLayer = {
      rotation: 90,
      rotateClockwise: true,
      anchorPoint: { x: 10, y: 20 },
      anchorPointUnits: 'Relative',
      size: 0,
      type: 'MockCIMSymbolLayer',
      enable: true,
    }

    const instance = new MixinClass(layer, {
      defs: [],
      dimensions: { width: -1, height: -1 },
    })

    expect(instance.getRotationAttrs()).toEqual([
      createAttr('transform', 'rotate(90)'),
      createAttr('transform-origin', '10% 20%'),
    ])
  })
})
