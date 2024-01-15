<demo>
## 自定义描述文案（指令）
告诉别人你的想法
</demo>

<template>
    <a-alert
        v-loading="loading"
        data-loading-text="加载中"
        message="Alert message title"
        description="Further details about the context of this alert."></a-alert>
    <div class="mt-8-2">Loading state：<a-switch v-model:checked="loading"></a-switch></div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'DirectiveDescription',
})

const loading = ref(false)
</script>

<style lang="less" scoped></style>
