import type Hexo from 'hexo';

import { logger } from 'hexo-log';
import { Config, getOrDefault } from './config';
import { isReady, makeWss } from './ws';
import { logPrefix } from './utils';

const log = logger({
  debug: false,
  silent: false
});

export function notifier(this: Hexo) {
  const self = this;
  const config: Config = getOrDefault(self);

  self.on('server', () => {
    const p = logPrefix();
    const wss = makeWss(config);

    self.source.on('processAfter', x => {
      log.info(`${p} File ${x.type} detected - ${x.path}`);
      // NOTE: When there are few articles or pages, reloading the browser may be faster than re-rendering.
      //       Therefore, delay sending the message just a little bit.
      setTimeout(() => {
        wss.clients.forEach(client => {
          if (isReady(client.readyState)) {
            client.send(config.notification.message);
          }
        });
      }, config.notification.wait);
    });
  });
}
