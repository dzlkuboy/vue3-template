import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';

import Components from 'unplugin-vue-components/vite';

import Icons from 'unplugin-icons/vite';
import { promises as fs } from 'fs';

import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers';

import { resolve } from 'path';

import styleImport, { VantResolve } from 'vite-plugin-style-import';

import { viteMockServe } from 'vite-plugin-mock';

import VueI18n from '@intlify/vite-plugin-vue-i18n';
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      WindiCSS(),
      styleImport({
        resolves: [VantResolve()],
      }),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue\??/],
        dts: './types/auto-imports.d.ts',
        imports: [
          'vue',
          'pinia',
          'vue-router',
          'vue/macros',
          '@vueuse/core',
          'vue-i18n',
        ],
        eslintrc: {
          enabled: false,
          globalsPropValue: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }),
      Components({
        deep: true,
        extensions: ['vue', 'md'],
        dts: 'types/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true, // vue3 default: true
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          'my-icons': {
            account: '<svg><!-- ... --></svg>',
            settings: () =>
              fs.readFile('./src/assets/projection_g.svg', 'utf-8'),
          },
        },
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        injectCode: `
          import { setupProdMockServer } from './mock/_createProductionServer';
          setupProdMockServer();
        `,
      }),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'locales/**')],
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {},
        },
      },
    },
  };
};
