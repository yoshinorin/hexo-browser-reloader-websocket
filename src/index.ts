import { getOrDefault } from './config';
import { notifier } from './notifier';
import { isServerMode } from './utils';

hexo.extend.filter.register('server_middleware', notifier, 999);
hexo.extend.injector.register('body_end', () => {
  // NOTE: inject script when run `hexo server`.
  if (isServerMode(hexo)) {
    const config = getOrDefault(hexo);
    // TODO: error handling (Websocket connection failed. etc...) & retry.
    // TODO: host should be configurable?
    return '<script>'
      + `const socket = new WebSocket("ws://localhost:${config.server.port}");`
      + 'const path = window.location.pathname.split("?")[0];'
      + 'const sendReloadingMessage = () => { socket.send("The browser is reloading. Please wait for the reload. This take a little longer if there are a lot of routes (post, page, assets, tags, categories etc).") };'
      + 'socket.addEventListener("open", (event) => {socket.send("Connection established from " + path)});'
      + `socket.addEventListener("message", (event) => {if (event.data === "${config.notification.message}") { sendReloadingMessage(); socket.close(); location.reload();}});`
    + '</script>';
  }
});
