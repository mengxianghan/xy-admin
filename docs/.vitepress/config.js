import { defineConfig } from 'vitepress'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'XY Admin',
    description: 'xy-admin 使用手册',

    themeConfig: {
        logo: 'http://cdn.xuanyunet.com/images/logo.svg',

        outline: 'deep',
        outlineTitle: '本页目录',

        nav: [
            { text: '指南', link: '/guide/started', activeMatch: '/guide/' },
            { text: '组件', link: '/components/', activeMatch: '/components/' },
            { text: '工具类', link: '/utils/mapping', activeMatch: '/utils/' },
            { text: '指令', link: '/directive/v-loading', activeMatch: '/directive/' },
            { text: '更新日志', link: 'https://github.com/mengxianghan/xy-admin/releases', target: '_blank' },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: '入门',
                    items: [
                        { text: '开始使用', link: '/guide/started' },
                        { text: '路由和菜单', link: '/guide/route-and-nav' },
                        { text: '布局', link: '/guide/layout' },
                        { text: '新增页面', link: '/guide/new-page' },
                        { text: '新增业务组件', link: '/guide/new-component' },
                        { text: '样式', link: '/guide/style' },
                        { text: '和服务端交互', link: '/guide/server' },
                        { text: '引入外部模块', link: '/guide/import' },
                        { text: '构建和发布', link: '/guide/deploy' },
                    ],
                },
                {
                    text: '进阶',
                    items: [
                        { text: '业务图标', link: '/guide/biz-icon' },
                        { text: '错误处理', link: '/guide/error-handle' },
                        { text: '权限管理', link: '/guide/authority-management' },
                        { text: '去除权限控制', link: '/guide/remove-authority-management' },
                    ],
                },
            ],
            '/components/': [
                {
                    text: '组件',
                    items: [
                        { text: 'Filter 筛选', link: '/components/filter' },
                        { text: 'FilterTag 筛选标签', link: '/components/filter-tag' },
                        { text: 'Loading 加载中', link: '/components/loading' },
                        { text: 'Preview 预览', link: '/components/preview' },
                        { text: 'ResizeBox 伸缩框', link: '/components/resize-box' },
                        { text: 'UploadImage 上传图片', link: '/components/upload-image' },
                        { text: 'UploadInput 上传文件', link: '/components/upload-input' },
                        { text: 'ActionBar 操作条', link: '/components/action-bar' },
                        { text: 'ActionButton 操作按钮', link: '/components/action-button' },
                        { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
                        { text: 'Chart 图表', link: '/components/chart' },
                        { text: 'Cropper 图片裁剪', link: '/components/cropper' },
                        { text: 'CropperDialog 图片裁剪弹窗', link: '/components/cropper-dialog' },
                        { text: 'Editor 富文本编辑器', link: '/components/editor' },
                        { text: 'FormTable 表单表格', link: '/components/form-table' },
                        { text: 'QrCode 二维码', link: '/components/qr-code' },
                        { text: 'Region 地区联动', link: '/components/region' },
                        { text: 'SearchBar 搜索条', link: '/components/search-bar' },
                    ],
                },
            ],
            'utils': [
                {
                    text: 'mapping 映射',
                    link: '/utils/mapping'
                }
            ],
            '/directive/': [
                {
                    text: '指令',
                    items: [
                        { text: 'v-loading', link: '/directive/v-loading' },
                        { text: 'v-action', link: '/directive/v-action' },
                    ],
                },
            ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/mengxianghan/xy-admin' }],

        footer: {
            message: '本文档内容版权为 XY Admin 作者所有，保留所有权利。',
        },
    },
    async transformHtml(code, id, context) {},
    vite: {
        server: {
            host: true,
            port: 8000,
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
    },
})
