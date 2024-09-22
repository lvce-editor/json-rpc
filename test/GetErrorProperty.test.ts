import { expect, test } from '@jest/globals'
import * as GetErrorProperty from '../src/parts/GetErrorProperty/GetErrorProperty.js'

test('DOMException - SecurityError', () => {
  const error = null
  const prettyError = new DOMException(
    `Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin "http://localhost:3000" from accessing a cross-origin frame.`,
    'SecurityError',
  )
  expect(GetErrorProperty.getErrorProperty(error, prettyError)).toEqual({
    code: -32001,
    data: {
      code: 18,
      codeFrame: undefined,
      stack: expect.stringMatching(
        `SecurityError: Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin \"http://localhost:3000\" from accessing a cross-origin frame.`,
      ),
      type: 'DOMException',
      name: 'SecurityError',
    },
    message: `Failed to read a named property 'addEventListener' from 'Window': Blocked a frame with origin "http://localhost:3000" from accessing a cross-origin frame.`,
  })
})