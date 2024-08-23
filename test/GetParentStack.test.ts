import { expect, test } from '@jest/globals'
import * as GetParentStack from '../src/parts/GetParentStack/GetParentStack.ts'

test('empty object', () => {
  const error = {}
  expect(GetParentStack.getParentStack(error)).toBe('')
})
