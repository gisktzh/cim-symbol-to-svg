import { describe, it, expect } from 'vitest'
import { createAttr } from '@/utils/attr'

describe('createAttr', () => {
  it('should create an attribute with the given name and text content', () => {
    const attr = createAttr('fill', 'red')

    expect(attr).toBeInstanceOf(Attr)
    expect(attr.name).toBe('fill')
    expect(attr.textContent).toBe('red')
  })

  it('should handle null text content', () => {
    const attr = createAttr('stroke', null)

    expect(attr).toBeInstanceOf(Attr)
    expect(attr.name).toBe('stroke')
    expect(attr.textContent).toBe('')
  })
})
