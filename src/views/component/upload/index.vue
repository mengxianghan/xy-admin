<template>
    <a-row :gutter="16">
        <a-col>
            <a-card>
                <x-upload-image v-model="imageList"
                                :width="100"
                                :height="100"
                                text="上传图片"
                                multiple></x-upload-image>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'componentUpload',
    setup() {
        const imageList = ref(['/images/avatar.jpg'])

        return {
            imageList,
        }
    },
}
</script>

<style scoped>

</style>
