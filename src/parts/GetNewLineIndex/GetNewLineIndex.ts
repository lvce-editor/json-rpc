import * as Character from '../Character/Character.ts'

export const getNewLineIndex = (
  string: string,
  startIndex = undefined,
): number => {
  return string.indexOf(Character.NewLine, startIndex)
}
