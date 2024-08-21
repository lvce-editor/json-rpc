import * as IsTransferrable from '../IsTransferrable/IsTransferrable.ts'

export const getTransferrableParams = (
  params: unknown,
): unknown | undefined => {
  if (IsTransferrable.isTransferrable(params)) {
    return params
  }
  if (Array.isArray(params)) {
    return params.filter(IsTransferrable.isTransferrable)
  }
  return undefined
}
