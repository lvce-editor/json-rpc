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
