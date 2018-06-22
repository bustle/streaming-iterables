import { fromIterable } from './from-iterable'

export async function* parallelMerge (...iterables: Array<Iterable<any>>) {
  const inputs = iterables.map(fromIterable)
  const concurrentWork = new Set()
  const values = new Map()

  const queueNext = input => {
    const nextVal = Promise.resolve(input.next()).then(async ({ done, value }) => {
      if (!done) {
        values.set(input, value)
      }
      concurrentWork.delete(nextVal)
    })
    concurrentWork.add(nextVal)
  }

  for (const input of inputs) {
    queueNext(input)
  }

  while (true) {
    if (concurrentWork.size === 0) {
      return
    }
    await Promise.race(concurrentWork)
    for (const pair of values) {
      const [input, value] = pair
      values.delete(input)
      yield value
      queueNext(input)
    }
  }
}
