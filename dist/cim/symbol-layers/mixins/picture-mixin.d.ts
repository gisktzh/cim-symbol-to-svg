import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function PictureMixin<T extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<__esri.CIMPictureFill | __esri.CIMPictureMarker | __esri.CIMPictureStroke>>>(Base: T): (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: __esri.CIMPictureFill | __esri.CIMPictureMarker | __esri.CIMPictureStroke;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & T;
//# sourceMappingURL=picture-mixin.d.ts.map