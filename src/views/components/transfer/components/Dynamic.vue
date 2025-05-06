<demo>
## 异步数据加载
动态加载数据。
</demo>

<!-- #region snippet -->
<script setup>
import apis from '@/apis'
import { Transfer as XTransfer } from '@/components'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import { ref } from 'vue'

const selectedRows = ref([])
const selectedKeys = ref([])
const transferRef = ref()
const { paginationState, listData } = usePagination()

function onLoadData(payload) {
  const { reload } = payload || {}
  if (reload) {
    listData.value = []
  }
  transferRef.value.showLoading()
  getList()
    .then((data) => {
      transferRef.value.hideLoading()
      const { records } = data
      listData.value.push(
        ...records.map(item => ({
          value: item.id,
          label: item.title,
        })),
      )
      if (listData.value.length >= 50) {
        transferRef.value.showFinished()
      }
    })
    .catch(() => {
      transferRef.value.showError()
    })
}

function getList() {
  return new Promise((resolve, reject) => {
    ;(async () => {
      const { code, data } = await apis.common
        .getPageList({
          page: paginationState.current,
          pageSize: paginationState.pageSize,
        })
        .catch((err) => {
          reject(err)
        })
      if (config('http.code.success') === code) {
        resolve(data)
      }
    })()
  })
}
</script>

<template>
  <x-transfer
    ref="transferRef"
    v-model="selectedKeys"
    v-model:selected-rows="selectedRows"
    :data-source="listData"
    :load-data="onLoadData"
    :style="{ width: '680px' }"
    show-check-all
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
