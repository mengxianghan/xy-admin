import { defineConfig } from 'vitepress'
import path from 'path'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'XYAdmin',
    description: 'xy admin 使用手册',
    appearance: false,
    themeConfig: {
        logo: 'http://cdn.xuanyunet.com/images/logo.svg',
        outline: 'deep',
        outlineTitle: '本页目录',
        nav,
        sidebar,
        socialLinks: [{ icon: 'github', link: 'https://github.com/mengxianghan/xy-admin' }],
        footer: {
            message: '本文档内容版权为 XYAdmin 作者所有，保留所有权利。',
        },
    },
    markdown: {
        lineNumbers: true,
    },
    head: [
        [
            'script',
            { type: 'application/javascript', src: 'http://xy-admin.xuanyunet.com/libs/tinymce/tinymce.min.js' },
        ],
    ],
    vite: {
        server: {
            host: true,
            port: 9212,
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
            // rollupOptions: {
            //     output: {
            //         manualChunks: {
            //             'lodash-es': ['lodash-es'],
            //             'ant-design-vue': ['ant-design-vue'],
            //             echarts: ['echarts'],
            //             qrcode: ['qrcode'],
            //             cropper: ['cropperjs'],
            //         },
            //     },
            // },
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: `
                            true;
                            @import '${path.resolve(
                                __dirname,
                                '../../node_modules/ant-design-vue/lib/style/color/colors.less'
                            )}';
                            @import '${path.resolve(__dirname, '../../src/styles/vars.less')}';
                            @import '${path.resolve(__dirname, '../../src/styles/util.less')}';
                         `,
                    },
                    javascriptEnabled: true,
                },
            },
            devSourcemap: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../../src'),
            },
        },
        // ssr: {
        //     format: 'cjs',
        //     noExternal: ['ant-design-vue', '@ant-design/icons-vue'],
        // },
    },
})
