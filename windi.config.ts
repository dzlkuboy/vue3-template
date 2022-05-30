import { defineConfig } from 'windicss/helpers';

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
}

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  safelist: [range(10).map((i) => `p-${i}`), range(10).map((i) => `m-${i}`)],
  // 扫描src中的文件识别出class
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx,ts}'],
    exclude: ['node_modules/**/*', '.git/**/*', '.vscode/**/*'],
  },
});
