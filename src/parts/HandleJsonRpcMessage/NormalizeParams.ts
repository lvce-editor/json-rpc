import * as Callback from '../Callback/Callback.ts'

const defaultPreparePrettyError = (error: unknown): unknown => {
  return error
}

const defaultLogError = (): void => {
  // ignore
}

const defaultRequiresSocket = (): boolean => {
  return false
}

const defaultResolve = Callback.resolve

// TODO maybe remove this in v6 or v7, only accept options object to simplify the code
export const normalizeParams = (args: any[]): any => {
  if (args.length === 1) {
    const options = args[0]
    return {
      ipc: options.ipc,
      message: options.message,
      execute: options.execute,
      resolve: options.resolve || defaultResolve,
      preparePrettyError:
        options.preparePrettyError || defaultPreparePrettyError,
      logError: options.logError || defaultLogError,
      requiresSocket: options.requiresSocket || defaultRequiresSocket,
    }
  }

  return {
    ipc: args[0],
    message: args[1],
    execute: args[2],
    resolve: args[3],
    preparePrettyError: args[4],
    logError: args[5],
    requiresSocket: args[6],
  }
}
