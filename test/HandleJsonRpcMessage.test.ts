import { jest, test, expect } from '@jest/globals'
import * as HandleJsonRpcMessage from '../src/parts/HandleJsonRpcMessage/HandleJsonRpcMessage.js'

test('resolve', async () => {
  const ipc = {}
  const message = {
    id: 1,
    result: 2,
  }
  const resolve = jest.fn()
  const execute = jest.fn()
  const preparePrettyError = jest.fn()
  const logError = jest.fn()
  const requiresSocket = jest.fn()
  await HandleJsonRpcMessage.handleJsonRpcMessage(
    ipc,
    message,
    execute,
    resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  )
  expect(resolve).toHaveBeenCalledTimes(1)
  expect(resolve).toHaveBeenCalledWith(1, message)
})

test('resolve - new api', async () => {
  const ipc = {}
  const message = {
    id: 1,
    result: 2,
  }
  const resolve = jest.fn()
  const execute = jest.fn()
  const preparePrettyError = jest.fn()
  const logError = jest.fn()
  const requiresSocket = jest.fn()
  await HandleJsonRpcMessage.handleJsonRpcMessage({
    ipc,
    message,
    execute,
    resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  })
  expect(resolve).toHaveBeenCalledTimes(1)
  expect(resolve).toHaveBeenCalledWith(1, message)
})

test('invoke - new api - with fallback', async () => {
  const ipc = {
    send: jest.fn(() => {}),
  }
  const message = {
    id: 1,
    method: 'a',
    params: [],
  }
  const execute = jest.fn(() => {
    return 2
  })
  await HandleJsonRpcMessage.handleJsonRpcMessage({
    ipc,
    message,
    execute,
  })
  expect(ipc.send).toHaveBeenCalledTimes(1)
  expect(ipc.send).toHaveBeenCalledWith({
    id: 1,
    jsonrpc: '2.0',
    result: 2,
  })
})

test('unexpected message', async () => {
  const ipc = {}
  const message = {}
  const resolve = jest.fn()
  const execute = jest.fn()
  const preparePrettyError = jest.fn()
  const logError = jest.fn()
  const requiresSocket = jest.fn()
  await expect(
    HandleJsonRpcMessage.handleJsonRpcMessage(
      ipc,
      message,
      execute,
      resolve,
      preparePrettyError,
      logError,
      requiresSocket,
    ),
  ).rejects.toThrowError(new Error('unexpected message'))
})

test('error when sending message', async () => {
  let i = 0
  const ipc = {
    send: jest.fn(() => {
      if (i++ === 0) {
        throw new TypeError('x is not a function')
      }
    }),
  }
  const message = {
    id: 1,
    method: 'abc',
    params: [],
  }
  const resolve = jest.fn()
  const execute = jest.fn()
  const preparePrettyError = jest.fn((error) => {
    return {
      code: undefined,
      codeFrame: '',
      // @ts-ignore
      message: error.message,
      // @ts-ignore
      name: error.constructor.name,
      // @ts-ignore
      stack: error.stack,
      // @ts-ignore
      type: error.constructor.name,
    }
  })
  const logError = jest.fn()
  const requiresSocket = jest.fn()
  await HandleJsonRpcMessage.handleJsonRpcMessage(
    ipc,
    message,
    execute,
    resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  )
  expect(ipc.send).toHaveBeenCalledTimes(2)
  expect(ipc.send).toHaveBeenNthCalledWith(1, {
    id: 1,
    jsonrpc: '2.0',
    result: null,
  })
  expect(ipc.send).toHaveBeenNthCalledWith(2, {
    error: {
      code: -32001,
      message: 'x is not a function',
      data: {
        codeFrame: '',
        stack: expect.stringMatching('HandleJsonRpcMessage.test.ts'),
        type: 'TypeError',
        name: 'TypeError',
      },
    },
    id: 1,
    jsonrpc: '2.0',
  })
})

test('new api - error', async () => {
  const ipc = {
    send: jest.fn(() => {}),
  }
  const message = {
    id: 1,
    method: 'abc',
    params: [],
  }
  const resolve = jest.fn()
  const execute = jest.fn(() => {
    throw new TypeError(`x is not a function`)
  })
  await HandleJsonRpcMessage.handleJsonRpcMessage({
    ipc,
    message,
    execute,
    resolve,
  })
  expect(ipc.send).toHaveBeenCalledTimes(1)
  expect(ipc.send).toHaveBeenNthCalledWith(1, {
    error: {
      code: -32001,
      message: 'x is not a function',
      data: {
        codeFrame: undefined,
        stack: expect.stringMatching('HandleJsonRpcMessage.test.ts'),
        type: 'TypeError',
        name: 'TypeError',
      },
    },
    id: 1,
    jsonrpc: '2.0',
  })
})

test('function call without response', async () => {
  const ipc = {
    send: jest.fn(() => {}),
  }
  const message = {
    method: 'abc',
    params: [],
  }
  const resolve = jest.fn()
  const execute = jest.fn()
  const preparePrettyError = jest.fn((error) => {
    return {
      code: undefined,
      codeFrame: '',
      // @ts-ignore
      message: error.message,
      // @ts-ignore
      name: error.constructor.name,
      // @ts-ignore
      stack: error.stack,
      // @ts-ignore
      type: error.constructor.name,
    }
  })
  const logError = jest.fn()
  const requiresSocket = jest.fn()
  await HandleJsonRpcMessage.handleJsonRpcMessage(
    ipc,
    message,
    execute,
    resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  )
  expect(ipc.send).not.toHaveBeenCalled()
})
