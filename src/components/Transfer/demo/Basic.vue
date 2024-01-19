<demo>
## 基本用法
基本用法
</demo>

<template>
    <x-transfer
        v-model="checkedKeys"
        :data-source="listData"
        :style="{ width: '680px' }"
        :target-source="targetData"
        show-check-all>
    </x-transfer>
</template>

<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'

const listData = ref(getList())
const targetData = ref()
const checkedKeys = ref([])

function getList(length = 10) {
    return [...Array(length)].map(() => {
        const value = nanoid(5)
        return {
            label: value,
            value,
        }
    })
}
</script>

<style lang="less" scoped></style>
