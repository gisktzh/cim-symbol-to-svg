import { CIMPictureFill, CIMPictureMarker, CIMPictureStroke } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function PictureMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<CIMPictureFill | CIMPictureMarker | CIMPictureStroke>>>(Base: C): (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: CIMPictureMarker | CIMPictureFill | CIMPictureStroke;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=picture-mixin.d.ts.map