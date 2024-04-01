import * as JsonRpcSuccessResponse from '../JsonRpcSuccessResponse/JsonSuccessResponse.ts'

export const getSuccessResponse = (message, result) => {
  const resultProperty = result ?? null
  return JsonRpcSuccessResponse.create(message, resultProperty)
}
