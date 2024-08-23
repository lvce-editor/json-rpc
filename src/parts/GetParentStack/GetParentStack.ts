import * as Character from '../Character/Character.ts'

export const getParentStack = (error: any) => {
  let parentStack = error.stack || error.data || error.message || ''
  if (parentStack.startsWith('    at')) {
    parentStack = error.message + Character.NewLine + parentStack
  }
  return parentStack
}
