import { expect, test } from '@jest/globals'
import { getErrorResponseSimple } from '../src/parts/GetErrorResponseSimple/GetErrorResponseSimple.ts'

const createError = (message: string): Error => {
  const error = new Error(message)
  // @ts-ignore
  error.code = 'E_CUSTOM'
  return error
}

test('getErrorResponseSimple - basic error', () => {
  const error = createError('Something went wrong')
  const result = getErrorResponseSimple(1, error)
  expect(result).toEqual({
    error: {
      code: -32_001,
      data: error,
      message: 'Something went wrong',
    },
    id: 1,
    jsonrpc: '2.0',
  })
})

test('getErrorResponseSimple - error with no message', () => {
  const error = { code: 'E_CUSTOM' }
  // @ts-ignore
  const result = getErrorResponseSimple(2, error)
  expect(result).toEqual({
    error: {
      code: -32_001,
      data: error,
      message: undefined,
    },
    id: 2,
    jsonrpc: '2.0',
  })
})
