import { expect, test, beforeAll } from '@jest/globals'
import * as IsMessagePort from '../src/parts/IsMessagePort/IsMessagePort.ts'

const MessagePort = class {}

beforeAll(() => {
  // @ts-ignore
  globalThis.MessagePort = MessagePort
})

test('null', () => {
  const value = null
  expect(IsMessagePort.isMessagePort(value)).toBe(false)
})

test('undefined', () => {
  const value = undefined
  expect(IsMessagePort.isMessagePort(value)).toBe(false)
})

test('number', () => {
  const value = 12
  expect(IsMessagePort.isMessagePort(value)).toBe(false)
})

test('string', () => {
  const value = 'a'
  expect(IsMessagePort.isMessagePort(value)).toBe(false)
})

test('symbol', () => {
  const value = Symbol()
  expect(IsMessagePort.isMessagePort(value)).toBe(false)
})

test('messagePort', () => {
  const value = new MessagePort()
  expect(IsMessagePort.isMessagePort(value)).toBe(true)
})
