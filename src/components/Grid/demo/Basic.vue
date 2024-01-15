<demo>
## 基本用法
基本用法
</demo>

<template>
    <x-grid
        :gutter="12"
        :columns="4">
        <x-grid-item>
            <div class="light-green" />
        </x-grid-item>
        <x-grid-item>
            <div class="green" />
        </x-grid-item>
        <x-grid-item>
            <div class="light-green" />
        </x-grid-item>
        <x-grid-item>
            <div class="green" />
        </x-grid-item>
    </x-grid>
</template>

<script setup></script>

<style lang="less" scoped>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}
</style>
