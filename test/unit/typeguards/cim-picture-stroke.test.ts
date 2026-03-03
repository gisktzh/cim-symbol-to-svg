import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'
import { isCIMPictureStroke } from '@/typeguards/cim-picture-stroke'

describe('isCIMPictureStroke', () => {
  testLayerTypeGuard(isCIMPictureStroke, ['CIMPictureStroke'])
})
