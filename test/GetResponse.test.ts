import { expect, test } from '@jest/globals'
import * as GetResponse from '../src/parts/GetResponse/GetResponse.js'

test('getResponse - success', async () => {
  const message = {
    method: 'Test.test',
    id: 1,
    params: [],
  }
  const ipc = {}
  const execute = () => {
    return 0
  }
  const preparePrettyError = () => {}
  const logError = () => {}
  const requiresSocket = () => {
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
    result: 0,
    id: 1,
    jsonrpc: '2.0',
  })
})

test('getResponse - success - requires ipc', async () => {
  const message = {
    method: 'Test.test',
    id: 1,
    params: [],
  }
  const ipc = {}
  const execute = () => {
    return 0
  }
  const preparePrettyError = () => {}
  const logError = () => {}
  const requiresSocket = () => {
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
    result: 0,
    id: 1,
    jsonrpc: '2.0',
  })
})

test('getResponse - error', async () => {
  const message = {
    method: 'Test.test',
    id: 1,
    params: [],
  }
  const ipc = {}
  const execute = () => {
    throw new TypeError(`x is not a function`)
  }
  const preparePrettyError = (error: Error) => {
    return error
  }
  const logError = () => {}
  const requiresSocket = () => {
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
      code: -32001,
      data: {
        code: undefined,
        codeFrame: undefined,
        stack: expect.stringContaining('TypeError: x is not a function'),
      },
      message: 'x is not a function',
    },
    id: 1,
    jsonrpc: '2.0',
  })
})
