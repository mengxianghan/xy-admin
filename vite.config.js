import { defineConfig } from 'vite'
import path from 'path'

import useCompressPlugin from './config/useCompressPlugin'
import useProgressPlugin from './config/useProgressPlugin'
import useVuePlugin from './config/useVuePlugin'
import useServer from './config/useServer'

import pkg from './package.json'

const { VITE_PUBLIC_PATH } = process.env

export default defineConfig({
    build: {
        base: VITE_PUBLIC_PATH,
        target: 'es2015',
        cssTarget: 'chrome80',
        brotliSize: false,
        chunkSizeWarningLimit: 2000,
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
    plugins: [useVuePlugin(), useProgressPlugin(), useCompressPlugin()],
    server: useServer(),
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
})
