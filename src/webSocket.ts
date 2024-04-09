import { Config } from './config';
import { WebSocket } from 'ws';
import { logger } from 'hexo-log';
import { logPrefix } from './utils';

const log = logger({
  debug: false,
  silent: false
});

export const createWebSocketServer = (config: Config) => {
  const p = logPrefix();
  const wss = new WebSocket.Server({
    port: config.server.port
  });

  log.debug(`${p} plugin config is: \n ${JSON.stringify(config, null, 2)}`);

  wss.on('error', err => {
    log.error(`${p} ${err}`);
  });

  wss.on('connection', (ws, request, client) => {
    ws.on('message', data => {
      const d = JSON.parse(data);

      switch (d.type) {
        case 'connected':
          log.debug(`${p} ${d.message}`);
          break;
        case 'reload':
          log.info(`${p} ${d.message}`);
          break;
        default:
          // Nothing todo
      }
    });

    ws.on('close', () => {
      log.debug(`${p} Connection closed`);
    });

    ws.on('error', err => {
      log.error(`${p} ${err}`);
    });
  });

  return wss;
};

export const isReady = (status: any): boolean => {
  return status === WebSocket.OPEN;
};
