import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMStroke } from '@/typeguards/cim-stroke'

describe('isCIMStroke', () => {
  testLayerTypeGuard(isCIMStroke, [
    'CIMSolidStroke',
    'CIMPictureStroke',
    'CIMGradientStroke',
  ])
})
