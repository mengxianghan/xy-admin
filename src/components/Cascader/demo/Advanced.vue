<demo>
## 高级用法
不同层级使用不同的数据接口。用于特殊场景的级联选择
</demo>

<!-- #region snippet -->
<template>
    <x-cascader
        v-model="selectedKeys"
        :level="3"
        :load-data="[getOptions, getOptions, getOptions]">
    </x-cascader>
</template>

<script setup>
import { ref } from 'vue'
import apis from '@/apis'

const selectedKeys = ref([])

async function getOptions() {
    return await apis.common.getOptions()
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
