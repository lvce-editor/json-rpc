import * as GetErrorProperty from '../GetErrorProperty/GetErrorProperty.ts'
import * as JsonRpcErrorResponse from '../JsonRpcErrorResponse/JsonRpcErrorResponse.ts'

export const getErrorResponse = (
  message: any,
  error: any,
  preparePrettyError: any,
  logError: any,
): any => {
  const prettyError = preparePrettyError(error)
  logError(error, prettyError)
  const errorProperty = GetErrorProperty.getErrorProperty(error, prettyError)
  return JsonRpcErrorResponse.create(message, errorProperty)
}
