import {
  CIMAnimatedSymbolProperties,
  CIMMarkerGraphic,
  CIMSymbolAnimationSize,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AnimationsMixin } from '@/cim/symbol-layers/mixins/animations-mixin'
import { getAnimationElements } from '@/cim/animations'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { Globals } from '@/index'
import { Extent } from '@arcgis/core/portal/jsonTypes'

vi.mock('@/cim/animations', () => ({
  getAnimationElements: vi.fn(),
}))

class MockAniamtion implements CIMSymbolAnimationSize {
  type!: 'CIMSymbolAnimationSize'
  toSize: number = 12
  animatedSymbolProperties?: CIMAnimatedSymbolProperties | undefined
  id: number = -1
}

class MockCIMSymbolLayer implements CIMVectorMarker {
  type!: 'CIMVectorMarker'
  frame: Extent = {
    xmin: 0,
    ymin: 0,
    xmax: 0,
    ymax: 0,
  }
  markerGraphics: CIMMarkerGraphic[] = []
  size: number = 12
  enable: boolean = true
  animations: MockAniamtion[] = []
}

describe('AnimationsMixin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  class TestTransformer extends AbstractCIMSymbolLayerTransformer<MockCIMSymbolLayer> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = AnimationsMixin(TestTransformer)

  it('returns animation elements and filters out nulls', () => {
    const fakeEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    )

    const spy = vi
      .mocked(getAnimationElements<MockAniamtion>)
      .mockImplementation((anim) => (anim.id === 1 ? fakeEl : null))

    const globals: Globals = {
      defs: [],
      dimensions: {
        width: 0,
        height: 0,
      },
    }

    const layer: MockCIMSymbolLayer = {
      animations: [
        {
          id: 1,
          type: 'CIMSymbolAnimationSize',
          toSize: 0,
        },
        {
          id: 2,
          type: 'CIMSymbolAnimationSize',
          toSize: 0,
        },
      ],
      type: 'CIMVectorMarker',
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      markerGraphics: [],
      size: 0,
      enable: false,
    }

    const instance = new MixinClass(layer, globals)

    const result = instance.getAnimationElements()
    expect(result).toEqual([fakeEl])
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('returns empty array if layer has no animations', () => {
    const globals: Globals = {
      defs: [],
      dimensions: {
        width: 0,
        height: 0,
      },
    }

    const layer: MockCIMSymbolLayer = {
      animations: [],
      type: 'CIMVectorMarker',
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      markerGraphics: [],
      size: 0,
      enable: false,
    }

    const instance = new MixinClass(layer, globals)

    const result = instance.getAnimationElements()
    expect(result).toEqual([])
  })
})
