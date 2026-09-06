import { expect, test } from '@jest/globals'
import { deserialize, serialize } from 'node:v8'
import { getErrorProperty } from '../src/parts/GetErrorProperty/GetErrorProperty.ts'
import { getErrorResponseSimple } from '../src/parts/GetErrorResponseSimple/GetErrorResponseSimple.ts'
import { restoreJsonRpcError } from '../src/parts/RestoreJsonRpcError/RestoreJsonRpcError.ts'

test.each(['E_REMOTE_BACKEND_WEBSOCKET_ERROR', 'ENOENT', 0, 404])(
  'preserves %s through repeated structured and JSON serialization',
  (code) => {
    const original = new Error('Remote workspace backend failed')
    Object.defineProperty(original, 'name', { value: 'RemoteSshError' })
    let error = Object.assign(original, { code })
    for (const clone of [
      (value: any): any => deserialize(serialize(value)),
      (value: any): any => {
        const message = JSON.stringify(value)
        return JSON.parse(message)
      },
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

test.each(['E_REMOTE_BACKEND_WEBSOCKET_ERROR', 0, -32_601, -32_603])(
  'restores direct code %s',
  (code) => {
    expect(restoreJsonRpcError({ code, message: 'failed' }).code).toBe(code)
  },
)

test('prefers the application code over the protocol code', () => {
  expect(
    restoreJsonRpcError({ code: -32_603, data: { code: 0 }, message: 'failed' })
      .code,
  ).toBe(0)
})
