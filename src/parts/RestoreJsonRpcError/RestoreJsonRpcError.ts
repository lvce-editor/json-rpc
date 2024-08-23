import * as Character from '../Character/Character.ts'
import * as ConstructError from '../ConstructError/ConstructError.ts'
import * as GetNewLineIndex from '../GetNewLineIndex/GetNewLineIndex.ts'
import * as GetParentStack from '../GetParentStack/GetParentStack.ts'
import * as JoinLines from '../JoinLines/JoinLines.ts'
import { JsonRpcError } from '../JsonRpcError/JsonRpcError.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const restoreJsonRpcError = (error: any) => {
  if (error && error instanceof Error) {
    return error
  }
  const currentStack = JoinLines.joinLines(
    SplitLines.splitLines(new Error().stack!).slice(1),
  )
  if (error && error.code && error.code === JsonRpcErrorCode.MethodNotFound) {
    const restoredError = new JsonRpcError(error.message)
    const parentStack = GetParentStack.getParentStack(error)
    restoredError.stack = parentStack + Character.NewLine + currentStack
    return restoredError
  }
  if (error && error.message) {
    const restoredError = ConstructError.constructError(
      error.message,
      error.type,
      error.name,
    )
    if (error.data) {
      if (error.data.stack && error.data.type && error.message) {
        restoredError.stack =
          error.data.type +
          ': ' +
          error.message +
          Character.NewLine +
          error.data.stack +
          Character.NewLine +
          currentStack
      } else if (error.data.stack) {
        restoredError.stack = error.data.stack
      }
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
    } else {
      if (error.stack) {
        const lowerStack = restoredError.stack || ''
        // @ts-ignore
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
    return restoredError
  }
  if (typeof error === 'string') {
    return new Error(`JsonRpc Error: ${error}`)
  }
  return new Error(`JsonRpc Error: ${error}`)
}
