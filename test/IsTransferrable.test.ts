import { expect, test, beforeAll } from '@jest/globals'
import * as IsTransferrable from '../src/parts/IsTransferrable/IsTransferrable.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.OffscreenCanvas = class {}

  // @ts-ignore
  globalThis.MessagePort = class {}
})

test('null', () => {
  const value = null
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('undefined', () => {
  const value = undefined
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('number', () => {
  const value = 12
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('string', () => {
  const value = 'a'
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('symbol', () => {
  const value = Symbol()
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('offscreenCanvas', () => {
  const value = new OffscreenCanvas(0, 0)
  expect(IsTransferrable.isTransferrable(value)).toBe(true)
})

test('messagePort', () => {
  const value = new MessagePort()
  expect(IsTransferrable.isTransferrable(value)).toBe(true)
})

test('object', () => {
  const value = {}
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('array', () => {
  const value = [] as const
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})
