import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.ts'
import * as GetSuccessResponse from '../GetSuccessResponse/GetSuccessResponse.ts'
import * as GetErrorResponseSimple from '../GetErrorResponseSimple/GetErrorResponseSimple.ts'

export const getResponse = async (
  message: any,
  ipc: any,
  execute: any,
  preparePrettyError: any,
  logError: any,
  requiresSocket: any,
): Promise<any> => {
  try {
    const result = requiresSocket(message.method)
      ? await execute(message.method, ipc, ...message.params)
      : await execute(message.method, ...message.params)
    return GetSuccessResponse.getSuccessResponse(message, result)
  } catch (error) {
    if (ipc.canUseSimpleErrorResponse) {
      return GetErrorResponseSimple.getErrorResponseSimple(message.id, error)
    }
    return GetErrorResponse.getErrorResponse(
      message.id,
      error,
      preparePrettyError,
      logError,
    )
  }
}
