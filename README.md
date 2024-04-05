# hexo-browser-reloader-websocket

While hexo-server is running, automatically reloads the browser when files are modified. Inspired by [hexo-browsersync](https://github.com/hexojs/hexo-browsersync).

> [!WARNING]
> Please DO NOT USE in production. (Hexo is a static site generator. It is not intended to run `hexo-server` in production.)

## Features

- Reloads the browser when files are modified.

## Configuration

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

## Note

Please reload a browser manually if you are restarted `hexo-server`.


## What is difference between hexo-browser-sync?

TODO
