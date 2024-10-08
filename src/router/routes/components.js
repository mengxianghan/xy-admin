import { AppstoreOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'components',
        name: 'components',
        component: 'RouteViewLayout',
        meta: {
            icon: AppstoreOutlined,
            title: '组件',
            isMenu: true,
            keepAlive: true,
        },
        children: [
            {
                path: 'action-button',
                name: 'actionButton',
                component: 'components/action-button/index.vue',
                meta: {
                    title: '操作按钮',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'breadcrumb',
                name: 'breadcrumb',
                component: 'components/breadcrumb/index.vue',
                meta: {
                    title: '面包屑',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'button',
                name: 'button',
                component: 'components/button/index.vue',
                meta: {
                    title: '按钮',
                    isMenu: true,
                    keepAlive: true,
                    badge: 'new',
                },
            },
            {
                path: 'cascader',
                name: 'cascader',
                component: 'components/cascader/index.vue',
                meta: {
                    title: '级联选择',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'chart',
                name: 'chart',
                component: 'components/chart/index.vue',
                meta: {
                    title: '图表',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'cropper',
                name: 'cropper',
                component: 'components/cropper/index.vue',
                meta: {
                    title: '裁剪',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'editor',
                name: 'editor',
                component: 'components/editor/index.vue',
                meta: {
                    title: '编辑器',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'ellipsis',
                name: 'ellipsis',
                component: 'components/ellipsis/index.vue',
                meta: {
                    title: '文本省略',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'filter',
                name: 'filters',
                component: 'components/filter/index.vue',
                meta: {
                    title: '筛选',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'form-table',
                name: 'formTable',
                component: 'components/form-table/index.vue',
                meta: {
                    title: '表单表格',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'grid',
                name: 'grid',
                component: 'components/grid/index.vue',
                meta: {
                    title: '网格',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'infinite-scroll',
                name: 'infiniteScroll',
                component: 'components/infinite-scroll/index.vue',
                meta: {
                    title: '无限滚动',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'loading',
                name: 'loading',
                component: 'components/loading/index.vue',
                meta: {
                    title: '加载',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'modal',
                name: 'modal',
                component: 'components/modal/index.vue',
                meta: {
                    title: '弹窗',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'preview',
                name: 'preview',
                component: 'components/preview/index.vue',
                meta: {
                    title: '预览',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'qrcode',
                name: 'qrcode',
                component: 'components/qrcode/index.vue',
                meta: {
                    title: '二维码',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'resize-box',
                name: 'resizeBox',
                component: 'components/resize-box/index.vue',
                meta: {
                    title: '伸缩框',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'scrollbar',
                name: 'scrollbar',
                component: 'components/scrollbar/index.vue',
                meta: {
                    title: '滚动条',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'search',
                name: 'search',
                component: 'components/search/index.vue',
                meta: {
                    title: '搜索',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'send-code',
                name: 'sendCode',
                component: 'components/send-code/index.vue',
                meta: {
                    title: '发送验证码',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'table-column-setting',
                name: 'tableColumnSetting',
                component: 'components/table-column-setting/index.vue',
                meta: {
                    title: '表格列设置',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'tag',
                name: 'tag',
                component: 'components/tag/index.vue',
                meta: {
                    title: '标签',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'tag-select',
                name: 'tagSelect',
                component: 'components/tag-select/index.vue',
                meta: {
                    title: '标签选择',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'toolbar',
                name: 'toolbar',
                component: 'components/toolbar/index.vue',
                meta: {
                    title: '工具条',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'transfer',
                name: 'transfer',
                component: 'components/transfer/index.vue',
                meta: {
                    title: '穿梭框',
                    isMenu: true,
                    keepAlive: true,
                    badge: 'update',
                },
            },
            {
                path: 'tree',
                name: 'tree',
                component: 'components/tree/index.vue',
                meta: {
                    title: '树形控件',
                    isMenu: true,
                    keepAlive: true,
                    badge: 'new',
                },
            },
            {
                path: 'upload',
                name: 'upload',
                component: 'components/upload/index.vue',
                meta: {
                    title: '上传',
                    isMenu: true,
                    keepAlive: true,
                },
            },
        ],
    },
]
