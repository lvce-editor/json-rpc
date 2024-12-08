const callbacks = Object.create(null)

export const set = (id: number, fn: any): void => {
  callbacks[id] = fn
}

export const get = (id: number): any => {
  return callbacks[id]
}

export const remove = (id: number): void => {
  delete callbacks[id]
}

export const clear = (): void => {
  for (const key in callbacks) {
    delete callbacks[key]
  }
}
