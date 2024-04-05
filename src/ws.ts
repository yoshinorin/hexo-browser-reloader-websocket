import { Config } from './config';
import WebSocket from 'ws';
import { logger } from 'hexo-log';

const log = logger({
  debug: false,
  silent: false
});

export const makeWss = (config: Config) => {
  const wss = new WebSocket.Server({
    port: config.server.port
  });

  // TODO: consider log format.
  log.info(`[Browser Reloader]: settings - ${JSON.stringify(config, null, 2)}`);

  wss.on('error', err => {
    log.error(`[Browser Reloader]: ${err}`);
  });

  wss.on('connection', () => {
    log.info('[Browser Reloader]: Connection established.');
  });

  return wss;
};

export const isReady = (status: any): boolean => {
  return status === WebSocket.OPEN;
};
