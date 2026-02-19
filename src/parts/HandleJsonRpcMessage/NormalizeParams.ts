import * as Resolve from '../Resolve/Resolve.ts'

const defaultPreparePrettyError = (error: unknown): unknown => {
  return error
}

const defaultLogError = (): void => {
  // ignore
}

const defaultRequiresSocket = (): boolean => {
  return false
}

const defaultResolve = Resolve.resolve

// TODO maybe remove this in v6 or v7, only accept options object to simplify the code
export const normalizeParams = (args: any[]): any => {
  if (args.length === 1) {
    const options = args[0]
    return {
      execute: options.execute,
      ipc: options.ipc,
      logError: options.logError || defaultLogError,
      message: options.message,
      preparePrettyError:
        options.preparePrettyError || defaultPreparePrettyError,
      requiresSocket: options.requiresSocket || defaultRequiresSocket,
      resolve: options.resolve || defaultResolve,
    }
  }

  return {
    execute: args[2],
    ipc: args[0],
    logError: args[5],
    message: args[1],
    preparePrettyError: args[4],
    requiresSocket: args[6],
    resolve: args[3],
  }
}
