import * as IsInstanceOf from '../IsInstanceOf/IsInstanceOf.ts'

export const isMessagePortMain = (value: unknown) => {
  return IsInstanceOf.isInstanceOf(value, 'MessagePortMain')
}
