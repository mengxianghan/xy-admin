<demo>
## 无边框
无边框
</demo>

<!-- #region snippet -->
<script setup></script>

<template>
  <a-space>
    <x-tag :bordered="false">
      爱在西元前
    </x-tag>
    <x-tag
      :bordered="false"
      type="success"
    >
      不该
    </x-tag>
    <x-tag
      :bordered="false"
      type="warning"
    >
      超人不会飞
    </x-tag>
    <x-tag
      :bordered="false"
      type="error"
    >
      手写的从前
    </x-tag>
    <x-tag
      :bordered="false"
      type="info"
    >
      哪里都是你
    </x-tag>
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
