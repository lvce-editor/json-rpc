import { expect, test } from '@jest/globals'
import * as GetResponse from '../src/parts/GetResponse/GetResponse.js'

test('getResponse - success', async () => {
  const message = {
    id: 1,
    method: 'Test.test',
    params: [],
  }
  const ipc = {}
  const execute = (): number => {
    return 0
  }
  const preparePrettyError = (): void => {}
  const logError = (): void => {}
  const requiresSocket = (): boolean => {
    return false
  }
  expect(
    await GetResponse.getResponse(
      message,
      ipc,
      execute,
      preparePrettyError,
      logError,
      requiresSocket,
    ),
  ).toEqual({
    id: 1,
    jsonrpc: '2.0',
    result: 0,
  })
})

test('getResponse - success - requires ipc', async () => {
  const message = {
    id: 1,
    method: 'Test.test',
    params: [],
  }
  const ipc = {}
  const execute = (): number => {
    return 0
  }
  const preparePrettyError = (): void => {}
  const logError = (): void => {}
  const requiresSocket = (): boolean => {
    return true
  }
  expect(
    await GetResponse.getResponse(
      message,
      ipc,
      execute,
      preparePrettyError,
      logError,
      requiresSocket,
    ),
  ).toEqual({
    id: 1,
    jsonrpc: '2.0',
    result: 0,
  })
})

test('getResponse - error', async () => {
  const message = {
    id: 1,
    method: 'Test.test',
    params: [],
  }
  const ipc = {}
  const execute = (): void => {
    throw new TypeError(`x is not a function`)
  }
  const preparePrettyError = (error: Error): Error => {
    return error
  }
  const logError = (): void => {}
  const requiresSocket = (): boolean => {
    return false
  }
  expect(
    await GetResponse.getResponse(
      message,
      ipc,
      execute,
      preparePrettyError,
      logError,
      requiresSocket,
    ),
  ).toEqual({
    error: {
      code: -32_001,
      data: {
        code: undefined,
        codeFrame: undefined,
        name: 'TypeError',
        stack: expect.stringContaining('GetResponse.test.ts'),
        type: 'TypeError',
      },
      message: 'x is not a function',
    },
    id: 1,
    jsonrpc: '2.0',
  })
})

test('getResponse - error - simple jsonrpc response', async () => {
  const message = {
    id: 1,
    method: 'Test.test',
    params: [],
  }
  const ipc = {
    canUseSimpleErrorResponse: true,
  }
  const execute = (): void => {
    throw new TypeError(`x is not a function`)
  }
  const preparePrettyError = (error: Error): Error => {
    return error
  }
  const logError = (): void => {}
  const requiresSocket = (): boolean => {
    return false
  }
  expect(
    await GetResponse.getResponse(
      message,
      ipc,
      execute,
      preparePrettyError,
      logError,
      requiresSocket,
    ),
  ).toEqual({
    error: {
      code: -32_001,
      data: new TypeError('x is not a function'),
      message: 'x is not a function',
    },
    id: 1,
    jsonrpc: '2.0',
  })
})
