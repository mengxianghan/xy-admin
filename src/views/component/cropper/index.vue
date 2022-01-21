<template>
    <a-row :gutter="12">
        <a-col :span="12">
            <a-card>
                <x-cropper src="/images/avatar.jpg"
                           :aspect-ratio="aspectRatio"/>
            </a-card>
        </a-col>

        <a-col :span="12">
            <a-card title="参数和方法">
                <a-select v-model:value="aspectRatio"
                          style="width: 100px;">
                    <a-select-option :key="0">自由</a-select-option>
                    <a-select-option :key="1/1">1:1</a-select-option>
                    <a-select-option :key="4/3">4:3</a-select-option>
                    <a-select-option :key="16/9">16:9</a-select-option>
                </a-select>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'componentCropper',
    setup() {
        const aspectRatio = ref('')

        return {
            aspectRatio,
        }
    },
}
</script>

<style scoped>

</style>
