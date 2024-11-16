import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'
import * as GetErrorType from '../GetErrorType/GetErrorType.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'

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
      stack: prettyError.stack,
      codeFrame: prettyError.codeFrame,
      type: GetErrorType.getErrorType(prettyError),
      code: prettyError.code,
      name: prettyError.name,
    },
  }
}
