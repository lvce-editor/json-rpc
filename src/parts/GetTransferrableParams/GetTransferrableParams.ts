import * as IsTransferrable from '../IsTransferrable/IsTransferrable.ts'

export const getTransferrableParams = <T>(params: T): T | undefined => {
  if (IsTransferrable.isTransferrable(params)) {
    return params
  }
  if (Array.isArray(params)) {
    return params.filter(IsTransferrable.isTransferrable)
  }
  return undefined
}
