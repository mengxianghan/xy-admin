<demo>
## 基本用法
基本用法
</demo>

<template>
    <x-grid
        :columns="4"
        :gutter="12">
        <x-grid-item :offset="1">
            <div class="light-green"></div>
        </x-grid-item>
        <x-grid-item :offset="1">
            <div class="green"></div>
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
