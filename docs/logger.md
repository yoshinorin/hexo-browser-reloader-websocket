## Logger

If you want to see full log, set `logger.debug = true` in your `_config.yml`

### Configuration

**Example (Defalut):**

```yaml
# _config.yml
browser_reloader_websocket:
  server:
    port: 4001
  notification:
    message: "reloadBrowser"
    wait:
      min:
      autoCalc:
        enable: true
        coefficient: 1.0
  # add logger config
  logger:
    debug: false
    silent: false
```

| key | type | description | default |
|---|---|---|---|
| logger.debug | boolean | Logs verbose messages to the terminal. | `false` |
| logger.silent | boolean | Silences output to the terminal. | `false` |

### Log example

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
