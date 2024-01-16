<demo>
## 无边框
无边框
</demo>

<template>
    <a-space>
        <x-tag :bordered="false"> 爱在西元前 </x-tag>
        <x-tag
            type="success"
            :bordered="false">
            不该
        </x-tag>
        <x-tag
            type="warning"
            :bordered="false">
            超人不会飞
        </x-tag>
        <x-tag
            type="error"
            :bordered="false">
            手写的从前
        </x-tag>
        <x-tag
            type="info"
            :bordered="false">
            哪里都是你
        </x-tag>
    </a-space>
</template>

<script setup></script>

<style lang="less" scoped></style>
