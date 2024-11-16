export const getErrorType = (prettyError: any): string | undefined => {
  if (prettyError && prettyError.type) {
    return prettyError.type
  }
  if (prettyError && prettyError.constructor && prettyError.constructor.name) {
    return prettyError.constructor.name
  }
  return undefined
}
