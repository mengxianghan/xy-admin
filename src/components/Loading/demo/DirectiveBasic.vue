<demo>
## 基础用法（指令）
当在卡片中使用时，它会实现你的需求
</demo>

<!-- #region snippet -->
<template>
    <a-alert
        v-loading="loading"
        description="Further details about the context of this alert."
        message="Alert message title"></a-alert>
    <div class="mt-8-2">
        Loading state：
        <a-switch v-model:checked="loading"></a-switch>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'DirectiveBasic',
})

const loading = ref(false)
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
