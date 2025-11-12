import { describe, it, expect, vi } from 'vitest'
import { PictureMixin } from '@/cim/symbol-layers/mixins/picture-mixin'
import { AbstractCIMSymbolLayerTransformer } from '@/cim/symbol-layers/abstract-cim-symbol-layer-transformer'
import * as svgEl from '@/utils/svg-el'
import * as logging from '@/utils/logging'

describe('PictureMixin', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Base = class extends AbstractCIMSymbolLayerTransformer<any> {
    getSvgAttrs() {
      return []
    }
    getSvgElements() {
      return []
    }
  }

  const MixinClass = PictureMixin(Base)

  it('should create a pattern with image inside', () => {
    const createElSpy = vi.spyOn(svgEl, 'createEl')

    const fakeImage = { setAttribute: vi.fn() } as unknown as SVGImageElement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fakePattern = { appendChild: vi.fn(), setAttribute: vi.fn() } as any

    createElSpy.mockImplementation((tag: string) =>
      tag === 'image' ? fakeImage : fakePattern
    )

    const globals = { defs: [], dimensions: { width: -1, height: -1 } }
    const layer = { url: 'https://example.com/img.png' }
    const instance = new MixinClass(layer, globals)

    const uuid = instance.transformPicture(100, 200)

    expect(createElSpy).toHaveBeenCalledWith('image')
    expect(createElSpy).toHaveBeenCalledWith('pattern')
    expect(fakePattern.appendChild).toHaveBeenCalledWith(fakeImage)
    expect(fakePattern.setAttribute).toHaveBeenCalledWith('width', '100')
    expect(fakePattern.setAttribute).toHaveBeenCalledWith('height', '200')
    expect(fakePattern.setAttribute).toHaveBeenCalledWith(
      'patternUnits',
      'userSpaceOnUse'
    )
    expect(fakePattern.setAttribute).toHaveBeenCalledWith('id', uuid)
    expect(globals.defs).toContain(fakePattern)
  })

  it('should create an image element with the right attributes', () => {
    const createElSpy = vi.spyOn(svgEl, 'createEl')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fakeImage = { setAttribute: vi.fn() } as any
    createElSpy.mockReturnValue(fakeImage)

    const instance = new MixinClass(
      { url: 'https://example.com/img.png' },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )
    const el = instance.getImageEl()

    expect(el).toBe(fakeImage)
    expect(fakeImage.setAttribute).toHaveBeenCalledWith(
      'href',
      'https://example.com/img.png'
    )
    expect(fakeImage.setAttribute).toHaveBeenCalledWith(
      'xlink:href',
      'https://example.com/img.png'
    )
    expect(fakeImage.setAttribute).toHaveBeenCalledWith(
      'crossorigin',
      'anonymous'
    )
  })

  it('should warn when colorSubstitutions is present', () => {
    const createElSpy = vi.spyOn(svgEl, 'createEl')
    const warnSpy = vi.spyOn(logging, 'warn').mockImplementation(() => {})

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fakeImage = { setAttribute: vi.fn() } as any
    createElSpy.mockReturnValue(fakeImage)

    const instance = new MixinClass(
      { url: 'img.png', colorSubstitutions: true },
      { defs: [], dimensions: { width: -1, height: -1 } }
    )
    instance.getImageEl()

    expect(warnSpy).toHaveBeenCalledWith(
      'Color substitution is currently not supported'
    )
  })
})
