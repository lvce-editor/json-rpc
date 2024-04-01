import * as JsonRpcSuccessResponse from '../JsonRpcSuccessResponse/JsonSuccessResponse.ts'

export const getSuccessResponse = (message: any, result: any) => {
  const resultProperty = result ?? null
  return JsonRpcSuccessResponse.create(message, resultProperty)
}
