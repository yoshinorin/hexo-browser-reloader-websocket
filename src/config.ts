import type Hexo from 'hexo';

export interface Config {
    server: {
      port: number,
    },
    notification: {
      message: string,
      wait: number
    }
  }

export const getOrDefault = (hexo: Hexo): Config => {
  return Object.assign({
    server: {
      port: 4001
    },
    notification: {
      message: 'reloadBrowser',
      // ms
      wait: 150
    }
  }, hexo.config.ws_browser_reloader);
};
