import { assert } from 'chai'
import { flatMap } from '.'
import { AnyIterable } from './types'

async function* asyncValues<T>(values: AnyIterable<T>) {
  for await (const value of values) {
    yield value
  }
}

describe('flatmap', () => {
  it('flattens arrays', async () => {
    const numbers: number[] = []
    for await (const num of flatMap(i => i, [1, 2, [3, 4, 5, 6], 7, [8]])) {
      numbers.push(num)
    }
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('flattens async and sync iterables', async () => {
    const numbers: number[] = []
    const values = asyncValues([1, 2, asyncValues([3, 4, 5, 6]), 7, [8]])
    for await (const num of flatMap(i => i, values)) {
      numbers.push(num)
    }
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8])
  })
  it('ignores null and undefined values', async () => {
    const numbers: number[] = []
    const values = asyncValues([1, undefined, null, 2, asyncValues([3, 4, undefined, 5, 6]), 7, [8], null])
    for await (const num of flatMap(i => i, values)) {
      numbers.push(num as number)
    }
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8])
  })
})
