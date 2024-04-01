const state = {
  callbacks: Object.create(null),
}

export const set = (id, fn) => {
  state.callbacks[id] = fn
}

export const get = (id) => {
  return state.callbacks[id]
}

export const remove = (id) => {
  delete state.callbacks[id]
}
