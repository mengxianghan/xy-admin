import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import pkg from './package.json'

import useCompressPlugin from './config/useCompressPlugin'
import useProgressPlugin from './config/useProgressPlugin'
import useVuePlugin from './config/useVuePlugin'
import useVisualizerPlugin from './config/useVisualizerPlugin'
import useServer from './config/useServer'
import useEslintPlugin from './config/useEslintPlugin'

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
                        tinymce: ['tinymce'],
                        echarts: ['echarts'],
                        'lodash-es': ['lodash-es'],
                        'ant-design-vue': ['ant-design-vue'],
                        jschardet: ['jschardet'],
                        qrcode: ['qrcode'],
                        cropper: ['cropperjs'],
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
            __APP_INFO__: JSON.stringify({
                version: pkg.version,
            }),
        },
        plugins: [useVuePlugin(), useProgressPlugin(), useCompressPlugin(), useVisualizerPlugin(), useEslintPlugin()],
        server: useServer(),
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    })
}
