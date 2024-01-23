<demo>
## 间隔
设定水平、垂直间隔。
</demo>

<template>
    <x-grid
        :columns="4"
        :gutter="[12, 8]">
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
    background-color: #e6f4ff;
}

.green {
    height: 108px;
    background-color: #bae0ff;
}
</style>
