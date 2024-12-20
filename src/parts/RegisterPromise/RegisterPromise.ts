import * as CallbackState from '../CallbackState/CallbackState.ts'
import * as Id from '../Id/Id.ts'
import type { RegisteredPromise } from '../RegisteredPromise/RegisteredPromise.ts'


export const registerPromise = <T = unknown>(): RegisteredPromise<T> => {
  const id = Id.create()
  const { resolve, promise } = Promise.withResolvers<T>()
  CallbackState.set(id, resolve)
  return { id, promise }
}