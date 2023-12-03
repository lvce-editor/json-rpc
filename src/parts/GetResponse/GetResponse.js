import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.js'
import * as GetSuccessResponse from '../GetSuccessResponse/GetSuccessResponse.js'

export const getResponse = async (
  message,
  ipc,
  execute,
  preparePrettyError,
  logError,
  requiresSocket,
) => {
  try {
    const result = requiresSocket(message.method)
      ? await execute(message.method, ipc, ...message.params)
      : await execute(message.method, ...message.params)
    return GetSuccessResponse.getSuccessResponse(message, result)
  } catch (error) {
    return GetErrorResponse.getErrorResponse(
      message,
      error,
      ipc,
      preparePrettyError,
      logError,
    )
  }
}
