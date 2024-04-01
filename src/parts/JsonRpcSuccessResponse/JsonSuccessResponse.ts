import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

export const create = (message: any, result: any) => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    id: message.id,
    result: result ?? null,
  }
}
