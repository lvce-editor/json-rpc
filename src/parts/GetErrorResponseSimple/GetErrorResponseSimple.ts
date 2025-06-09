import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'
import { IJsonRpcErrorResponse } from '../JsonRpcTypes/JsonRpcTypes.ts'
import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export const getErrorResponseSimple = (
  id: number,
  error: unknown,
): IJsonRpcErrorResponse => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id,
    error: {
      code: JsonRpcErrorCode.Custom,
      // @ts-ignore
      message: error.message,
      data: error,
    },
  }
}
