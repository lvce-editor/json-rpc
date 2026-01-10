export const send: (ipc: any, method: string, ...params: any[]) => void

export const invoke: (
  ipc: any,
  method: string,
  ...params: any[]
) => Promise<any>

export const invokeAndTransfer: (
  ipc: any,
  method: string,
  ...params: any[]
) => Promise<any>

export const resolve: (id: number, message: any) => void

interface HandleJsonRpcMessage {
  (
    ipc: any,
    message: any,
    execute: (method: string, ...params: any[]) => Promise<any>,
    resolve: any,
    preparePrettyError: (error: any) => any,
    logError: (error: any) => void,
    requiresSocket: (method: string) => void,
  ): Promise<void>

  ({
    ipc,
    message,
    execute,
    resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  }: {
    ipc: any
    message: any
    execute: (method: string, ...params: any[]) => Promise<any>
    resolve?: any
    preparePrettyError: (error: any) => any
    logError: (error: any) => void
    requiresSocket: (method: string) => void
  }): Promise<void>
}

export const handleJsonRpcMessage: HandleJsonRpcMessage

export const getErrorResponse: (
  message: any,
  error: any,
  ipc: any,
  preparePrettyError: any,
  logError: any,
) => any

export const getSuccessResponse: (message: any, result: any) => any

export const JsonRpcEvent: {
  create: (method: string, params: any) => any
}
export const JsonRequest: {
  create: (method: string, params: any) => any
}

export const unwrapJsonRpcResult: any

export const restoreJsonRpcError: any
