import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AnimationsMixin } from '@/cim/symbol-layers/mixins/animations-mixin'
import { getAnimationElements } from '@/cim/animations'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import { Globals } from '@/index'

vi.mock('@/cim/animations', () => ({
  getAnimationElements: vi.fn(),
}))

describe('AnimationsMixin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class TestTransformer extends AbstractCIMSymbolLayerTransformer<any> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = AnimationsMixin(TestTransformer)

  it('returns animation elements and filters out nulls', () => {
    const fakeEl1 = {} as SVGElement

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(getAnimationElements as any).mockImplementation((anim: any) =>
      anim.id === 1 ? fakeEl1 : null
    )

    const instance = new MixinClass(
      { animations: [{ id: 1 }, { id: 2 }] },
      {} as Globals
    )

    const result = instance.getAnimationElements()
    expect(result).toEqual([fakeEl1])
    expect(getAnimationElements).toHaveBeenCalledTimes(2)
  })

  it('returns undefined if layer has no animations', () => {
    const instance = new MixinClass({ animations: undefined }, {} as Globals)

    const result = instance.getAnimationElements()
    expect(result).toBeUndefined()
  })
})
