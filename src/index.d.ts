export const send: (ipc: any, method: string, ...params: any[]) => void

export const invoke: (
  ipc: any,
  method: string,
  ...params: any[]
) => Promise<any>

export const invokeAndTransfer: (
  ipc: any,
  transfer: any,
  method: string,
  ...params: any[]
) => Promise<any>

export const resolve: (id: number, message: any) => void

export const handleJsonRpcMessage: (
  ipc: any,
  message: any,
  execute: (method: string, ...params: any[]) => Promise<any>,
  resolve: any,
  preparePrettyError: (error: any) => Promise<any>,
  logError: (error: any) => void,
  requiresSocket: (method: string) => void,
) => Promise<void>
