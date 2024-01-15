<demo>
## 纠错比例
通过设置 errorLevel 调整不同的容错等级
</demo>

<template>
    <a-space
        direction="vertical"
        :size="24">
        <x-qrcode
            :value="text"
            :error-level="level"></x-qrcode>
        <a-segmented
            v-model:value="level"
            :options="segmentedData" />
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
const segmentedData = ['L', 'M', 'Q', 'H']
const level = ref(segmentedData[0])
</script>

<style lang="less" scoped></style>
