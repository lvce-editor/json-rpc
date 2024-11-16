import { expect, test } from '@jest/globals'
import * as GetErrorResponse from '../src/parts/GetErrorResponse/GetErrorResponse.js'

test('getErrorResponse', () => {
  class CommandNotFoundError extends Error {
    code: string
    constructor(message: string) {
      super(message)
      this.code = 'E_COMMAND_NOT_FOUND'
    }
  }
  const message = 'Command not found'
  const error = new CommandNotFoundError(message)
  const preparePrettyError = (error: any): any => {
    return error
  }
  const logError = (): void => {}
  expect(
    GetErrorResponse.getErrorResponse(
      message,
      error,
      preparePrettyError,
      logError,
    ),
  ).toEqual({
    error: {
      code: -32601,
      data: expect.stringMatching(/Error: Command not found/),
      message: 'Command not found',
    },
    id: undefined,
    jsonrpc: '2.0',
  })
})
