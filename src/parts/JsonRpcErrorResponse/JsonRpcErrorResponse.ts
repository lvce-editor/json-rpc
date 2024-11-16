import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'
import type {
  IJsonRpcErrorResponse,
  JsonRpcError,
  IJsonRpcRequest,
} from '../JsonRpcTypes/JsonRpcTypes.ts'

export const create = (
  message: IJsonRpcRequest,
  error: JsonRpcError,
): IJsonRpcErrorResponse => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id: message.id!,
    error,
  }
}
