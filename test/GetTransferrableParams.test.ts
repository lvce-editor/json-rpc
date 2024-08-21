import { expect, test } from '@jest/globals'
import * as GetTransferrableParams from '../src/parts/GetTransferrableParams/GetTransferrableParams.js'

test('null', () => {
  const value = null
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})

test('undefined', () => {
  const value = undefined
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})

test('number', () => {
  const value = 12
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})

test('string', () => {
  const value = 'a'
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})

test('symbol', () => {
  const value = Symbol()
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})

test('socket', () => {
  class Socket {}
  const value = new Socket()
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(value)
})

test('array with socket', () => {
  class Socket {}
  const socket = new Socket()
  const value = [socket]
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(socket)
})

test('empty array', () => {
  const value = [] as const
  expect(GetTransferrableParams.getTransferrableParams(value)).toBe(undefined)
})
