import { expect, test } from '@jest/globals'
import * as GetErrorConstructor from '../src/parts/GetErrorConstructor/GetErrorConstructor.js'

test('type - DOMException', () => {
  const message = 'test'
  const type = 'DOMException'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    // @ts-ignore
    DOMException,
  )
})

test('type - TypeError', () => {
  const message = 'x is not a function'
  const type = 'TypeError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(TypeError)
})

test('type - Error', () => {
  const message = 'x is not a function'
  const type = 'Error'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(Error)
})

test('type - SyntaxError', () => {
  const message = 'unexpected token'
  const type = 'SyntaxError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    SyntaxError,
  )
})

test('type - ReferenceError', () => {
  const message = 'cannot find name'
  const type = 'ReferenceError'
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    ReferenceError,
  )
})

test('prefix - ReferenceError', () => {
  const message = 'TypeError: x is not a function'
  const type = ''
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(TypeError)
})

test('prefix - SyntaxError', () => {
  const message = 'SyntaxError: x is not a function'
  const type = ''
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    SyntaxError,
  )
})

test('prefix - ReferenceError', () => {
  const message = 'ReferenceError: x is not a function'
  const type = ''
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(
    ReferenceError,
  )
})

test('prefix - other', () => {
  const message = 'x is not a function'
  const type = ''
  expect(GetErrorConstructor.getErrorConstructor(message, type)).toBe(Error)
})
