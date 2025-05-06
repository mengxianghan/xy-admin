<demo>
## 文字提示
只有内容超出后才会显示文字提示，支持 `Tooltip` 组件的所有属性
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const content = ref(
  'XYAdmin 是一个中后台前端解决方案，基于 vue3.x 和 and-design-vue 实现。 使用最新的前端技术栈，提供丰富的组件，并持续性提供丰富的业务模板快速搭建企业级中后台前端项目。丰富的组件、业务模板快速制作页面；完整的鉴权体系和高精度权限控制；灵活布局方式，满足各种功能需求；完善的 API 管理，多服务请求快速切换；多功能视图标签、动态权限菜单、控制台组态化等等',
)
const lines = ref(2)
</script>

<template>
  <div>
    <div class="mb-8-2">
      <a-textarea v-model:value="content" />
    </div>

    <a-space
      block
      class="mb-8-2"
    >
      行数：<a-input-number v-model:value="lines" />
    </a-space>

    <x-ellipsis
      :line-clamp="lines"
      :title="content"
    >
      {{ content }}
    </x-ellipsis>
  </div>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
