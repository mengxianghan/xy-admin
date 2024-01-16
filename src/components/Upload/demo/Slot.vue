<demo>
## 插槽
插槽
</demo>

<template>
    <x-upload-image
        v-model="images"
        :width="240">
        <div class="custom">自定义插槽</div>
    </x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<style lang="less" scoped>
.custom {
    width: 240px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: @color-border dashed 1px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        border-color: @color-primary;
        color: @color-primary;
    }
}
</style>
