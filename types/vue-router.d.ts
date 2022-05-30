import { RouteMeta } from 'vue-router';

interface Title18n {
  zh_CN: string;
  en_US: string;
}

type Transition = 'slide-right' | 'slide-left';

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string | Title18n;
    transition?: Transition;
  }
}
