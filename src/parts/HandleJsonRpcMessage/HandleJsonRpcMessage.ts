import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.ts'
import * as GetResponse from '../GetResponse/GetResponse.ts'
import { JsonRpcError } from '../JsonRpcError/JsonRpcError.ts'

export const handleJsonRpcMessage = async (
  ipc: any,
  message: any,
  execute: any,
  resolve: any,
  preparePrettyError: any,
  logError: any,
  requiresSocket: any,
) => {
  if ('id' in message) {
    if ('method' in message) {
      const response = await GetResponse.getResponse(
        message,
        ipc,
        execute,
        preparePrettyError,
        logError,
        requiresSocket,
      )
      try {
        ipc.send(response)
      } catch (error) {
        const errorResponse = GetErrorResponse.getErrorResponse(
          message,
          error,
          ipc,
          preparePrettyError,
          logError,
        )
        ipc.send(errorResponse)
      }
      return
    }
    resolve(message.id, message)
    return
  }
  if ('method' in message) {
    await GetResponse.getResponse(
      message,
      ipc,
      execute,
      preparePrettyError,
      logError,
      requiresSocket,
    )
    return
  }
  throw new JsonRpcError('unexpected message')
}
