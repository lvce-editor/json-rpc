import * as CallbackState from '../CallbackState/CallbackState.ts'
import * as Logger from '../Logger/Logger.ts'

export const resolve = (id: number, response: any): void => {
  const fn = CallbackState.get(id)
  if (!fn) {
    console.log(response)
    Logger.warn(`callback ${id} may already be disposed`)
    return
  }
  fn(response)
  CallbackState.remove(id)
}
