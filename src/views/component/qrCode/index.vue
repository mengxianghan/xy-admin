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
                           logo="images/logo.svg"></x-qr-code>
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
    </a-row>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'componentQrCode',
    setup() {
        const text = ref('admin')

        return {
            text,
        }
    },
}
</script>

<style scoped>

</style>
