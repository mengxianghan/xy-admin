import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'XYAdmin',
    description: 'xy admin 使用手册',
    appearance: true,
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
    vite: {
        server: {
            host: '0.0.0.0',
            strictPort: false,
        },
    },
})
