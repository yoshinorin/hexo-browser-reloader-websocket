[![npm version](https://badge.fury.io/js/hexo-browser-reloader-websocket.svg)](https://badge.fury.io/js/hexo-browser-reloader-websocket) [![CI](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml/badge.svg)](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml) | <sub>[Coverage Report](https://yoshinorin.github.io/hexo-browser-reloader-websocket/)</sub>

# hexo-browser-reloader-websocket

While hexo-server is running, automatically reloads the browser when files are modified.

Inspired by [hexo-browsersync](https://github.com/hexojs/hexo-browsersync).

## Usage

`hexo-browser-reloader-websocket` is transparent. Once installed, just run `hexo-server` as you usually do.

> [!WARNING]
> Please **DO NOT USE** in production with `hexo-server`. </br>
> - <sub>Please use this plugin only for development (local env).</sub>
> - <sub>Hexo is a static site generator. It is not intended to run `hexo-server` in production.</sub>
> - <sub>This plugin does not encrypt between the WebSocket server and client. </sub>

## Features

- Reloads the browser when files are modified.

## Configuration

| key | type | description | default |
|---|---|---|---|
| port | number | WebSocket server's port. | `4001` |
| message | string | [WebSocket message event data](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event). | `reloadBrowser` |
| wait | number | Reloading the browser by this plugin may be faster than the hexo-server's router updating **※1** if there are few post and pages or a lot of post and pages. Therefore, delay sending the message from the WebSocket server just a little bit. | `150` |

**Example:**

```yaml
# _config.yml
ws_browser_reloader:
  server:
    port: 4001
  notification:
    message: "reload"
    wait: 200 # ms
```

**※1**: Depends on machine power etc. For example below environments need to wait around 500ms before starting to reload the browser.

```
// hexo
hexo: 7.1.1
node: 20.11.1
post: 1773
routes: 5333

// machine
os: Microsoft Windows 11 Pro
build: 10.0.22631
cpu: AMD Ryzen 7 PRO 4750G with Radeon Graphics
physicalMemory: 32,125 MB
```

## Note

Please reload a browser manually if you are restarted `hexo-server`.


## What is difference between hexo-browser-sync?

TODO
