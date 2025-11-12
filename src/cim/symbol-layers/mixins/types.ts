// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T
