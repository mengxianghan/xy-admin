<demo>
## 高级用法
带气泡卡片的例子。
</demo>

<template>
    <a-popover :overlay-inner-style="{ padding: 0 }">
        <template #content>
            <x-qrcode
                :value="text"
                :bordered="false" />
        </template>
        <img
            width="100"
            height="100"
            :src="assets('logo.svg')" />
    </a-popover>
</template>

<script setup>
import { ref } from 'vue'
import { assets } from '@/utils'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<style lang="less" scoped></style>
