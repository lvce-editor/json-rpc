export interface IJsonRpcRequest<TParams = unknown> {
  readonly jsonrpc: '2.0'
  readonly method: string
  readonly params?: TParams
  readonly id?: number | string
}

export interface IJsonRpcSuccessResponse<TResult = unknown> {
  readonly jsonrpc: '2.0'
  readonly id: number | string | null
  readonly result: TResult
}

export interface IJsonRpcErrorResponse {
  readonly jsonrpc: '2.0'
  readonly id: number | string | null
  readonly error: JsonRpcError
}

export interface JsonRpcError {
  readonly code: number
  readonly message: string
  readonly data?: unknown
}

export interface JsonRpcEvent<TParams = unknown> {
  readonly jsonrpc: '2.0'
  readonly method: string
  readonly params: TParams
}

export interface Transport {
  send(message: unknown): void
  sendAndTransfer?(message: unknown): void
}

export interface IpcConnection extends Transport {
  send(message: unknown): void
  sendAndTransfer?(message: unknown): void
}

export interface JsonRpcRequestResult<T = unknown> {
  message: IJsonRpcRequest
  promise: Promise<T>
}

export interface ErrorResponseData {
  readonly stack?: string
  readonly codeFrame?: string
  readonly type?: string
  readonly code?: number | string
  readonly name?: string
}
