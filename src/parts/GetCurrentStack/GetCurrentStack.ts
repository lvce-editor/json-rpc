import * as JoinLines from '../JoinLines/JoinLines.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const getCurrentStack = (): string => {
  const currentStack = JoinLines.joinLines(
    SplitLines.splitLines(new Error().stack || '').slice(2),
  )
  return currentStack
}
