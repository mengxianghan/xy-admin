<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<script setup></script>

<template>
  <x-search>
    <x-search-item>
      <a-input />
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
      </a-space>
    </x-search-item>
  </x-search>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
