const state = {
  callbacks: Object.create(null),
}

export const set = (id: number, fn: any): void => {
  state.callbacks[id] = fn
}

export const get = (id: number): any => {
  return state.callbacks[id]
}

export const remove = (id: number): void => {
  delete state.callbacks[id]
}

export const clear = (): void => {
  state.callbacks = Object.create(null)
}
