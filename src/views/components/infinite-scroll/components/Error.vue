<demo>
## 错误提示
若列表数据加载失败，将 `error` 设置成 `true` 即可显示错误提示，用户点击错误提示后会重新触发 `load` 事件。
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const loading = ref(false)
const finished = ref(false)
const error = ref(true)

function loadData() {
  loading.value = true
  setTimeout(() => {
    count.value += 10
    loading.value = false

    if (count.value >= 40) {
      finished.value = true
    }
  }, 1000)
}
</script>

<template>
  <x-infinite-scroll
    v-model:error="error"
    v-model:loading="loading"
    :finished="finished"
    class="infinite"
    error-text="请求失败，点击重新加载"
    @load="loadData"
  >
    <div
      v-for="item in count"
      :key="item"
      class="infinite-item"
    >
      {{ item }}
    </div>
  </x-infinite-scroll>
</template>

<style lang="less" scoped>
.infinite {
  height: 400px;
}
.infinite-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: @control-item-bg-hover;
}
</style>
<!-- #endregion snippet -->
