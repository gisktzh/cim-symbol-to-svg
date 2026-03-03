import { isCIMPictureFill } from '@/typeguards/cim-picture-fill'
import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'

describe('isCIMPictureFill', () => {
  testLayerTypeGuard(isCIMPictureFill, ['CIMPictureFill'])
})
