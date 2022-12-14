import { resolve } from 'path';
import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { wrapperEnv } from './build/utils';
import pkg from './package.json';

process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT } = viteEnv;

  // const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY),
      // 配置代理服务器
      proxy: {
        // 码表管理
        '/code': {
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/code/, '/code'),
        },
        // 接口管理（宋杰龙）
        '/api': {
          // target: 'http://10.8.21.150:6002',
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/code/, '/code'),
        },
        // 数据标准目录
        '/standard': {
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
        },
        // 分类（宋杰龙）
        '/category': {
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/code/, '/code'),
        },
        //数据库管理
        '/dataSource': {
          // target: 'http://10.8.21.126:6002',
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
        },
        //脚本管理
        '/scriptInfo': {
          target: 'http://124.223.17.68:6002',
          // target: 'http://10.8.21.150:6002',
          changeOrigin: true,
        },
        //数据资产管理
        '/asset': {
          target: 'http://124.223.17.68:6002',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/script/, ''),
        },
      },
    },
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
        // 配置antd按需引入
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '#': resolve(__dirname, './type'),
      },
    },
  };
};
// export default defineConfig({

// })

// import { resolve } from 'path';
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import pkg from './package.json';

// process.env.VITE_APP_VERSION = pkg.version;
// if (process.env.NODE_ENV === 'production') {
//   process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
// }

// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       imports: [
//         'vue',
//         'vue-router',
//         '@vueuse/head',
//         'pinia',
//         {
//           '@/store': ['useStore'],
//         },
//       ],
//       dts: 'src/auto-imports.d.ts',
//       eslintrc: {
//         enabled: true,
//       },
//     }),
//     Components({
//       dirs: ['src/components'],
//       extensions: ['vue'],
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'),
//     },
//   },
// });
