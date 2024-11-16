import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export interface SuccessResponse {
  readonly jsonrpc: string
  readonly id: number
  readonly result: any
}

export const create = (message: any, result: any): SuccessResponse => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id: message.id,
    result: result ?? null,
  }
}
