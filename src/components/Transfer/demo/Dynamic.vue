<demo>
## 异步数据加载
动态加载数据。
</demo>

<template>
    <x-transfer
        v-model="checkedKeys"
        :data-source="listData"
        :load-data="onLoadData"
        :style="{ width: '680px' }"
        :target-source="targetData"
        show-check-all>
    </x-transfer>
</template>

<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { findTree } from '@/utils'

const listData = ref([])
const targetData = ref()
const checkedKeys = ref([])

listData.value = getList()

function onLoadData({ value }) {
    if (!value) return
    const result = listData.value
    findTree(
        result,
        { value },
        (item) => {
            if (item.children) return
            item.children = getList().map((item, index) => ({
                ...item,
                isLeaf: index === 3,
                checkable: index < 5,
            }))
        },
        { key: 'value', children: 'children' }
    )
    listData.value = result
}

function getList(length = 20) {
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
