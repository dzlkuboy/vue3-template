import { App } from 'vue';
import '@vant/touch-emulator';

import { Button, Card, Tag, Stepper } from 'vant';

const plugins = [Button, Card, Tag, Stepper];

export const vantPlugins = {
  install: function (app: App): void {
    plugins.forEach((item) => {
      app.use(item);
    });
  },
};
