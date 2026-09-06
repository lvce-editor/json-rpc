import type { IJsonRpcErrorResponse } from '../JsonRpcTypes/JsonRpcTypes.ts'
import * as JsonRpcErrorCode from '../JsonRpcErrorCode/JsonRpcErrorCode.ts'
import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export const getErrorResponseSimple = (
  id: number,
  error: unknown,
): IJsonRpcErrorResponse => {
  return {
    error: {
      code: JsonRpcErrorCode.Custom,
      data:
        error instanceof Error
          ? {
              ...error,
              code: 'code' in error ? error.code : undefined,
              stack: error.stack,
              type: error.name,
            }
          : error,
      // @ts-ignore
      message: error.message,
    },
    id,
    jsonrpc: JsonRpcVersion.Two,
  }
}
