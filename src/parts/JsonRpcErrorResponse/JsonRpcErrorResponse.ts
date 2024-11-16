import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export interface ErrorResponse {
  readonly jsonrpc: string
  readonly id: number
  readonly error: any
}

export const create = (message: any, error: any): ErrorResponse => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id: message.id,
    error,
  }
}
