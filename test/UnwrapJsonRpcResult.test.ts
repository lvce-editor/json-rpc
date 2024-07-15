import { expect, test } from '@jest/globals'
import * as UnwrapJsonRpcResult from '../src/parts/UnwrapJsonRpcResult/UnwrapJsonRpcResult.js'

test('unwrapJsonRpcResult - error', () => {
  const response = {
    error: {
      message: 'x is not a function',
    },
  }
  expect(() => UnwrapJsonRpcResult.unwrapJsonRpcResult(response)).toThrow(
    new Error('x is not a function'),
  )
})

test('unwrapJsonRpcResult - result', () => {
  const response = {
    result: 12,
  }
  expect(UnwrapJsonRpcResult.unwrapJsonRpcResult(response)).toBe(12)
})

test('unwrapJsonRpcResult - unexpected response', () => {
  const response = {}
  expect(() => UnwrapJsonRpcResult.unwrapJsonRpcResult(response)).toThrow(
    new Error('unexpected response message'),
  )
})
