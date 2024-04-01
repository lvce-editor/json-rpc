import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.js'
import * as JsonRpcErrorResponse from '../JsonRpcErrorResponse/JsonRpcErrorResponse.js'
import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

const getErrorProperty = (error, prettyError) => {
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
      stack: prettyError.stack,
      codeFrame: prettyError.codeFrame,
      type: prettyError.type,
      code: prettyError.code,
    },
  }
}

export const getErrorResponse = (
  message,
  error,
  ipc,
  preparePrettyError,
  logError,
) => {
  const prettyError = preparePrettyError(error)
  logError(error, prettyError)
  const errorProperty = getErrorProperty(error, prettyError)
  return JsonRpcErrorResponse.create(message, errorProperty)
}
