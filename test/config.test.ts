import Hexo from 'hexo';
import { expect, test } from 'vitest'
import { Config, getOrDefault } from '../src/config';

test('getOrDefault should returns default config if hexo ctx has not plugins config.', () => {
  const h = new Hexo();

  const expected: Config = {
    server: {
      port: 4001
    },
    notification: {
      message: 'reloadBrowser',
      // ms
      wait: 150
    }};

  const c = getOrDefault(h);
  expect(c).toEqual(expected);

});

test('getOrDefault should returns hexo ctx plugins config.', () => {
  const h = new Hexo();
  h.config.ws_browser_reloader = {
    server: {
      port: 9999
    },
    notification: {
      message: 'testMessage',
      wait: 999
  }};
  const expected: Config = {
    server: {
      port: 9999
    },
    notification: {
      message: 'testMessage',
      wait: 999
  }};

  const c = getOrDefault(h);
  expect(c).toEqual(expected);
});
