import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export interface SuccessResponse {
  readonly id: number
  readonly jsonrpc: string
  readonly result: any
}

export const create = (message: any, result: any): SuccessResponse => {
  return {
    id: message.id,
    jsonrpc: JsonRpcVersion.Two,
    result: result ?? null,
  }
}
