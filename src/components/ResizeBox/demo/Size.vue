<demo>
## 受控的高宽
`width` 和 `height` 都支持 `v-model`
</demo>

<template>
    <x-resize-box
        :directions="['right', 'bottom']"
        v-model:width="width"
        v-model:height="height"
        :style="{ textAlign: 'center' }">
        <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
        <a-divider />
        <a-typography-paragraph>
            ByteDance's content platforms enable people to enjoy content powered by AI technology. We inform, entertain,
            and inspire people across language, culture and geography.
        </a-typography-paragraph>
        <a-divider>ByteDance</a-divider>
        <a-typography-paragraph>Yiming Zhang is the founder and CEO of ByteDance.</a-typography-paragraph>
    </x-resize-box>

    <a-descriptions
        :column="1"
        class="mt-8-2">
        <a-descriptions-item label="width">{{ width }}</a-descriptions-item>
        <a-descriptions-item label="height">{{ height }}</a-descriptions-item>
    </a-descriptions>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(500)
const height = ref(200)
</script>

<style lang="less" scoped></style>
