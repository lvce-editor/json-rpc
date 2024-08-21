import * as IsSingleTransferrable from '../IsSingleTransferrable/IsSingleTransferrable.ts'
import * as IsTransferrable from '../IsTransferrable/IsTransferrable.ts'

export const getTransferrableParams = (value: unknown): unknown | undefined => {
  if (IsTransferrable.isTransferrable(value)) {
    return value
  }
  if (Array.isArray(value)) {
    const result = value.filter(IsTransferrable.isTransferrable)
    if (result.length === 0) {
      return undefined
    }
    if (
      result.length === 1 &&
      IsSingleTransferrable.isSingleTransferrable(result[0])
    ) {
      return result[0]
    }
    return result
  }
  return undefined
}
