<template>
    <a-row
        :gutter="16"
        class="align-center">
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="基础">
                <x-qr-code text="admin"></x-qr-code>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="带Logo">
                <x-qr-code
                    text="admin"
                    :logo="URL_LOGO"></x-qr-code>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="动态">
                <x-qr-code :text="text"></x-qr-code>
                <a-input
                    v-model:value="text"
                    class="mt-8-2"></a-input>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="完成方法">
                <x-qr-code
                    :text="text"
                    @ready="onReady"></x-qr-code>
                <div class="mt-8-1">状态：{{ status }}</div>
            </a-card>
        </a-col>
        <a-col :span="6">
            <a-card
                :bordered="false"
                title="自定义颜色/尺寸">
                <x-qr-code
                    text="admin"
                    :size="200"
                    color-dark="#1890ff"
                    color-light="#fff"></x-qr-code>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { ref } from 'vue'
import { URL_LOGO } from '@/config'

export default {
    name: 'componentQrCode',
    setup() {
        const text = ref('admin')
        const status = ref('生成中')

        function onReady() {
            status.value = '生成成功'
        }

        return {
            text,
            status,
            URL_LOGO,
            onReady,
        }
    },
}
</script>

<style lang="less" scoped></style>
