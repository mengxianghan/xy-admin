<template>
    <a-config-provider
        :locale="zhCN"
        :theme="theme">
        <router-view />
    </a-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const theme = ref({
    components: {
        List: {
            paddingContentHorizontalLG: 0,
        },
        Table: {
            paddingContentVerticalLG: 12,
            padding: 12,
        },
        Card: {
            paddingLG: 16,
        },
    },
})
</script>

<style lang="less"></style>
