import * as JsonRpcEvent from '../JsonRpcEvent/JsonRpcEvent.js'
import * as JsonRpcRequest from '../JsonRpcRequest/JsonRpcRequest.js'
import * as UnwrapJsonRpcResult from '../UnwrapJsonRpcResult/UnwrapJsonRpcResult.js'

export const send = (transport, method, ...params) => {
  const message = JsonRpcEvent.create(method, params)
  transport.send(message)
}

export const invoke = async (ipc, method, ...params) => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.send(message)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export const invokeAndTransfer = async (ipc, handle, method, ...params) => {
  const { message, promise } = JsonRpcRequest.create(method, params)
  ipc.sendAndTransfer(message, handle)
  const responseMessage = await promise
  const result = UnwrapJsonRpcResult.unwrapJsonRpcResult(responseMessage)
  return result
}

export { resolve } from '../Callback/Callback.js'
export { handleJsonRpcMessage } from '../HandleJsonRpcMessage/HandleJsonRpcMessage.js'
export { getErrorResponse } from '../GetErrorResponse/GetErrorResponse.js'
export { getSuccessResponse } from '../GetSuccessResponse/GetSuccessResponse.js'
export { JsonRpcEvent }
export { JsonRpcRequest }
