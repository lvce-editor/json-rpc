import { expect, test, beforeAll } from '@jest/globals'
import * as IsOffscreenCanvas from '../src/parts/IsOffscreenCanvas/IsOffscreenCanvas.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.OffscreenCanvas = class {}
})

test('null', () => {
  const value = null
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('undefined', () => {
  const value = undefined
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('number', () => {
  const value = 12
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('string', () => {
  const value = 'a'
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('symbol', () => {
  const value = Symbol()
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('object', () => {
  const value = {}
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(false)
})

test('offscreenCanvas', () => {
  const value = new OffscreenCanvas(0, 0)
  expect(IsOffscreenCanvas.isOffscreenCanvas(value)).toBe(true)
})
