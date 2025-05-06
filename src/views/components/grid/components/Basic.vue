<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<script setup></script>

<template>
  <x-grid
    :columns="4"
    :gutter="12"
  >
    <x-grid-item>
      <div class="light-green" />
    </x-grid-item>
    <x-grid-item>
      <div class="green" />
    </x-grid-item>
    <x-grid-item>
      <div class="light-green" />
    </x-grid-item>
    <x-grid-item>
      <div class="green" />
    </x-grid-item>
  </x-grid>
</template>

<style lang="less" scoped>
.light-green {
  height: 108px;
  background-color: #e6f4ff;
}

.green {
  height: 108px;
  background-color: #bae0ff;
}
</style>
<!-- #endregion snippet -->
