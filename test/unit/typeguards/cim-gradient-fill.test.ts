import { isCIMGradientFill } from '@/typeguards/cim-gradient-fill'
import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'

describe('isCIMGradientFill', () => {
  testLayerTypeGuard(isCIMGradientFill, ['CIMGradientFill'])
})
