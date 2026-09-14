import { expect, test } from '@jest/globals'
import { getErrorResponse } from '../src/parts/GetErrorResponse/GetErrorResponse.ts'
import { restoreJsonRpcError } from '../src/parts/RestoreJsonRpcError/RestoreJsonRpcError.ts'

test('preserves TypeError through JSON-RPC response and restoration', () => {
  const error = new TypeError('setting has an invalid type')
  const response = getErrorResponse(
    1,
    error,
    (value: any) => ({
      message: value.message,
      name: value.name,
      stack: value.stack,
      type: value.name,
    }),
    () => {},
  )

  const restored = restoreJsonRpcError(response.error)

  expect(restored).toBeInstanceOf(TypeError)
  expect(restored.name).toBe('TypeError')
  expect(restored.message).toBe('setting has an invalid type')
})
