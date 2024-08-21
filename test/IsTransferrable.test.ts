import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/Transferrables/Transferrables', () => {
  return {
    transferrables: [
      (value: unknown) => {
        return value?.constructor?.name === 'B'
      },
    ],
  }
})

const IsTransferrable = await import(
  '../src/parts/IsTransferrable/IsTransferrable.ts'
)

test('not transferrable', () => {
  class A {}
  const value = new A()
  expect(IsTransferrable.isTransferrable(value)).toBe(false)
})

test('transferrable', () => {
  class B {}
  const value = new B()
  expect(IsTransferrable.isTransferrable(value)).toBe(true)
})
