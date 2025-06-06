import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'
import * as GetErrorType from '../GetErrorType/GetErrorType.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'

const isAlreadyStack = (line: string): boolean => {
  return line.trim().startsWith('at ')
}

const getStack = (prettyError: any): string => {
  const stackString = prettyError.stack || ''
  const newLineIndex = stackString.indexOf('\n')
  if (
    newLineIndex !== -1 &&
    !isAlreadyStack(stackString.slice(0, newLineIndex))
  ) {
    return stackString.slice(newLineIndex + 1)
  }
  return stackString
}

export const getErrorProperty = (error: any, prettyError: any): any => {
  if (error && error.code === ErrorCodes.E_COMMAND_NOT_FOUND) {
    return {
      code: JsonRpcErrorCode.MethodNotFound,
      message: error.message,
      data: error.stack,
    }
  }
  return {
    code: JsonRpcErrorCode.Custom,
    message: prettyError.message,
    data: {
      stack: getStack(prettyError),
      codeFrame: prettyError.codeFrame,
      type: GetErrorType.getErrorType(prettyError),
      code: prettyError.code,
      name: prettyError.name,
    },
  }
}
