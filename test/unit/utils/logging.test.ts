import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { log, warn, error } from '@/utils/logging'

describe('logging.ts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should log a message to the console', () => {
    const message = 'Test log message'

    log(message)

    expect(console.log).toHaveBeenCalledWith('[cim-symbol-to-svg]', message)
  })

  it('should warn a message to the console', () => {
    const message = 'Test warn message'

    warn(message)

    expect(console.warn).toHaveBeenCalledWith('[cim-symbol-to-svg]', message)
  })

  it('should log an error message to the console', () => {
    const message = 'Test error message'

    error(message)

    expect(console.error).toHaveBeenCalledWith('[cim-symbol-to-svg]', message)
  })
})
