import DefaultTheme from 'vitepress/theme'
import antd from 'ant-design-vue'
import components from '@/components'
import Layout from "./Layout.vue"

import 'ant-design-vue/dist/reset.css'
import './index.css'

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.use(antd)
        app.use(components)
    },
}
