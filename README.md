[![npm version](https://badge.fury.io/js/hexo-browser-reloader-websocket.svg)](https://badge.fury.io/js/hexo-browser-reloader-websocket) [![CI](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml/badge.svg)](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml) | <sub>[Coverage Report](https://yoshinorin.github.io/hexo-browser-reloader-websocket/)</sub>

# hexo-browser-reloader-websocket

Automatically reloads the browser when files are modified while the hexo-server is running.

Inspired by [hexo-browsersync](https://github.com/hexojs/hexo-browsersync).

## Usage

`hexo-browser-reloader-websocket` is transparent. Once installed, just run `hexo-server` as you usually do.

> [!WARNING]
> Please **DO NOT USE** in production with `hexo-server`. </br>
> - <sub>Please use this plugin only for development (local env).</sub>
> - <sub>Hexo is a static site generator. It is not intended to run `hexo-server` in production.</sub>
> - <sub>This plugin does not encrypt between the WebSocket server and client. </sub>

## Features

Reloads the browser when files are modified.

## Configuration

**Example (Defalut):**

```yaml
# _config.yml
ws_browser_reloader:
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
| port | number | WebSocket server's port. | `4001` |
| message | string | [WebSocket message event data](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event). | `reloadBrowser` |
| wait.min | number | Minimum waiting time for reload browser after detecting file changes. Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#About-wait-time). | `150` |
| wait.autoCalc.enable | boolean | Calculate the waiting time for the reload browser after detecting file changes based on the number of routes (Post, Page, Assets, Tags, Categories...etc). Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#About-wait.autoCalc-formula). | `true` |
| wait.autoCalc.coefficient | number | Coefficient for calculate wait time if autoCalc is enabled. | `1.0` |

### About wait time

Reloading the browser by this plugin may be faster than the hexo-server's router updating if there are few post and pages or a lot of post and pages.

Its depends on machine power etc. For example below environments need to wait around 300 ~ 500ms before starting to reload the browser.

```
// hexo
hexo: 7.1.1
node: 20.11.1
post: 1773
# Number of: Post, Page, Assets, Tags, Categories...etc
routes: 5333

// machine
os: Microsoft Windows 11 Pro
build: 10.0.22631
cpu: AMD Ryzen 7 PRO 4750G with Radeon Graphics
physicalMemory: 32,125 MB
```

### About `wait.autoCalc` formula

If the wait.autoCalc.enabled option is enabled, the plugin calculates the waiting time for the reload browser after detecting file changes based on the number of routes (Post, Page, Assets, Tags, Categories...etc). Below is a formula.

```text
(<routes> / 10) * <autoCalc.coefficient> = wait(ms)

// example
(1200 / 10) * 0.9 = 108ms
```

## Note

Please reload a browser manually if you are restarted `hexo-server`.


## What is difference between hexo-browser-sync?

TODO
