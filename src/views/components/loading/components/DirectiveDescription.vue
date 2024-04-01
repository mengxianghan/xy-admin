<demo>
## 自定义描述文案（指令）
告诉别人你的想法，使用 `loading-description-style` 可以定义说明文案的样式。
</demo>

<!-- #region snippet -->
<template>
    <a-alert
        v-loading="loading"
        description="Further details about the context of this alert."
        loading-description="加载中"
        loading-description-style="color: green;"
        message="Alert message title"></a-alert>
    <div class="mt-8-2">
        Loading state：
        <a-switch v-model:checked="loading"></a-switch>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'DirectiveDescription',
})

const loading = ref(false)
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
