import * as Assert from '../Assert/Assert.ts'
import * as CallbackState from '../CallbackState/CallbackState.ts'
import * as Id from '../Id/Id.ts'
import * as Logger from '../Logger/Logger.ts'
import * as Promises from '../Promises/Promises.ts'

export const registerPromise = () => {
  const id = Id.create()
  const { resolve, promise } = Promises.withResolvers()
  CallbackState.state.callbacks[id] = resolve
  return { id, promise }
}

export const resolve = (id, args) => {
  Assert.number(id)
  if (!(id in CallbackState.state.callbacks)) {
    console.log(args)
    Logger.warn(`callback ${id} may already be disposed`)
    return
  }
  CallbackState.state.callbacks[id](args)
  delete CallbackState.state.callbacks[id]
}
