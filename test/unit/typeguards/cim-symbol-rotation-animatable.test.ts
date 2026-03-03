import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMSymbolRotationAnimatable } from '@/typeguards/cim-symbol-rotation-animatable'

describe('isCIMSymbolRotationAnimatable', () => {
  testLayerTypeGuard(isCIMSymbolRotationAnimatable, [
    'CIMPictureMarker',
    'CIMVectorMarker',
    'CIMPictureFill',
    'CIMHatchFill',
  ])
})
