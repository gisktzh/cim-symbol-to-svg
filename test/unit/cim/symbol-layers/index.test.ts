import { describe, it, expect, vi } from 'vitest'
import {
  cimSymbolLayerToSvgAttrs,
  cimSymbolLayerToSvgElement,
} from '@/cim/symbol-layers'
import { Globals } from '@/index'
import { CIMVectorMarkerTransformer } from '@/cim/symbol-layers/cim-vector-marker'
import { CIMSolidStrokeTransformer } from '@/cim/symbol-layers/cim-solid-stroke'
import { CIMSolidFillTransformer } from '@/cim/symbol-layers/cim-solid-fill'
import { CIMPictureStrokeTransformer } from '@/cim/symbol-layers/cim-picture-stroke'
import { CIMPictureMarkerTransformer } from '@/cim/symbol-layers/cim-picture-marker'
import { CIMPictureFillTransformer } from '@/cim/symbol-layers/cim-picture-fill'
import { CIMHatchFillTransformer } from '@/cim/symbol-layers/cim-hatch-fill'
import { CIMGradientStrokeTransformer } from '@/cim/symbol-layers/cim-gradient-stroke'
import { CIMGradientFillTransformer } from '@/cim/symbol-layers/cim-gradient-fill'
import { createAttr } from '../../../test-utils/attr'
import {
  CIMGradientFill,
  CIMGradientStroke,
  CIMHatchFill,
  CIMPictureFill,
  CIMPictureMarker,
  CIMPictureStroke,
  CIMSolidFill,
  CIMSolidStroke,
  CIMVectorMarker,
} from '@arcgis/core/symbols/cim/types'

describe('index.ts', () => {
  const globals: Globals = { defs: [], dimensions: { width: -1, height: -1 } }

  it('should call getSvgAttrs and return correct attributes for CIMSolidFill', () => {
    const fakeLayer: CIMSolidFill = {
      type: 'CIMSolidFill',
      color: [255, 0, 0, 255],
      enable: true,
    }
    const widthAttr = createAttr('stroke-width', '2')
    const spy = vi
      .spyOn(CIMSolidFillTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([widthAttr])
    const attrs = cimSymbolLayerToSvgAttrs(fakeLayer, globals)
    expect(attrs).toEqual([widthAttr])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgElements and return correct elements for CIMVectorMarker', () => {
    const vectorLayer: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      markerGraphics: [],
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      size: 0,
      enable: true,
    }
    const spy = vi
      .spyOn(CIMVectorMarkerTransformer.prototype, 'getSvgElements')
      .mockReturnValue([
        document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      ])
    const elements = cimSymbolLayerToSvgElement(vectorLayer, globals)
    expect(elements).toHaveLength(1)
    expect(elements![0].tagName).toBe('circle')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should get the correct transformer and call getSvgAttrs for CIMGradientFill', () => {
    const gradientFillLayer: CIMGradientFill = {
      type: 'CIMGradientFill',
      colorRamp: {
        type: 'CIMLinearContinuousColorRamp',
        fromColor: [0, 0, 0, 1],
        toColor: [255, 255, 255, 1],
      },
      enable: true,
    }
    const strokeAttr = createAttr('stroke', 'url(#grad)')
    const spy = vi
      .spyOn(CIMGradientFillTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([strokeAttr])
    const attrs = cimSymbolLayerToSvgAttrs(gradientFillLayer, globals)
    expect(attrs).toEqual([strokeAttr])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should get the correct transformer and call getSvgElements for CIMPictureFill', () => {
    const pictureFillLayer: CIMPictureFill = {
      type: 'CIMPictureFill',
      url: 'image.png',
      height: 0,
      enable: true,
    }
    const spy = vi
      .spyOn(CIMPictureFillTransformer.prototype, 'getSvgElements')
      .mockReturnValue(null)
    const elements = cimSymbolLayerToSvgElement(pictureFillLayer, globals)
    expect(elements).toBe(null)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgAttrs for CIMSolidStroke', () => {
    const solidStrokeLayer: CIMSolidStroke = {
      type: 'CIMSolidStroke',
      color: [0, 0, 255, 255],
      width: 0,
      enable: true,
    }
    const strokeAttr = createAttr('stroke', '#0000ff')
    const spy = vi
      .spyOn(CIMSolidStrokeTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([strokeAttr])
    const attrs = cimSymbolLayerToSvgAttrs(solidStrokeLayer, globals)
    expect(attrs).toEqual([strokeAttr])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgElements for CIMPictureStroke', () => {
    const pictureStrokeLayer: CIMPictureStroke = {
      type: 'CIMPictureStroke',
      url: 'stroke.png',
      width: 0,
      enable: true,
    }
    const spy = vi
      .spyOn(CIMPictureStrokeTransformer.prototype, 'getSvgElements')
      .mockReturnValue(null)
    const elements = cimSymbolLayerToSvgElement(pictureStrokeLayer, globals)
    expect(elements).toBeNull()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgAttrs for CIMGradientStroke', () => {
    const gradientStrokeLayer: CIMGradientStroke = {
      type: 'CIMGradientStroke',
      colorRamp: {
        type: 'CIMLinearContinuousColorRamp',
        fromColor: [0, 0, 0, 1],
        toColor: [255, 255, 255, 1],
      },
      width: 0,
      enable: true,
    }
    const strokeAttr = createAttr('stroke', 'url(#gradStroke)')
    const spy = vi
      .spyOn(CIMGradientStrokeTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([strokeAttr])
    const attrs = cimSymbolLayerToSvgAttrs(gradientStrokeLayer, globals)
    expect(attrs).toEqual([strokeAttr])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgAttrs for CIMHatchFill', () => {
    const hatchFillLayer: CIMHatchFill = {
      type: 'CIMHatchFill',
      lineSymbol: {
        type: 'CIMLineSymbol',
      },
      separation: 10,
      enable: true,
    }
    const strokeAttr = createAttr('stroke', '#ff0000')
    const spy = vi
      .spyOn(CIMHatchFillTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([strokeAttr])
    const attrs = cimSymbolLayerToSvgAttrs(hatchFillLayer, globals)
    expect(attrs).toEqual([strokeAttr])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgAttrs for CIMPictureMarker', () => {
    const pictureMarkerLayer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      size: 20,
      url: 'marker.png',
      enable: true,
    }

    const spy = vi
      .spyOn(CIMPictureMarkerTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([])
    const attrs = cimSymbolLayerToSvgAttrs(pictureMarkerLayer, globals)
    expect(attrs).toEqual([])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgElements for CIMPictureMarker', () => {
    const pictureMarkerLayer: CIMPictureMarker = {
      type: 'CIMPictureMarker',
      url: 'marker.png',
      size: 0,
      enable: true,
    }
    const spy = vi
      .spyOn(CIMPictureMarkerTransformer.prototype, 'getSvgElements')
      .mockReturnValue([
        document.createElementNS('http://www.w3.org/2000/svg', 'image'),
      ])
    const elements = cimSymbolLayerToSvgElement(pictureMarkerLayer, globals)
    expect(elements).toHaveLength(1)
    expect(elements![0].tagName).toBe('image')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should call getSvgAttrs for CIMVectorMarker', () => {
    const vectorMarkerLayer: CIMVectorMarker = {
      type: 'CIMVectorMarker',
      markerGraphics: [],
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
      size: 0,
      enable: false,
    }
    const spy = vi
      .spyOn(CIMVectorMarkerTransformer.prototype, 'getSvgAttrs')
      .mockReturnValue([])
    const attrs = cimSymbolLayerToSvgAttrs(vectorMarkerLayer, globals)
    expect(attrs).toEqual([])
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
