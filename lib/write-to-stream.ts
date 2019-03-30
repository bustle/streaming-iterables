/// <reference lib="esnext.asynciterable" />
import { AnyIterable } from './types'

interface IWritable {
  off: any
  once: any
  write: any
}

function waitForDrain(stream: IWritable) {
  return new Promise(resolve => {
    stream.once('drain', resolve)
  })
}

async function _writeToStream(stream: IWritable, iterable: AnyIterable<any>) {
  let error: Error | undefined
  function errorHandler(err: Error) {
    error = err
  }
  stream.once('error', errorHandler)

  for await (const value of iterable) {
    if (error) {
      throw error
    }

    if (stream.write(value) === false) {
      await waitForDrain(stream)
    }
  }

  stream.off('error', errorHandler)
}

export function writeToStream(stream: IWritable): (iterable: AnyIterable<any>) => Promise<void>
export function writeToStream(stream: IWritable, iterable: AnyIterable<any>): Promise<void>
export function writeToStream(stream: IWritable, iterable?: AnyIterable<any>) {
  if (iterable === undefined) {
    return (curriedIterable: AnyIterable<any>) => _writeToStream(stream, curriedIterable)
  }
  return _writeToStream(stream, iterable)
}
