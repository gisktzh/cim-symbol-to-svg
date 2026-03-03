import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMSymbolOffsetAnimatable } from '@/typeguards/cim-symbol-offset-animatable'

describe('isCIMSymbolOffsetAnimatable', () => {
  testLayerTypeGuard(isCIMSymbolOffsetAnimatable, [
    'CIMPictureMarker',
    'CIMVectorMarker',
    'CIMPictureFill',
    'CIMHatchFill',
  ])
})
