<demo>
## 手动滚动
通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。
</demo>

<!-- #region snippet -->
<template>
    <x-scrollbar
        ref="scrollbarRef"
        always
        height="400px"
        @initialized="onInitialized"
        @scroll="onScroll">
        <p
            v-for="item in 20"
            :key="item"
            class="scrollbar-demo-item">
            {{ item }}
        </p>
    </x-scrollbar>

    <a-slider
        v-model:value="value"
        :max="max"
        :tip-formatter="formatTip"
        class="mt-8-4"
        @change="onChange" />
</template>

<script setup>
import { ref } from 'vue'

const max = ref(0)
const value = ref(0)
const scrollbarRef = ref()

function onInitialized(instance) {
    max.value = instance.elements().content.scrollHeight - instance.elements().content.clientHeight
}

function onChange(value) {
    scrollbarRef.value.setScrollTop(value)
}

function onScroll(instance) {
    value.value = instance.elements().scrollEventElement.scrollTop
}

function formatTip(value) {
    return `${value} px`
}
</script>

<style lang="less" scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: @control-item-bg-hover;
}
</style>
<!-- #endregion snippet -->
