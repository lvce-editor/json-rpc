import * as IsTransferrable from '../IsTransferrable/IsTransferrable.ts'

export const getTransferrableParams = (value: unknown): unknown | undefined => {
  if (IsTransferrable.isTransferrable(value)) {
    return value
  }
  if (Array.isArray(value)) {
    return value.filter(IsTransferrable.isTransferrable)
  }
  return undefined
}
