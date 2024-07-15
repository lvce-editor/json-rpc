import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'
import * as JsonRpcErrorResponse from '../JsonRpcErrorResponse/JsonRpcErrorResponse.ts'
import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

const getErrorProperty = (error: any, prettyError: any) => {
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
  message: any,
  error: any,
  preparePrettyError: any,
  logError: any,
) => {
  const prettyError = preparePrettyError(error)
  logError(error, prettyError)
  const errorProperty = getErrorProperty(error, prettyError)
  return JsonRpcErrorResponse.create(message, errorProperty)
}
