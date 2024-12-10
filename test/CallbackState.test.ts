import { expect, test } from '@jest/globals'
import * as CallbackState from '../src/parts/CallbackState/CallbackState.ts'

test('clear', () => {
  const id = 1
  const fn = () => {}
  CallbackState.set(id, fn)
  CallbackState.clear()
  expect(CallbackState.get(id)).toBeUndefined()
})
