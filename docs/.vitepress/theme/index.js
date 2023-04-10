import DefaultTheme from 'vitepress/theme'
import antd from 'ant-design-vue'
import Layout from "./Layout.vue"

import 'ant-design-vue/dist/antd.less'
import './index.css'

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.use(antd)
    },
}
