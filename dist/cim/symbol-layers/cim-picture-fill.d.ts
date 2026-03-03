import { CIMPictureFill } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from './abstract-cim-symbol-layer-transformer';
declare const CIMPictureFillTransformer_base: (abstract new (...args: any[]) => {
    transformFill(fillValue: string | number[]): Attr[];
    layer: import("@arcgis/core/symbols/cim/types").CIMFill;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (...args: any[]) => {
    transformPicture(width?: number, height?: number): `${string}-${string}-${string}-${string}-${string}`;
    getImageEl(): SVGImageElement;
    layer: import("@arcgis/core/symbols/cim/types").CIMPictureMarker | CIMPictureFill | import("@arcgis/core/symbols/cim/types").CIMPictureStroke;
    globals: import("../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & (abstract new (layer: CIMPictureFill, globals: import("../..").Globals) => AbstractCIMSymbolLayerTransformer<CIMPictureFill>);
export declare class CIMPictureFillTransformer extends CIMPictureFillTransformer_base {
    getSvgAttrs(): Attr[];
    getSvgElements(): null;
}
export {};
//# sourceMappingURL=cim-picture-fill.d.ts.map