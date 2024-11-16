import * as Callback from '../Callback/Callback.ts'
import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'
import type {
  IJsonRpcRequest,
  JsonRpcRequestResult,
} from '../JsonRpcTypes/JsonRpcTypes.ts'

export const create = <T = unknown>(
  method: string,
  params: readonly unknown[],
): JsonRpcRequestResult<T> => {
  const { id, promise } = Callback.registerPromise<T>()
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
