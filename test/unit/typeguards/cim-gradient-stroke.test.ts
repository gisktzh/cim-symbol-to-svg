import { isCIMGradientStroke } from '@/typeguards/cim-gradient-stroke'
import { describe } from 'vitest'
import testLayerTypeGuard from '../../test-utils/test-layer-type-guard'

describe('isCIMGradientStroke', () => {
  testLayerTypeGuard(isCIMGradientStroke, ['CIMGradientStroke'])
})
