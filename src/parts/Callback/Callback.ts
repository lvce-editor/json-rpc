import * as Assert from '../Assert/Assert.ts'
import * as CallbackState from '../CallbackState/CallbackState.ts'
import * as Id from '../Id/Id.ts'
import * as Logger from '../Logger/Logger.ts'

export const registerPromise = () => {
  const id = Id.create()
  const { resolve, promise } = Promise.withResolvers()
  CallbackState.set(id, resolve)
  return { id, promise }
}

export const resolve = (id: number, args: any) => {
  Assert.number(id)
  const fn = CallbackState.get(id)
  if (!fn) {
    console.log(args)
    Logger.warn(`callback ${id} may already be disposed`)
    return
  }
  fn(args)
  CallbackState.remove(id)
}
