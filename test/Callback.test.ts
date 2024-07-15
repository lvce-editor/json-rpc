import { expect, test, beforeEach, jest } from '@jest/globals'
import * as Callback from '../src/parts/Callback/Callback.js'
import * as CallbackState from '../src/parts/CallbackState/CallbackState.js'

beforeEach(() => {
  CallbackState.clear()
})

test('registerPromise - resolve', async () => {
  const response = 12
  const { id, promise } = Callback.registerPromise()
  Callback.resolve(id, response)
  expect(await promise).toBe(response)
})

test('resolve - not found', () => {
  const id = 1
  const response = 12
  jest.spyOn(console, 'log').mockImplementation(() => {})
  const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  Callback.resolve(id, response)
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith('callback 1 may already be disposed')
})
