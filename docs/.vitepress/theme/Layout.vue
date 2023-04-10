<template>
    <config-provider :locale="locale">
        <layout></layout>
    </config-provider>
</template>

<script>
import { ConfigProvider } from "ant-design-vue"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import DefaultTheme from 'vitepress/theme'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default {
    components: { ConfigProvider, Layout: DefaultTheme.Layout },
    setup() {
        const locale = zhCN

        return {
            locale
        }
    }
}
</script>

<style lang="scss" scoped>

</style>