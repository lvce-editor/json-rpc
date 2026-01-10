import * as JsonRpcEvent from '../JsonRpcEvent/JsonRpcEvent.ts'
import * as JsonRpcRequest from '../JsonRpcRequest/JsonRpcRequest.ts'
import * as UnwrapJsonRpcResult from '../UnwrapJsonRpcResult/UnwrapJsonRpcResult.ts'
import type { IpcConnection } from '../JsonRpcTypes/JsonRpcTypes.ts'
import { restoreJsonRpcError } from '../RestoreJsonRpcError/RestoreJsonRpcError.ts'

const invokeHelper = async <T>(
  ipc: IpcConnection,
  method: string,
  params: readonly unknown[],
  useSendAndTransfer: boolean,
): Promise<T> => {
  const { message, promise } = JsonRpcRequest.create<T>(method, params)
  if (useSendAndTransfer && ipc.sendAndTransfer) {
    ipc.sendAndTransfer(message)
  } else {
    ipc.send(message)
  }
  const responseMessage = await promise
  return UnwrapJsonRpcResult.unwrapJsonRpcResult<T>(responseMessage)
}

export const send = (
  transport: IpcConnection,
  method: string,
  ...params: readonly unknown[]
): void => {
  const message = JsonRpcEvent.create(method, params)
  transport.send(message)
}

export const invoke = <T>(
  ipc: IpcConnection,
  method: string,
  ...params: readonly unknown[]
): Promise<T> => {
  return invokeHelper<T>(ipc, method, params, false)
}

export const invokeAndTransfer = <T>(
  ipc: IpcConnection,
  method: string,
  ...params: readonly unknown[]
): Promise<T> => {
  return invokeHelper<T>(ipc, method, params, true)
}

export { resolve } from '../Resolve/Resolve.ts'
export { registerPromise } from '../RegisterPromise/RegisterPromise.ts'
export { getErrorResponse } from '../GetErrorResponse/GetErrorResponse.ts'
export { getSuccessResponse } from '../GetSuccessResponse/GetSuccessResponse.ts'
export { handleJsonRpcMessage } from '../HandleJsonRpcMessage/HandleJsonRpcMessage.ts'
export {restoreJsonRpcError} from '../RestoreJsonRpcError/RestoreJsonRpcError.ts'
export { JsonRpcEvent, JsonRpcRequest }
