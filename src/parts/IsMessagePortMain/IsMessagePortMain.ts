export const isMessagePortMain = (value: unknown) => {
  return value?.constructor?.name === 'MessagePortMain'
}
