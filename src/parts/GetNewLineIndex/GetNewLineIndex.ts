import * as Character from '../Character/Character.ts'

export const getNewLineIndex = (
  string: string,
  startIndex?: number,
): number => {
  if (startIndex === undefined) {
    return string.indexOf(Character.NewLine)
  }
  return string.indexOf(Character.NewLine, startIndex)
}
