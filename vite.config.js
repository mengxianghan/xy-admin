import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import pkg from './package.json'

import useCompressPlugin from './config/useCompressPlugin'
import useProgressPlugin from './config/useProgressPlugin'
import useVuePlugin from './config/useVuePlugin'
import useVisualizerPlugin from './config/useVisualizerPlugin'
import useServer from './config/useServer'

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
                            @import '${path.resolve(__dirname, 'src/styles/vars.less')}';
                            @import '${path.resolve(__dirname, 'src/styles/util.less')}';
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
        plugins: [useVuePlugin(), useProgressPlugin(), useCompressPlugin(), useVisualizerPlugin()],
        server: useServer(),
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        },
    })
}
