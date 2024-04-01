import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.ts'
import * as GetSuccessResponse from '../GetSuccessResponse/GetSuccessResponse.ts'

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
