import * as GetErrorProperty from '../GetErrorProperty/GetErrorProperty.ts'
import * as JsonRpcErrorResponse from '../JsonRpcErrorResponse/JsonRpcErrorResponse.ts'

export const getErrorResponse = (
  message: any,
  error: unknown,
  preparePrettyError: (error: unknown) => unknown,
  logError: (error: unknown, prettyError: unknown) => void,
): any => {
  const prettyError = preparePrettyError(error)
  logError(error, prettyError)
  const errorProperty = GetErrorProperty.getErrorProperty(error, prettyError)
  return JsonRpcErrorResponse.create(message, errorProperty)
}
