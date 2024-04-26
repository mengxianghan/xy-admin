<demo>
## 异步数据加载
动态加载数据。
</demo>

<!-- #region snippet -->
<template>
    <x-transfer
        v-model:selected-keys="selectedKeys"
        v-model:selected-rows="selectedRows"
        :data-source="listData"
        :load-data="onLoadData"
        :style="{ width: '680px' }"
        show-check-all>
    </x-transfer>
</template>

<script setup>
import { ref } from 'vue'
import apis from '@/apis'
import { config } from '@/config'
import { Transfer as XTransfer } from '@/components'

const listData = ref([])
const selectedRows = ref([])
const selectedKeys = ref([])

function onLoadData(selectedRow, { pagination, success, fail }) {
    if (pagination.current === 1) {
        listData.value = []
    }
    getList()
        .then((data) => {
            const { records } = data
            listData.value.push(
                ...records.map((item) => ({
                    value: item.id,
                    label: item.title,
                }))
            )
            success({ finished: listData.value.length >= 50 })
        })
        .catch(() => {
            fail()
        })
}

function getList() {
    return new Promise((resolve, reject) => {
        ;(async () => {
            const { code, data } = await apis.common.getPageList().catch(() => {
                reject()
            })
            if (config('http.code.success') === code) {
                resolve(data)
            }
        })()
    })
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
