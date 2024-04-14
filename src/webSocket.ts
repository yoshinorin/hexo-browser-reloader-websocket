import { Config } from './config';
import { WebSocket } from 'ws';
import { createLogger, logPrefix } from './utils';

export const createWebSocketServer = (config: Config) => {
  const log = createLogger(config);
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
          log.info(`${d.message}`);
      }
    });

    ws.on('close', () => {
      log.debug(`${p} Connection closed.`);
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
