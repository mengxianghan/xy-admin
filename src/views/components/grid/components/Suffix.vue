<demo>
## 折叠
折叠在响应式布局下依然生效。
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const gridCollapsed = ref(false)
const gridCollapsedRows = ref(1)
const gridItemCount = ref(4)
const showSuffix = ref(true)
</script>

<template>
  <x-grid :columns="2">
    <x-grid-item>
      <a-form-item label="数量">
        <a-input-number
          v-model:value="gridItemCount"
          :min="1"
        />
      </a-form-item>
    </x-grid-item>
    <x-grid-item>
      <a-form-item label="折叠后行数">
        <a-input-number
          v-model:value="gridCollapsedRows"
          :min="1"
        />
      </a-form-item>
    </x-grid-item>
    <x-grid-item>
      <a-form-item label="打开后缀节点">
        <a-switch v-model:checked="showSuffix" />
      </a-form-item>
    </x-grid-item>
    <x-grid-item>
      <a-form-item label="折叠栅格">
        <a-switch v-model:checked="gridCollapsed" />
      </a-form-item>
    </x-grid-item>
  </x-grid>

  <x-grid
    :collapsed="gridCollapsed"
    :collapsed-rows="gridCollapsedRows"
    :columns="5"
  >
    <x-grid-item
      v-for="i in gridItemCount"
      :key="i"
      :class="i % 2 ? 'green' : 'light-green'"
    >
      {{ i }}
    </x-grid-item>
    <x-grid-item
      v-if="showSuffix"
      #="{ overflow }"
      class="suffix"
      suffix
    >
      {{ overflow ? '存在溢出' : '不存在溢出' }}
    </x-grid-item>
  </x-grid>
</template>

<style lang="less" scoped>
.suffix {
  height: 108px;
  border: 1px solid #bae0ff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-green {
  height: 108px;
  background-color: #e6f4ff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.green {
  height: 108px;
  background-color: #bae0ff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<!-- #endregion snippet -->
