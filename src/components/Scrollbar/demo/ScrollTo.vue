<demo>
## 手动滚动
通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。
</demo>

<template>
    <x-scrollbar
        ref="scrollbarRef"
        height="400px"
        always
        @scroll="onScroll"
        @initialized="onInitialized">
        <p
            v-for="item in 20"
            :key="item"
            class="scrollbar-demo-item">
            {{ item }}
        </p>
    </x-scrollbar>

    <a-slider
        class="mt-8-4"
        v-model:value="value"
        :max="max"
        :tip-formatter="formatTip"
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
