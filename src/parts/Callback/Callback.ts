import * as Assert from '../Assert/Assert.ts'
import * as CallbackState from '../CallbackState/CallbackState.ts'
import * as Id from '../Id/Id.ts'
import * as Logger from '../Logger/Logger.ts'

interface RegisteredPromise<T = unknown> {
  readonly id: number
  readonly promise: Promise<T>
}

export const registerPromise = <T = unknown>(): RegisteredPromise<T> => {
  const id = Id.create()
  const { resolve, promise } = Promise.withResolvers<T>()
  CallbackState.set(id, resolve)
  return { id, promise }
}

export const resolve = (id: number, response: any): void => {
  Assert.number(id)
  const fn = CallbackState.get(id)
  if (!fn) {
    console.log(response)
    Logger.warn(`callback ${id} may already be disposed`)
    return
  }
  fn(response)
  CallbackState.remove(id)
}
