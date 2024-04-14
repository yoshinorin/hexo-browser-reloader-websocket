[![npm version](https://badge.fury.io/js/hexo-browser-reloader-websocket.svg)](https://badge.fury.io/js/hexo-browser-reloader-websocket) [![CI](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml/badge.svg)](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml) | <sub>[Coverage Report](https://yoshinorin.github.io/hexo-browser-reloader-websocket/)</sub>

# hexo-browser-reloader-websocket

Automatically reloads the browser when files are modified while the [hexo-server](https://github.com/hexojs/hexo-server) is running. Inspired by [hexo-browsersync](https://github.com/hexojs/hexo-browsersync).

## Usage

`hexo-browser-reloader-websocket` is transparent. Once installed, just run `hexo-server`.

> [!WARNING]
> Please **DO NOT USE** in production (It means do not run `hexo-server` in production). </br>
> - <sub>Please use this plugin only for development (local environment).</sub>
> - <sub>Hexo is a static site generator. It is not intended to run `hexo-server` in production.</sub>
> - <sub>This plugin does not encrypt between the WebSocket server and client. </sub>

## Install

```sh
npm i hexo-browser-reloader-websocket
```

## Configuration

**Example (Defalut):**

```yaml
# _config.yml
browser_reloader_websocket:
  enable: true
  server:
    port: 4001
  notification:
    message: "reloadBrowser"
    wait:
      min: 150 # ms
      autoCalc:
        enable: true
        coefficient: 1.0
```

| key | type | description | default |
|---|---|---|---|
| `enable` | boolean | Manage enable or disable this plugin. | `true` |
| `port` | number | WebSocket server's port. | `4001` |
| `message` | string | [WebSocket message event data](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event). | `reloadBrowser` |
| `wait.min` | number | Minimum waiting time for reload browser after detecting file changes. Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#about-wait-time). | `150` |
| `wait.autoCalc.enable` | boolean | Calculate the waiting time for the reload browser after detecting file changes based on the number of routes. Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#about-waitautocalc-formula). | `true` |
| `wait.autoCalc.coefficient` | number | Coefficient for calculate wait time if autoCalc is enabled. | `1.0` |

### About wait time

Reloading the browser by this plugin may be faster than the hexo-server's [router](https://hexo.io/api/router) updating if there are few routes or a lot of routes. The router updating depends on the number of post, pages, assets, tags, categories...etc. Also it depends on theme, plugins and machine power etc.

The `wait` option for resolve this, wait a little bit after file change detection before starting the browser reload.

### About `wait.autoCalc` calculation formula

If the `wait.autoCalc.enabled` option is `true`, the plugin calculates the waiting time based on the number of routes. Below is a calculation formula.

```text
// calculation formula
(<number of routes> / 10) * <autoCalc.coefficient> = wait(ms)

// example
(1200 / 10) * 0.9 = 108ms
```

## Logger

Please see [logger](./docs/logger.md) docs if you need.
