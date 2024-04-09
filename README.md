[![npm version](https://badge.fury.io/js/hexo-browser-reloader-websocket.svg)](https://badge.fury.io/js/hexo-browser-reloader-websocket) [![CI](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml/badge.svg)](https://github.com/yoshinorin/hexo-browser-reloader-websocket/actions/workflows/ci.yml) | <sub>[Coverage Report](https://yoshinorin.github.io/hexo-browser-reloader-websocket/)</sub>

# hexo-browser-reloader-websocket

Automatically reloads the browser when files are modified while the hexo-server is running.

Inspired by [hexo-browsersync](https://github.com/hexojs/hexo-browsersync).

## Usage

`hexo-browser-reloader-websocket` is transparent. Once installed, just run `hexo-server` as you usually do.

> [!WARNING]
> Please **DO NOT USE** in production (It means please do not run `hexo-server` in production). </br>
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
  logger:
    debug: false
    silent: false
```

| key | type | description | default |
|---|---|---|---|
| port | number | WebSocket server's port. | `4001` |
| message | string | [WebSocket message event data](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event). | `reloadBrowser` |
| wait.min | number | Minimum waiting time for reload browser after detecting file changes. Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#about-wait-time). | `150` |
| wait.autoCalc.enable | boolean | Calculate the waiting time for the reload browser after detecting file changes based on the number of routes (Post, Page, Assets, Tags, Categories...etc). Pleasse see [About wait time](https://github.com/yoshinorin/hexo-browser-reloader-websocket#about-waitautocalc-formula). | `true` |
| logger.debug | boolean | Logs verbose messages to the terminal. Pleasse see [example](https://github.com/yoshinorin/hexo-browser-reloader-websocket#log -example). | `false` |
| logger.silent | boolean | Silences output to the terminal. Pleasse see [example](https://github.com/yoshinorin/hexo-browser-reloader-websocket#log -example). | `false` |

### About wait time

Reloading the browser by this plugin may be faster than the hexo-server's router updating if there are few posts and pages or a lot of posts and pages. This means that reloading the browser may be faster than changing by hexo. To resolve this, wait a little bit after file change detection before starting the browser reload. The option for this is wait time.

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

If the `wait.autoCalc.enabled` option is enabled, the plugin calculates the waiting time for the reload browser after detecting file changes based on the number of routes (Post, Page, Assets, Tags, Categories...etc). Below is a formula.

```text
// formula
(<routes> / 10) * <autoCalc.coefficient> = wait(ms)

// example
(1200 / 10) * 0.9 = 108ms
```

### Log Example

If you want to see full log, set `logger.debug = true`. Below is a full log example.

```sh
$ hexo s
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop.
15:46:23.127 DEBUG [hexo-browser-reloader-websocket]: plugin config is:
 {
  "server": {
    "port": 4001
  },
  "notification": {
    "message": "reloadBrowser",
    "wait": {
      "min": 200,
      "autoCalc": {
        "enable": true,
        "coefficient": 1
      }
    }
  },
  "logger": {
    "debug": true,
    "silent": false
  }
}
15:46:23.129 INFO  [hexo-browser-reloader-websocket]: WebSocketServer is ready.
15:46:24.470 DEBUG [hexo-browser-reloader-websocket]: Connection established from /2024/04/05/post3/
15:46:28.168 INFO  [hexo-browser-reloader-websocket]: File update detected. File name is: _posts/post3.md
15:46:28.369 INFO  [hexo-browser-reloader-websocket]: The browser reloading will start in 200 ms.
15:46:28.370 INFO  [hexo-browser-reloader-websocket]: The browser is reloading. Please wait for the reload. This may take a little longer...
15:46:28.372 DEBUG [hexo-browser-reloader-websocket]: Connection closed
15:46:28.535 DEBUG [hexo-browser-reloader-websocket]: Connection established from /2024/04/05/post3/
```

## Note

Please reload a browser manually if you are restarted `hexo-server`.


## What is difference between hexo-browser-sync?

TODO
