import { jest, test, expect } from '@jest/globals'
import * as GetErrorConstructor from '../src/parts/GetErrorConstructor/GetErrorConstructor.js'

test('type - DOMException', () => {
  const message = 'test'
  const type = 'DOMException'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    // @ts-ignore
    DOMException,
  )
})

test('type - TypeError', async () => {
  const message = 'x is not a function'
  const type = 'TypeError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(TypeError)
})

test('type - SyntaxError', async () => {
  const message = 'unexpected token'
  const type = 'SyntaxError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    SyntaxError,
  )
})

test('type - ReferenceError', async () => {
  const message = 'cannot find name'
  const type = 'ReferenceError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    ReferenceError,
  )
})
