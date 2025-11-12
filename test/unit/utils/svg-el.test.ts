import { describe, it, expect } from 'vitest'
import { createEl } from '@/utils/svg-el'

describe('svg-el.ts', () => {
  it('should create an SVG element with the correct tag name', () => {
    const rect = createEl('rect')
    expect(rect.tagName).toBe('rect')

    const circle = createEl('circle')
    expect(circle.tagName).toBe('circle')

    const line = createEl('line')
    expect(line.tagName).toBe('line')
  })

  it('should create the correct type of element based on the tag name', () => {
    const rect = createEl('rect')
    expect(rect).toBeInstanceOf(SVGElement)
    expect(rect.tagName).toBe('rect')

    const circle = createEl('circle')
    expect(circle).toBeInstanceOf(SVGElement)
    expect(circle.tagName).toBe('circle')

    const line = createEl('line')
    expect(line).toBeInstanceOf(SVGElement)
    expect(line.tagName).toBe('line')

    const path = createEl('path')
    expect(path).toBeInstanceOf(SVGElement)
    expect(path.tagName).toBe('path')
  })
})
