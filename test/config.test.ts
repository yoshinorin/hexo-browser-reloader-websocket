import Hexo from 'hexo';
import { expect, test } from 'vitest';
import { calcWait, getOrDefault } from '../src/config';

test('getOrDefault should returns default config if hexo ctx has not plugins config.', () => {
  const h = new Hexo();

  const expected = {
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
  };

  const c = getOrDefault(h);
  expect(c).toEqual(expected);

});

test('getOrDefault should returns hexo ctx plugins config.', () => {
  const h = new Hexo();
  h.config.browser_reloader_websocket = {
    enable: false,
    server: {
      port: 9999
    },
    notification: {
      message: 'testMessage',
      wait: {
        min: 999, // ms
        autoCalc: {
          enable: true,
          coefficient: 1.6
        }
      }
    },
    logger: {
      debug: true,
      silent: true
    }};
  const expected = {
    enable: false,
    server: {
      port: 9999
    },
    notification: {
      message: 'testMessage',
      wait: {
        min: 999, // ms
        autoCalc: {
          enable: true,
          coefficient: 1.6
        }
      }
    },
    logger: {
      debug: true,
      silent: true
    }};

  const c = getOrDefault(h);
  expect(c).toEqual(expected);
});

test('calcWait should returns configs min value if autoCalc object is nothing', () => {
  const c = {
    notification: {
      wait: {
        min: 1
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(1);
});

test('calcWait should returns configs min value if autoCalc is disabled', () => {
  const c = {
    notification: {
      wait: {
        min: 2,
        autoCalc: {
          enable: false,
          coefficient: 1.6
        }
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(2);
});

test('calcWait should returns calculated wait time by numOfRoutes and config', () => {
  const c = {
    notification: {
      wait: {
        min: 0,
        autoCalc: {
          enable: true,
          coefficient: 1.1
        }
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(110);
});

test('calcWait should returns calculated wait time by numOfRoutes and config (coefficient is zero)', () => {
  const c = {
    notification: {
      wait: {
        min: 0,
        autoCalc: {
          enable: true,
          coefficient: 0
        }
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(100);
});

test('calcWait should returns calculated wait time by numOfRoutes and config (coefficient is negative value)', () => {
  const c = {
    notification: {
      wait: {
        min: 0,
        autoCalc: {
          enable: true,
          coefficient: -1
        }
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(100);
});


test('calcWait should returns min wait time if min value is rather than calculated value', () => {
  const c = {
    notification: {
      wait: {
        min: 101,
        autoCalc: {
          enable: true,
          coefficient: 0.1
        }
      }
    }};

  // @ts-ignore
  const result = calcWait(c, 1000);
  expect(result).toEqual(101);
});
