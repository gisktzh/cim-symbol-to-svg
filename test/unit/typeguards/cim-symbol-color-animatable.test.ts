import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMSymbolColorAnimatable } from '@/typeguards/cim-symbol-color-animatable'

describe('isCIMSymbolColorAnimatable', () => {
  testLayerTypeGuard(isCIMSymbolColorAnimatable, [
    'CIMSolidFill',
    'CIMSolidStroke',
  ])
})
