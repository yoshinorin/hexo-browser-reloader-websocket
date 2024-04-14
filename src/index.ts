import { getOrDefault } from './config';
import { notifier } from './notifier';
import { isServerMode } from './utils';

const config = getOrDefault(hexo);

// NOTE: register server middleware and inject script when run `hexo server`.
if (config.enable && isServerMode(hexo)) {
  hexo.extend.filter.register('server_middleware', notifier, 999);
  hexo.extend.injector.register('body_end', () => {

    return `<script>
    // This script injected by 'hexo-browser-reloader-websocket' plugin.
    // Inject only when running 'hexo-server' with 'hexo server' command.
    ${
      function observe(wsUrl, reloadMessage) {

        const logPrefix = '[hexo-browser-reloader-websocket]:';
        let connectionCloser = '';
        // TODO: configurable
        const RETRY_INTERVAL = 5000;

        const socket = new WebSocket(wsUrl);
        const path = window.location.pathname.split('?')[0];
        const connectedMessage = JSON.stringify(
          {
            'type': 'connected',
            'message': 'Connection established from ' + path
          }
        );
        const reloadingMessage = JSON.stringify(
          {
            'type': 'reload',
            'message': 'The browser is reloading. Please wait for the reload. This may take a little longer...'
          }
        );

        socket.addEventListener('open', () => {
          console.log(`${logPrefix} Connected.`);
          socket.send(connectedMessage);
        });

        socket.addEventListener('message', event => {
          if (event.data === reloadMessage) {
            console.log(`${logPrefix} Received reload message from WebSocket Server.`);
            connectionCloser = 'client';
            socket.send(reloadingMessage);
            socket.close();
            location.reload();
          }
        });

        socket.addEventListener('close', () => {
          if (connectionCloser !== 'client') {
            console.warn(`${logPrefix} Connection closed. Attempt to reconnect in ${RETRY_INTERVAL / 1000} seconds.`);
            setTimeout(() => observe(wsUrl, reloadMessage), RETRY_INTERVAL);
          }
        });

        /*
        socket.addEventListener('error', () => {
          // TODO: might implement.
        });
        */
      }
    }
    observe("ws://localhost:${config.server.port}", "${config.notification.message}");
    </script>`;
  });
}

