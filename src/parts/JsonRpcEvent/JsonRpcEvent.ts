import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'
import type { JsonRpcEvent } from '../JsonRpcTypes/JsonRpcTypes.ts'

export const create = (
  method: string,
  params: readonly unknown[],
): JsonRpcEvent => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    method,
    params,
  }
}
