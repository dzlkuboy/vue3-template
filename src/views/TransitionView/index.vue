<template>
  <div p="x-6 y-6">
    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      w="full"
      p="x-4 y-2"
      m="b-6"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    />

    <canvas ref="el" width="1000" height="600"></canvas>

    <h1>{{ t('btn.text') }}</h1>
    <p>{{ t('common.text') }}</p>
    <button @click="toggleLocales()">切换语言</button>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const name = ref('');

    // $ref可以不用.value
    const el = ref<HTMLCanvasElement>();
    const ctx = computed(() => el.value!.getContext('2d')!);
    const WIDTH = 1000;
    const HEIGHT = 600;

    interface Point {
      x: number;
      y: number;
    }

    interface Branch {
      start: Point;
      length: number;
      theta: number; // 夹角角度
    }

    onMounted(() => {
      init();
    });

    function randomColor() {
      var col = '#';
      for (var i = 0; i < 6; i++)
        col += parseInt(Math.random() * 16).toString(16);
      return col;
    }

    function init() {
      ctx.value.strokeStyle = randomColor();
      el.value!.style.border = 'border';

      step({
        start: {
          x: WIDTH / 2,
          y: HEIGHT,
        },
        length: 20,
        theta: -Math.PI / 2,
      });
    }

    const pendingTasks: Function[] = [];

    function step(b: Branch, depth = 0) {
      const end = getEndPoint(b);
      drawBranch(b);
      if (depth < 2 || Math.random() < 0.5) {
        pendingTasks.push(() =>
          step(
            {
              start: end,
              length: b.length + (Math.random() * 10 - 5),
              theta: b.theta - 0.6 * Math.random(),
            },
            depth + 1
          )
        );
      }

      if (depth < 2 || Math.random() < 0.5) {
        pendingTasks.push(() =>
          step(
            {
              start: end,
              length: b.length + (Math.random() * 10 - 5),
              theta: b.theta + 0.6 * Math.random(),
            },
            depth + 1
          )
        );
      }
    }

    function frame() {
      const tasks = [...pendingTasks];
      pendingTasks.length = 0;
      tasks.forEach((fn) => fn());
    }

    let frameCount = 0;
    function startFrame() {
      requestAnimationFrame(() => {
        frameCount += 1;
        if (frameCount % 3 === 0) frame();
        startFrame();
      });
    }
    startFrame();
    // setInterval()

    function lineTo(p1: Point, p2: Point) {
      ctx.value.beginPath();
      ctx.value.moveTo(p1.x, p1.y);
      ctx.value.lineTo(p2.x, p2.y);
      ctx.value.stroke();
    }

    function getEndPoint(b: Branch): Point {
      return {
        x: b.start.x + b.length * Math.cos(b.theta),
        y: b.start.y + b.length * Math.sin(b.theta),
      };
    }

    function drawBranch(b: Branch) {
      const { start } = b;
      lineTo(start, getEndPoint(b));
    }

    const { t, availableLocales, locale } = useI18n();

    const toggleLocales = () => {
      const locales = availableLocales;
      locale.value =
        locales[(locales.indexOf(locale.value) + 1) % locales.length];
    };

    return {
      name,
      el,
      t,
      toggleLocales,
    };
  },
});
</script>

<style></style>
