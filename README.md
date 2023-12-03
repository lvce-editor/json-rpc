# @lvce-editor/json-rpc

JsonRpc implementation.

## Install

```sh
npm install @lvce-editor/json-rpc
```

## Usage

```js
import * as JsonRpc from '@lvce-editor/json-rpc'

const ipc = {
  send(message) {
    JsonRpc.resolve(message.id, message.params[0], message.params[1])
  },
}

await JsonRpc.invoke(ipc, 'add', 1, 2) // returns 3
```

## Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lvce-editor/json-rpc)
