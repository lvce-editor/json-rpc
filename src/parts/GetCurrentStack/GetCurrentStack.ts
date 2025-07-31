import * as JoinLines from '../JoinLines/JoinLines.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const getCurrentStack = (): string => {
  const stackLinesToSkip = 3
  const currentStack = JoinLines.joinLines(
    SplitLines.splitLines(new Error().stack || '').slice(stackLinesToSkip),
  )
  return currentStack
}
