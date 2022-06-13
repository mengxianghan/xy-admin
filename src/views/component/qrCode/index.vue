<template>
    <a-row :gutter="16">
        <a-col :span="6">
            <a-card title="基础">
                <x-qr-code text="admin"></x-qr-code>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="带Logo">
                <x-qr-code text="admin"
                           :logo="LOGO_URL"></x-qr-code>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="自定义颜色大小">
                <x-qr-code text="admin"
                           :size="200"
                           color-dark="#1890ff"
                           color-light="#fff"></x-qr-code>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="动态">
                <x-qr-code :text="text"></x-qr-code>
                <a-input v-model:value="text"
                         class="mt-8-2"></a-input>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card title="完成方法">
                <x-qr-code :text="text"
                           @ready="onReady"></x-qr-code>
                <div class="mt-8-1">状态：{{ status }}</div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { ref } from 'vue'
import { LOGO_URL } from '@/config'

export default {
    name: 'componentQrCode',
    setup() {
        const text = ref('admin')
        const status = ref('生成中')

        function onReady() {
            status.value = '生成成功'
        }

        return {
            LOGO_URL,
            text,
            status,
            onReady
        }
    },
}
</script>

<style scoped>
</style>
