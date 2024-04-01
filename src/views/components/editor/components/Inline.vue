<demo>
## 内联编辑器
展示TinyMCE的内联编辑功能。
</demo>

<!-- #region snippet -->
<template>
    <x-editor :option="option"></x-editor>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
    inline: true,
})
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
