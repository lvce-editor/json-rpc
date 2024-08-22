import { beforeAll, expect, test } from '@jest/globals'
import * as WalkValue from '../src/parts/WalkValue/WalkValue.ts'

const MessagePort = class {}

beforeAll(() => {
  // @ts-ignore
  globalThis.MessagePort = MessagePort
})

test('null', () => {
  const value = null
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([])
})

test('undefined', () => {
  const value = undefined
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([])
})

test('messagePort', () => {
  const value = new MessagePort()
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([value])
})

test('array with messagePort', () => {
  const port = new MessagePort()
  const value = [port]
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([port])
})

test('empty object', () => {
  const value = {}
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([])
})

test('object with port', () => {
  const port = new MessagePort()
  const value = {
    port,
  }
  const transferrables: unknown[] = []
  WalkValue.walkValue(value, transferrables)
  expect(transferrables).toEqual([port])
})
