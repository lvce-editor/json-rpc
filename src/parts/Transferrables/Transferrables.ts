import * as IsOffscreenCanvas from '../IsOffscreenCanvas/IsOffscreenCanvas.ts'
import * as IsMessagePortMain from '../IsMessagePortMain/IsMessagePortMain.ts'
import * as IsMessagePort from '../IsMessagePort/IsMessagePort.ts'

export const transferrables = [
  IsOffscreenCanvas.isOffscreenCanvas,
  IsMessagePortMain.isMessagePortMain,
  IsMessagePort.isMessagePort,
]
