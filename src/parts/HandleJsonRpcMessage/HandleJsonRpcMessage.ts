import * as Callback from '../Callback/Callback.ts'
import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.ts'
import * as GetResponse from '../GetResponse/GetResponse.ts'
import { JsonRpcError } from '../JsonRpcError/JsonRpcError.ts'

const defaultPreparePrettyError = (error: any) => {
  return error
}

const defaultLogError = () => {
  // ignore
}

const defaultRequiresSocket = () => {
  return false
}

const defaultResolve = Callback.resolve

export const handleJsonRpcMessage = async (...args: any[]): Promise<void> => {
  let message
  let ipc
  let execute
  let preparePrettyError
  let logError
  let resolve
  let requiresSocket
  if (args.length === 1) {
    const arg = args[0]
    message = arg.message
    ipc = arg.ipc
    execute = arg.execute
    preparePrettyError = arg.preparePrettyError || defaultPreparePrettyError
    logError = arg.logError || defaultLogError
    requiresSocket = arg.requiresSocket || defaultRequiresSocket
    resolve = arg.resolve || defaultResolve
  } else {
    ipc = args[0]
    message = args[1]
    execute = args[2]
    resolve = args[3]
    preparePrettyError = args[4]
    logError = args[5]
    requiresSocket = args[6]
  }
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
