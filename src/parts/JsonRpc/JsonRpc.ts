import * as JsonRpcEvent from '../JsonRpcEvent/JsonRpcEvent.ts'
import * as JsonRpcRequest from '../JsonRpcRequest/JsonRpcRequest.ts'
import * as UnwrapJsonRpcResult from '../UnwrapJsonRpcResult/UnwrapJsonRpcResult.ts'

export const send = (
  transport: any,
  method: string,
  ...params: readonly any[]
): void => {
  const message = JsonRpcEvent.create(method, params)
  transport.send(message)
}

export const invoke = async (
  ipc: any,
  method: string,
  ...params: readonly any[]
): Promise<any> => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.send(message)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export const invokeAndTransfer = async (
  ipc: any,
  method: any,
  ...params: readonly any[]
): Promise<any> => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.sendAndTransfer(message)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export { registerPromise, resolve } from '../Callback/Callback.ts'
export { getErrorResponse } from '../GetErrorResponse/GetErrorResponse.ts'
export { getSuccessResponse } from '../GetSuccessResponse/GetSuccessResponse.ts'
export { handleJsonRpcMessage } from '../HandleJsonRpcMessage/HandleJsonRpcMessage.ts'
export { JsonRpcEvent, JsonRpcRequest }
