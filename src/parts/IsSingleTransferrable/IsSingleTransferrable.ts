import * as IsSocket from '../IsSocket/IsSocket.ts'

export const isSingleTransferrable = (value: unknown): boolean => {
  return IsSocket.isSocket(value)
}
