import * as Character from '../Character/Character.ts'
import * as ConstructError from '../ConstructError/ConstructError.ts'
import * as GetCurrentStack from '../GetCurrentStack/GetCurrentStack.ts'
import * as GetNewLineIndex from '../GetNewLineIndex/GetNewLineIndex.ts'
import * as GetParentStack from '../GetParentStack/GetParentStack.ts'
import { JsonRpcError } from '../JsonRpcError/JsonRpcError.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'

const restoreExistingError = (error: Error, currentStack: string): Error => {
  if (typeof error.stack === 'string') {
    error.stack = error.stack + Character.NewLine + currentStack
  }
  return error
}

const restoreMethodNotFoundError = (
  error: any,
  currentStack: string,
): Error => {
  const restoredError = new JsonRpcError(error.message)
  const parentStack = GetParentStack.getParentStack(error)
  restoredError.stack = parentStack + Character.NewLine + currentStack
  return restoredError
}

const restoreStackFromData = (
  restoredError: any,
  error: any,
  currentStack: string,
): void => {
  if (error.data.stack && error.data.type && error.message) {
    restoredError.stack =
      error.data.type +
      ': ' +
      error.message +
      Character.NewLine +
      error.data.stack +
      Character.NewLine +
      currentStack
    return
  }
  if (error.data.stack) {
    restoredError.stack = error.data.stack
  }
}

const applyDataProperties = (restoredError: any, error: any): void => {
  if (!error.data) {
    return
  }
  restoreStackFromData(restoredError, error, GetCurrentStack.getCurrentStack())
  if (error.data.codeFrame) {
    // @ts-ignore
    restoredError.codeFrame = error.data.codeFrame
  }
  if (error.data.code) {
    // @ts-ignore
    restoredError.code = error.data.code
  }
  if (error.data.type) {
    // @ts-ignore
    restoredError.name = error.data.type
  }
}

const applyDirectProperties = (restoredError: any, error: any): void => {
  if (error.stack) {
    const lowerStack = restoredError.stack || ''
    const indexNewLine = GetNewLineIndex.getNewLineIndex(lowerStack)
    const parentStack = GetParentStack.getParentStack(error)
    // @ts-ignore
    restoredError.stack = parentStack + lowerStack.slice(indexNewLine)
  }
  if (error.codeFrame) {
    // @ts-ignore
    restoredError.codeFrame = error.codeFrame
  }
}

const restoreMessageError = (error: any, currentStack: string): Error => {
  const restoredError = ConstructError.constructError(
    error.message,
    error.type,
    error.name,
  )
  if (error.data) {
    applyDataProperties(restoredError, error)
  } else {
    applyDirectProperties(restoredError, error)
  }
  return restoredError
}

export const restoreJsonRpcError = (error: any): any => {
  const currentStack = GetCurrentStack.getCurrentStack()
  if (error && error instanceof Error) {
    return restoreExistingError(error, currentStack)
  }
  if (error && error.code && error.code === JsonRpcErrorCode.MethodNotFound) {
    return restoreMethodNotFoundError(error, currentStack)
  }
  if (error && error.message) {
    return restoreMessageError(error, currentStack)
  }
  if (typeof error === 'string') {
    return new Error(`JsonRpc Error: ${error}`)
  }
  return new Error(`JsonRpc Error: ${error}`)
}
