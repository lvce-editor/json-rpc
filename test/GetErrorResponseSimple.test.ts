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
    jsonrpc: '2.0',
    id: 1,
    error: {
      code: -32001,
      message: 'Something went wrong',
      data: error,
    },
  })
})

test('getErrorResponseSimple - error with no message', () => {
  const error = { code: 'E_CUSTOM' }
  // @ts-ignore
  const result = getErrorResponseSimple(2, error)
  expect(result).toEqual({
    jsonrpc: '2.0',
    id: 2,
    error: {
      code: -32001,
      message: undefined,
      data: error,
    },
  })
})
