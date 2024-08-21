import * as JsonRpcEvent from '../JsonRpcEvent/JsonRpcEvent.ts'
import * as JsonRpcRequest from '../JsonRpcRequest/JsonRpcRequest.ts'
import * as UnwrapJsonRpcResult from '../UnwrapJsonRpcResult/UnwrapJsonRpcResult.ts'
import * as GetTransferrableParams from '../GetTransferrableParams/GetTransferrableParams.ts'

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

// TODO deprecated old typings,
// always use automatic transferrable detection
export const invokeAndTransfer = async (
  ipc: any,
  handle: any,
  method: any,
  ...params: any[]
) => {
  let transfer = handle
  if (typeof handle === 'string') {
    params = [method, ...params]
    method = handle
    transfer = GetTransferrableParams.getTransferrableParams(params)
  }
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.sendAndTransfer(message, transfer)
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
