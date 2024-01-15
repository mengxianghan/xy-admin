<demo>
## 自定义尺寸
自定义尺寸
</demo>

<template>
    <a-space
        direction="vertical"
        :size="24">
        <a-button-group>
            <a-button @click="handleDecline">
                <template #icon><MinusOutlined /></template>
                small
            </a-button>
            <a-button @click="handleIncrease">
                <template #icon><PlusOutlined /></template>
                large
            </a-button>
        </a-button-group>

        <x-qrcode
            icon-background-color="#fff"
            :value="text"
            :icon="assets('logo.svg')"
            :size="size"></x-qrcode>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'
import { assets } from '@/utils'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'

const text = ref('http://xy-admin.xuanyunet.com')
const size = ref(160)

function handleDecline() {
    size.value = size.value - 10
    if (size.value < 48) {
        size.value = 48
    }
}
function handleIncrease() {
    size.value = size.value + 10
    if (size.value > 300) {
        size.value = 300
    }
}
</script>

<style lang="less" scoped></style>
