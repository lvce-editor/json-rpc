export const create = (() => {
  let id = 0
  return (): number => {
    return ++id
  }
})()
