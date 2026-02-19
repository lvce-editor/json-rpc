import type {
  IJsonRpcErrorResponse,
  JsonRpcError,
} from '../JsonRpcTypes/JsonRpcTypes.ts'
import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export const create = (
  id: number,
  error: JsonRpcError,
): IJsonRpcErrorResponse => {
  return {
    error,
    id,
    jsonrpc: JsonRpcVersion.Two,
  }
}
