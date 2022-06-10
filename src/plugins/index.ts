import { App } from 'vue';

import { vantPlugins } from './vant';
import { i18nPlugins } from './i18n';

export const setupPlugins = (app: App): void => {
  app.use(vantPlugins).use(i18nPlugins);
};
