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

  log.info(`${p} settings - ${JSON.stringify(config, null, 2)}`);

  wss.on('error', err => {
    log.error(`${p} ${err}`);
  });

  wss.on('connection', () => {
    log.info(`${p} Connection established.`);
  });

  return wss;
};

export const isReady = (status: any): boolean => {
  return status === WebSocket.OPEN;
};
