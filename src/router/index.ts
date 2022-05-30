import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/TransitionView/index.vue'),
    meta: {
      title: '过渡',
      transition: 'slide-right',
    },
  },
  {
    path: '/sweep',
    component: () => import('@/views/SweepView/index.vue'),
    meta: {
      title: '扫雷',
      transition: 'slide-left',
    },
  },
  {
    path: '/test',
    component: () => import('@/views/TestView/index.vue'),
    meta: {
      title: '测试',
      transition: 'slide-right',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    }
  },
});

export default router;
