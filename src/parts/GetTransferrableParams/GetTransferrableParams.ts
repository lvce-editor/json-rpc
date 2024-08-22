import * as GetTransferrables from '../GetTransferrables/GetTransferrables.ts'
import * as IsSingleTransferrable from '../IsSingleTransferrable/IsSingleTransferrable.ts'

export const getTransferrableParams = (value: unknown): unknown | undefined => {
  const transferrables = GetTransferrables.getTransferrables(value)
  if (transferrables.length === 0) {
    return undefined
  }
  if (IsSingleTransferrable.isSingleTransferrable(transferrables[0])) {
    return transferrables[0]
  }
  return transferrables
}
