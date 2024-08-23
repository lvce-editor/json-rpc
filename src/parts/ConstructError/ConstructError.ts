import * as GetErrorConstructor from '../GetErrorConstructor/GetErrorConstructor.ts'

export const constructError = (message: string, type: string, name: string) => {
  const ErrorConstructor = GetErrorConstructor.getErrorConstructor(
    message,
    type,
  )
  if (ErrorConstructor === DOMException && name) {
    return new ErrorConstructor(message, name)
  }
  if (ErrorConstructor === Error) {
    const error = new Error(message)
    if (name && name !== 'VError') {
      error.name = name
    }
    return error
  }
  return new ErrorConstructor(message)
}
