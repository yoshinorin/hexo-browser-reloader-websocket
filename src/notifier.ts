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
    const wt = config.notification.wait;

    self.source.on('processAfter', x => {
      log.info(`${p} File ${x.type} detected. File name is: ${x.path}`);
      // NOTE: Reloading the browser by this plugin may be faster than the hexo-server's router updating
      //       if there are few post and pages or a lot of post and pages.
      //       Therefore, delay sending the message from the WebSocket server just a little bit.
      setTimeout(() => {
        wss.clients.forEach(client => {
          if (isReady(client.readyState)) {
            client.send(config.notification.message);
            log.info(`${p} The browser reloading will start in ${wt} ms.`);
          }
        });
      }, wt);
    });
  });
}
