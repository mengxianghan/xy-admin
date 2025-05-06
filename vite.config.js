import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import useCompressPlugin from './config/useCompressPlugin'
import useDemoPlugin from './config/useDemoPlugin'
import useEslintPlugin from './config/useEslintPlugin'
import useProgressPlugin from './config/useProgressPlugin'
import useServer from './config/useServer'
import useVisualizerPlugin from './config/useVisualizerPlugin'
import useVuePlugin from './config/useVuePlugin'
import pkg from './package.json'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    build: {
      outDir: env.VITE_OUT_DIR,
      target: 'es2015',
      cssTarget: 'chrome80',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'tinymce': ['tinymce'],
            'echarts': ['echarts'],
            'lodash-es': ['lodash-es'],
            'ant-design-vue': ['ant-design-vue'],
            'jschardet': ['jschardet'],
            'qrcode': ['qrcode'],
            'cropper': ['cropperjs'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `
                true;
                @import '${path.resolve(__dirname, 'src/styles/variables.less')}';
                @import '${path.resolve(__dirname, 'src/styles/mixins/index.less')}';
             `,
          },
          javascriptEnabled: true,
        },
      },
      devSourcemap: true,
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      __APP_INFO__: JSON.stringify({
        version: pkg.version,
      }),
    },
    plugins: [
      useVuePlugin(),
      useProgressPlugin(),
      useCompressPlugin(),
      useVisualizerPlugin(),
      useEslintPlugin(),
      useDemoPlugin(),
    ],
    server: useServer(),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
