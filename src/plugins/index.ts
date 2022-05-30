import { App } from 'vue';

import { vantPlugins } from './vant';

export const setupPlugins = (app: App): void => {
  app.use(vantPlugins);
};
