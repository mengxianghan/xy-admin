<demo>
## 折叠
实现高级搜索交互
</demo>

<!-- #region snippet -->
<script setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const collapsed = ref(true)
</script>

<template>
  <x-search
    :collapsed="collapsed"
    :collapsed-rows="1"
    :columns="3"
    :label-col="{ style: { width: '100px' } }"
  >
    <x-search-item label="规则名称">
      <a-input />
    </x-search-item>
    <x-search-item label="描述">
      <a-input />
    </x-search-item>
    <x-search-item label="服务调用次数">
      <a-input />
    </x-search-item>
    <x-search-item label="状态">
      <a-select />
    </x-search-item>
    <x-search-item label="上次调度时间">
      <a-date-picker />
    </x-search-item>
    <x-search-item suffix>
      <a-space>
        <a-button>重置</a-button>
        <a-button
          ghost
          type="primary"
        >
          查询
        </a-button>
        <a-typography-link @click="() => (collapsed = !collapsed)">
          <template v-if="collapsed">
            展开
            <down-outlined class="ml-4-1 fs-10" />
          </template>
          <template v-else>
            收起
            <up-outlined class="ml-4-1 fs-10" />
          </template>
        </a-typography-link>
      </a-space>
    </x-search-item>
  </x-search>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
