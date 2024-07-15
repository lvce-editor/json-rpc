const state = {
  callbacks: Object.create(null),
}

export const set = (id: number, fn: any) => {
  state.callbacks[id] = fn
}

export const get = (id: number) => {
  return state.callbacks[id]
}

export const remove = (id: number) => {
  delete state.callbacks[id]
}

export const clear = () => {
  state.callbacks = Object.create(null)
}
