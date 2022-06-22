import { resolve } from 'path';
import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { wrapperEnv } from './build/utils';
import pkg from './package.json';

process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

  // const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/head',
          'pinia',
          {
            '@/store': ['useStore'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
      }),
    ],
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
};
// export default defineConfig({

// })
