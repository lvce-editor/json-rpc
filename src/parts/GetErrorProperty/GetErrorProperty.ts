import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'

const getType = (prettyError: any) => {
  if (prettyError && prettyError.type) {
    return prettyError.type
  }
  if (prettyError && prettyError.constructor.name) {
    return prettyError.constructor.name
  }
  return undefined
}

export const getErrorProperty = (error: any, prettyError: any) => {
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
      type: getType(prettyError.type),
      code: prettyError.code,
      name: prettyError.name,
    },
  }
}
