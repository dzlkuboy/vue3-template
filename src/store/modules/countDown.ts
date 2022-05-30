import { defineStore } from 'pinia';

interface stateModel {
  countTime: number;
  isStart: boolean;
  timeId: ReturnType<typeof setInterval> | null;
  num: number;
  num1: number;
}

export const useCountDownStore = defineStore('countDown', {
  state: (): stateModel => ({
    num: 1,
    num1: 10,
    // 倒计时时间
    countTime: 10,
    // 是否开始倒计时
    isStart: false,
    // setInterval
    timeId: null,
  }),
  getters: {
    getBtnText(): string {
      return !this.isStart ? '获取验证码' : `${this.countTime}s`;
    },
  },
  actions: {
    changeNum(num: number): void {
      this.num = num;
    },
    clear() {
      this.timeId && window.clearInterval(this.timeId);
    },
    stopDown() {
      this.isStart = false;
      this.clear();
      this.timeId = null;
    },
    async startDown() {
      if (this.isStart || !!this.timeId) {
        return;
      }
      this.isStart = true;
      this.timeId = setInterval(() => {
        if (this.countTime === 1) {
          this.stopDown();
          this.countTime = 10;
        } else {
          this.countTime -= 1;
        }
      }, 1000);
    },
  },
});
