import { isCIMHatchFill } from '@/typeguards/cim-hatch-fill'
import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'

describe('isCIMHatchFill', () => {
  testLayerTypeGuard(isCIMHatchFill, ['CIMHatchFill'])
})
