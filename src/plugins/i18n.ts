import { createI18n } from 'vue-i18n';
import { App } from 'vue';

let messages = {};
const msgResult = Object.entries(
  import.meta.globEager('../../locales/*.y(a)?ml')
).map(([key, value]) => {
  const yaml = key.endsWith('.yaml');
  return [key.slice(14, yaml ? -5 : -4), value.default];
});

messages = Object.fromEntries(msgResult);

console.log(messages);

export const i18nPlugins = {
  install: function (app: App): void {
    const i18n = createI18n({
      legacy: false,
      locale: 'zh_CN',
      messages,
    });

    app.use(i18n);
  },
};
