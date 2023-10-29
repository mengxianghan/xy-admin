export default {
    '/guide/': [
        { text: '开始使用', link: '/guide/started' },
        { text: '路由和菜单', link: '/guide/route-and-nav' },
        { text: '布局', link: '/guide/layout' },
        { text: '样式', link: '/guide/style' },
        { text: '和服务端交互', link: '/guide/server' },
        { text: '构建和发布', link: '/guide/deploy' },
        { text: '权限管理', link: '/guide/authority-management' },
        { text: '去除权限控制', link: '/guide/remove-authority-management' },
    ],
    '/components/': [
        {
            text: '组件',
            items: [
                { text: 'ActionBar 操作条', link: '/components/action-bar' },
                { text: 'ActionButton 操作按钮', link: '/components/action-button' },
                { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
                { text: 'Chart 图表', link: '/components/chart' },
                { text: 'Cropper 图片裁剪', link: '/components/cropper' },
                { text: 'CropperDialog 图片裁剪弹窗', link: '/components/cropper-dialog' },
                { text: 'Editor 富文本编辑器', link: '/components/editor' },
                { text: 'Filter 筛选', link: '/components/filter' },
                { text: 'FormTable 表单表格', link: '/components/form-table' },
                { text: 'Loading 加载中', link: '/components/loading' },
                { text: 'Preview 预览', link: '/components/preview' },
                { text: 'QrCode 二维码', link: '/components/qr-code' },
                { text: 'Cascader 级联选择', link: '/components/cascader' },
                { text: 'ResizeBox 伸缩框', link: '/components/resize-box' },
                { text: 'SearchBar 搜索条', link: '/components/search-bar' },
                { text: 'UploadImage 上传图片', link: '/components/upload-image' },
                { text: 'UploadInput 上传文件', link: '/components/upload-input' },
            ],
        },
    ],
    '/utils/': [
        {
            text: 'src/utils/index.js',
            items: [
                {
                    text: 'mapping',
                    link: '/utils/mapping',
                },
                {
                    text: 'findTree',
                    link: '/utils/findTree',
                },
                {
                    text: 'deep',
                    link: '/utils/deep',
                },
            ],
        },
        {
            text: 'src/utils/to.js',
            items: [
                {
                    text: 'tree2list',
                    link: '/utils/tree2list',
                },
                {
                    text: 'list2tree',
                    link: '/utils/list2tree',
                },
            ],
        },
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
    '/npm/': [
        { text: 'xy-ali-oss', link: '/npm/xy-ali-oss' },
        { text: 'xy-http', link: '/npm/xy-http' },
        { text: 'xy-enum', link: '/npm/xy-enum' },
        { text: 'xy-storage', link: '/npm/xy-storage' },
    ],
}
