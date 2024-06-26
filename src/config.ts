import type Hexo from 'hexo';

export interface Config {
    enable: boolean,
    server: {
      port: number,
    },
    notification: {
      message: string,
      wait: {
        min: number
        autoCalc: {
          enable: boolean,
          coefficient: number
        }
      }
    },
    logger: {
      debug: boolean,
      silent: boolean
    }
  }

export const getOrDefault = (hexo: Hexo): Config => {
  return Object.assign({
    enable: true,
    server: {
      port: 4001
    },
    notification: {
      message: 'reloadBrowser',
      wait: {
        min: 150, // ms
        autoCalc: {
          enable: true,
          coefficient: 1.0
        }
      }
    },
    logger: {
      debug: false,
      silent: false
    }
  }, hexo.config.browser_reloader_websocket);
};

export const calcWait = (config: Config, numOfRoutes: number): number => {
  const { wait } = config.notification;
  const min = wait.min < 0 ? 0 : wait.min;

  if (!wait.autoCalc || !wait.autoCalc.enable) {
    return min;
  }

  const coeff = wait.autoCalc.coefficient <= 0 ? 1 : wait.autoCalc.coefficient;
  const x = Math.floor((numOfRoutes / 10) * coeff);
  if (min > x) {
    return min;
  }
  return x;
};
