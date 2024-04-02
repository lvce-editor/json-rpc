import * as JsonRpcEvent from '../JsonRpcEvent/JsonRpcEvent.ts'
import * as JsonRpcRequest from '../JsonRpcRequest/JsonRpcRequest.ts'
import * as UnwrapJsonRpcResult from '../UnwrapJsonRpcResult/UnwrapJsonRpcResult.ts'

export const send = (transport: any, method: string, ...params: any[]) => {
  const message = JsonRpcEvent.create(method, params)
  transport.send(message)
}

export const invoke = async (ipc: any, method: string, ...params: any[]) => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.send(message)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export const invokeAndTransfer = async (
  ipc: any,
  handle: any,
  method: string,
  ...params: any[]
) => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.sendAndTransfer(message, handle)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export { resolve, registerPromise } from '../Callback/Callback.ts'
export { handleJsonRpcMessage } from '../HandleJsonRpcMessage/HandleJsonRpcMessage.ts'
export { getErrorResponse } from '../GetErrorResponse/GetErrorResponse.ts'
export { getSuccessResponse } from '../GetSuccessResponse/GetSuccessResponse.ts'
export { JsonRpcEvent }
export { JsonRpcRequest }
