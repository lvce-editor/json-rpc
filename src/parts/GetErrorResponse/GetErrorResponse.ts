import * as GetErrorProperty from '../GetErrorProperty/GetErrorProperty.ts'
import * as JsonRpcErrorResponse from '../JsonRpcErrorResponse/JsonRpcErrorResponse.ts'
import type { IJsonRpcErrorResponse } from '../JsonRpcTypes/JsonRpcTypes.ts'

export const getErrorResponse = (
  id: number,
  error: unknown,
  preparePrettyError: (error: unknown) => unknown,
  logError: (error: unknown, prettyError: unknown) => void,
): IJsonRpcErrorResponse => {
  const prettyError = preparePrettyError(error)
  logError(error, prettyError)
  const errorProperty = GetErrorProperty.getErrorProperty(error, prettyError)
  return JsonRpcErrorResponse.create(id, errorProperty)
}
