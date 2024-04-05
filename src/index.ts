import { getOrDefault } from './config';
import { notifier } from './notifier';
import { isServerMode } from './utils';

hexo.extend.filter.register('server_middleware', notifier, 999);
hexo.extend.injector.register('body_end', () => {
  // NOTE: inject script when run `hexo server`.
  if (isServerMode(hexo)) {
    const config = getOrDefault(hexo);
    // TODO: error handling (Websocket connection failed. etc...)
    // TODO: host should be configurable?
    // TODO: console.log (browser side)
    return '<script>'
      + `const socket = new WebSocket("ws://localhost:${config.server.port}");`
      + 'socket.addEventListener("message", (event) => {if (event.data === "reload") {location.reload();}});'
    + '</script>';
  }
});
