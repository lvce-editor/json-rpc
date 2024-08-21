import { expect, test, beforeAll } from '@jest/globals'
import * as IsSocket from '../src/parts/IsSocket/IsSocket.ts'

const Socket = class {}

beforeAll(() => {
  // @ts-ignore
  globalThis.Socket = Socket
})

test('null', () => {
  const value = null
  expect(IsSocket.isSocket(value)).toBe(false)
})

test('undefined', () => {
  const value = undefined
  expect(IsSocket.isSocket(value)).toBe(false)
})

test('number', () => {
  const value = 12
  expect(IsSocket.isSocket(value)).toBe(false)
})

test('string', () => {
  const value = 'a'
  expect(IsSocket.isSocket(value)).toBe(false)
})

test('symbol', () => {
  const value = Symbol()
  expect(IsSocket.isSocket(value)).toBe(false)
})

test('socket', () => {
  const value = new Socket()
  expect(IsSocket.isSocket(value)).toBe(true)
})
