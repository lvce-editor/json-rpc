import { expect, test } from '@jest/globals'
import * as GetErrorProperty from '../src/parts/GetErrorProperty/GetErrorProperty.ts'

test('DOMException - SecurityError', () => {
  const error = null
  const prettyError = new DOMException(
    "Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin \"http://localhost:3000\" from accessing a cross-origin frame.",
    'SecurityError',
  )
  expect(GetErrorProperty.getErrorProperty(error, prettyError)).toEqual({
    code: -32_001,
    data: {
      code: 18,
      codeFrame: undefined,
      stack: expect.stringMatching('at new DOMException'),
      type: 'DOMException',
      name: 'SecurityError',
    },
    message:
      "Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin \"http://localhost:3000\" from accessing a cross-origin frame.",
  })
})

test('error without type property', () => {
  const error = null
  const prettyError = Object.create(null)
  prettyError.message =
    "Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin \"http://localhost:3000\" from accessing a cross-origin frame."
  expect(GetErrorProperty.getErrorProperty(error, prettyError)).toEqual({
    code: -32_001,
    data: {
      codeFrame: undefined,
      stack: '',
      type: undefined,
    },
    message:
      "Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin \"http://localhost:3000\" from accessing a cross-origin frame.",
  })
})

test('error with stack', () => {
  const error = new TypeError('x is not a function')
  error.stack = `TypeError: x is not a function\n    at context.<computed> (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:554:15)\n    at async getResponse (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:1903:109)\n    at async handleJsonRpcMessage (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:1957:24)\n    at restoreJsonRpcError (http://localhost:3000/8ebf915/packages/completion-worker/dist/completionWorkerMain.js:636:45)`
  expect(GetErrorProperty.getErrorProperty(error, error)).toEqual({
    code: -32_001,
    data: {
      codeFrame: undefined,
      stack: `    at context.<computed> (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:554:15)
    at async getResponse (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:1903:109)
    at async handleJsonRpcMessage (http://localhost:3000/8ebf915/packages/extension-host-worker/dist/extensionHostWorkerMain.js:1957:24)
    at restoreJsonRpcError (http://localhost:3000/8ebf915/packages/completion-worker/dist/completionWorkerMain.js:636:45)`,
      type: 'TypeError',
      name: 'TypeError',
    },
    message: 'x is not a function',
  })
})
