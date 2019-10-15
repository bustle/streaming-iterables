/// <reference lib="es2018.asynciterable" />

if ((Symbol as any).asyncIterator === undefined) {
  ;(Symbol as any).asyncIterator = Symbol.for('asyncIterator')
}

export { batch } from './batch'
export { buffer } from './buffer'
export { collect } from './collect'
export { concat } from './concat'
export { consume } from './consume'
export { filter } from './filter'
export { flatMap } from './flat-map'
export { flatten } from './flatten'
export { flatTransform } from './flat-transform'
export { fromStream } from './from-stream'
export { getIterator } from './get-iterator'
export { Iterableish, AnyIterable } from './types'
export { map } from './map'
export { merge } from './merge'
export { parallelFlatMap } from './parallel-flat-map'
export { parallelMap } from './parallel-map'
export { parallelMerge } from './parallel-merge'
export { pipeline } from './pipeline'
export { reduce } from './reduce'
export { take } from './take'
export { tap } from './tap'
export { time } from './time'
export { transform } from './transform'
export { writeToStream } from './write-to-stream'
