import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export const create = (message: any, error: any) => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id: message.id,
    error,
  }
}
