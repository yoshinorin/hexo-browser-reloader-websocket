import type Hexo from 'hexo';
import { logger } from 'hexo-log';
import { Config } from './config';

export const isServerMode = (hexo: Hexo): boolean => {
  if (hexo.env === undefined || hexo.env.cmd === undefined) {
    return false;
  }
  return hexo.env.cmd.toLowerCase() === 'server' || hexo.env.cmd.toLowerCase() === 's';
};

export const logPrefix = (): string => {
  return '[hexo-browser-reloader-websocket]:';
};

export const createLogger = (config: Config) => {
  return logger({
    debug: config.logger.debug,
    silent: config.logger.silent
  });
};
