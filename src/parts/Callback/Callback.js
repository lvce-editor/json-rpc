import * as Assert from '../Assert/Assert.js'
import * as CallbackState from '../CallbackState/CallbackState.js'
import * as Id from '../Id/Id.js'
import * as Logger from '../Logger/Logger.js'
import * as Promises from '../Promises/Promises.js'

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
