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
    const s = `
      const socket = new WebSocket("ws://localhost:${config.server.port}");
      const path = window.location.pathname.split("?")[0];

      const reloadingMessage = '{"type":"reload", "message": "The browser is reloading. Please wait for the reload. This may take a little longer..."}';
      const connectedMessage = JSON.stringify({"type":"connected", "message": "Connection established from " + path});

      const sendReloadingMessage = () => { socket.send(reloadingMessage) };
      socket.addEventListener("open", (event) => {socket.send(connectedMessage)});
      socket.addEventListener("message", (event) => {if (event.data === "${config.notification.message}") { sendReloadingMessage(); socket.close(); location.reload();}});
    `;

    return `<script>${s}</script>`;
  }
});
