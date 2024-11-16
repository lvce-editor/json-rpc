import * as JsonRpcVersion from '../JsonRpcVersion/JsonRpcVersion.ts'

interface JsonRpcEvent {
  readonly jsonrpc: string
  readonly method: string
  readonly params: readonly any[]
}

export const create = (
  method: string,
  params: readonly any[],
): JsonRpcEvent => {
  return {
    jsonrpc: JsonRpcVersion.Two,
    method,
    params,
  }
}
