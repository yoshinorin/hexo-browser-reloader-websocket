import type Hexo from 'hexo';

import { logger } from 'hexo-log';
import { Config, getOrDefault } from './config';
import { makeWss } from './ws';

const log = logger({
  debug: false,
  silent: false
});

export function notifier(this: Hexo) {
  const self = this;
  const config: Config = getOrDefault(self);
  const wss = makeWss(config);

  self.on('server', () => {
    self.source.on('processAfter', x => {
      log.info(`[Browser Reloader]: file ${x.type} detected - ${x.path}`);
      // NOTE: When there are few articles or pages, reloading the browser may be faster than re-rendering.
      //       Therefore, delay sending the message just a little bit.
      setTimeout(() => {
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(config.notification.message);
          }
        });
      }, config.notification.wait);
    });
  });
}
