<demo>
## 基本用法
通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。
</demo>

<template>
    <x-scrollbar height="400px">
        <p
            v-for="item in 20"
            :key="item"
            class="scrollbar-demo-item">
            {{ item }}
        </p>
    </x-scrollbar>
</template>

<script setup></script>

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
