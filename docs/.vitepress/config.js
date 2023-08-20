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
        // algolia: {
        //     appId: 'U22360281K',
        //     apiKey: '3e6f9ead870588058fc7d07ae6a344fa',
        //     indexName: 'xy-admin-xuanyunet',
        // },
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
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: `
                            true;
                            @import '${path.resolve(__dirname, '../../src/styles/mixins/index.less')}';
                            @import '${path.resolve(__dirname, '../../src/styles/variables.less')}';
                            @import '${path.resolve(__dirname, '../../src/styles/utils.less')}';
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
    },
})
