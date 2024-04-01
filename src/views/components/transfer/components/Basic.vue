<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<template>
    <x-transfer
        v-model="checkedKeys"
        :data-source="listData"
        :style="{ width: '680px' }"
        show-check-all>
    </x-transfer>
</template>

<script setup>
import { ref } from 'vue'

const listData = ref([
    {
        label: 'content 1',
        value: '1',
        children: [
            { label: 'content 1-1', value: '1-1' },
            { label: 'content 1-2', value: '1-2' },
        ],
    },
    {
        label: 'content 2',
        value: '2',
        children: [
            { label: 'content 2-1', value: '2-1' },
            { label: 'content 2-2', value: '2-2' },
        ],
    },
    {
        label: 'content 3',
        value: '3',
        disabled: true,
        children: [
            { label: 'content 3-1', value: '3-1' },
            { label: 'content 3-2', value: '3-2' },
        ],
    },
    {
        label: 'content 4',
        value: '4',
        checkable: false,
        children: [
            { label: 'content 4-1', value: '4-1' },
            { label: 'content 4-2', value: '4-2' },
        ],
    },
])
const checkedKeys = ref([])
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
