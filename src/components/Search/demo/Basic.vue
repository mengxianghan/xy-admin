<demo>
## 基本用法
基本用法
</demo>

<template>
    <x-search :label-col="{ style: { width: '70px' } }">
        <x-search-item label="标题">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题2">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题3">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题4">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题5">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题5">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题5">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题5">
            <a-input></a-input>
        </x-search-item>
        <x-search-item label="标题5">
            <a-input></a-input>
        </x-search-item>
        <template #suffix>
            <a-space>
                <a-button
                    type="primary"
                    ghost>
                    搜索
                </a-button>
                <a-button>重置</a-button>
            </a-space>
        </template>
    </x-search>
</template>

<script setup></script>

<style lang="less" scoped></style>
