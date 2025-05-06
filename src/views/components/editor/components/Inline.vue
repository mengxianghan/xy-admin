<demo>
## 内联编辑器
展示TinyMCE的内联编辑功能。
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const option = ref({
  inline: true,
})
</script>

<template>
  <x-editor :option="option" />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
