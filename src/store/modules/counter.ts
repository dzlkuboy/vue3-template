import { defineStore } from 'pinia';
import { useCountDownStore } from './countDown';
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 1,
      card: '411024199909020203',
    };
  },
  getters: {
    hiddenCard(): string {
      return this.card.replace(/(.{4}).*(.{2})/, '$1********$2');
    },
  },
  actions: {
    increment() {
      const countDownStore = useCountDownStore();
      countDownStore.changeNum(20);
      this.count++;
    },
  },
});
