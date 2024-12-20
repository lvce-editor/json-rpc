import type {
  IJsonRpcRequest,
  JsonRpcRequestResult,
} from '../JsonRpcTypes/JsonRpcTypes.ts'
import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'
import * as RegisterPromise from '../RegisterPromise/RegisterPromise.ts'

export const create = <T = unknown>(
  method: string,
  params: readonly unknown[],
): JsonRpcRequestResult<T> => {
  const { id, promise } = RegisterPromise.registerPromise<T>()
  const message: IJsonRpcRequest = {
    jsonrpc: JsonRpcVersion.Two,
    method,
    params,
    id,
  }
  return {
    message,
    promise,
  }
}
