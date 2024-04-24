<demo>
## 基础用法
只有内容超出后显示省略号
</demo>

<!-- #region snippet -->
<template>
    <div>
        <x-ellipsis>{{ content }}</x-ellipsis>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const content = ref(
    'XYAdmin 是一个中后台前端解决方案，基于 vue3.x 和 and-design-vue 实现。 使用最新的前端技术栈，提供丰富的组件，并持续性提供丰富的业务模板快速搭建企业级中后台前端项目。'
)
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
