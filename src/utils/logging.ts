// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(payload: any) {
  console.log('[cim-symbol-to-svg]', payload)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(payload: any) {
  console.warn('[cim-symbol-to-svg]', payload)
  console.trace()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function error(payload: any) {
  console.error('[cim-symbol-to-svg]', payload)
}
