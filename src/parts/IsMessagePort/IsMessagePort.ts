export const isMessagePort = (value: unknown): boolean => {
  return typeof MessagePort !== 'undefined' && value instanceof MessagePort
}
