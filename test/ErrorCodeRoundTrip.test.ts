import { expect, test } from '@jest/globals'
import { deserialize, serialize } from 'node:v8'
import { getErrorResponseSimple } from '../src/parts/GetErrorResponseSimple/GetErrorResponseSimple.ts'
import { getErrorProperty } from '../src/parts/GetErrorProperty/GetErrorProperty.ts'
import { restoreJsonRpcError } from '../src/parts/RestoreJsonRpcError/RestoreJsonRpcError.ts'

test.each(['E_REMOTE_BACKEND_WEBSOCKET_ERROR', 'ENOENT', 0, 404])(
  'preserves %s through repeated structured and JSON serialization',
  (code) => {
    let error = Object.assign(new Error('Remote workspace backend failed'), {
      code,
      name: 'RemoteSshError',
    })
    for (const clone of [
      (value: any) => deserialize(serialize(value)),
      (value: any) => JSON.parse(JSON.stringify(value)),
    ]) {
      const response = clone(getErrorResponseSimple(1, error))
      error = restoreJsonRpcError(response.error)
      expect(error).toBeInstanceOf(Error)
      expect(error.code).toBe(code)
      expect(error.name).toBe('RemoteSshError')
      expect(error.message).toBe('Remote workspace backend failed')
      expect(error.stack).toContain('Remote workspace backend failed')
    }
  },
)

test('preserves original codes when pretty formatting omits them', () => {
  const error = Object.assign(new Error('failed'), {
    code: 'E_REMOTE_BACKEND_WEBSOCKET_ERROR',
  })
  const result = getErrorProperty(error, { message: error.message })
  expect(restoreJsonRpcError(result).code).toBe(error.code)
})

test.each(['E_REMOTE_BACKEND_WEBSOCKET_ERROR', 0, -32601, -32603])(
  'restores direct code %s',
  (code) => {
    expect(restoreJsonRpcError({ code, message: 'failed' }).code).toBe(code)
  },
)

test('prefers the application code over the protocol code', () => {
  expect(
    restoreJsonRpcError({ code: -32603, data: { code: 0 }, message: 'failed' })
      .code,
  ).toBe(0)
})
