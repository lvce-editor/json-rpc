import { expect, test, beforeAll } from '@jest/globals'
import * as IsMessagePortMain from '../src/parts/IsMessagePortMain/IsMessagePortMain.ts'

const MessagePortMain = class {}

beforeAll(() => {
  // @ts-ignore
  globalThis.MessagePortMain = MessagePortMain
})

test('null', () => {
  const value = null
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(false)
})

test('undefined', () => {
  const value = undefined
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(false)
})

test('number', () => {
  const value = 12
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(false)
})

test('string', () => {
  const value = 'a'
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(false)
})

test('symbol', () => {
  const value = Symbol()
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(false)
})

test('messagePortMain', () => {
  const value = new MessagePortMain()
  expect(IsMessagePortMain.isMessagePortMain(value)).toBe(true)
})
