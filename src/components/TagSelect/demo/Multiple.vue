<demo>
## 多选
多选
</demo>

<!-- #region snippet -->
<template>
    <x-tag-select
        v-model="selectedKeys"
        :options="options"
        multiple></x-tag-select>
</template>

<script setup>
import { ref } from 'vue'

const options = ref([
    { label: '类目1', value: 1 },
    { label: '类目2', value: 2 },
    { label: '类目3', value: 3 },
    { label: '类目4', value: 4 },
    { label: '类目5', value: 5 },
    { label: '类目6', value: 6 },
])
const selectedKeys = ref([])
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
