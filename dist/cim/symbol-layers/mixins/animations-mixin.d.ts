import { CIMPictureMarker, CIMSolidFill, CIMSolidStroke, CIMVectorMarker } from '@arcgis/core/symbols/cim/types';
import { AbstractCIMSymbolLayerTransformer } from '../abstract-cim-symbol-layer-transformer';
import type { AbstractConstructor } from './types';
export declare function AnimationsMixin<C extends AbstractConstructor<AbstractCIMSymbolLayerTransformer<T>>, T extends CIMPictureMarker | CIMSolidFill | CIMSolidStroke | CIMVectorMarker>(Base: C): (abstract new (...args: any[]) => {
    getAnimationElements(): SVGAnimateElement[];
    layer: T;
    globals: import("../../..").Globals;
    getSvgAttrs(): Attr[];
    getSvgElements(): SVGElement[] | null;
}) & C;
//# sourceMappingURL=animations-mixin.d.ts.map