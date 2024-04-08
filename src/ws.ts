import { Config } from './config';
import WebSocket from 'ws';
import { logger } from 'hexo-log';
import { logPrefix } from './utils';

const log = logger({
  debug: false,
  silent: false
});

export const makeWss = (config: Config) => {
  const p = logPrefix();
  const wss = new WebSocket.Server({
    port: config.server.port
  });

  log.info(`${p} plugin config is: \n ${JSON.stringify(config, null, 2)}`);

  wss.on('error', err => {
    log.error(`${p} ${err}`);
  });

  wss.on('connection', (ws, request, client) => {
    log.debug(`${p} Connection established.`);

    ws.on('message', data => {
      log.info(`${p} ${data}`);
    });

    ws.on('close', () => {
      log.info(`${p} Connection closed`);
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
