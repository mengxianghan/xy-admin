import DefaultTheme from 'vitepress/theme'
import antd, { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Layout from "./Layout.vue";

import 'ant-design-vue/dist/antd.less'
import './index.css'

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.use(antd)

        ConfigProvider.config({
            locale: zhCN,
        });
    },
}
