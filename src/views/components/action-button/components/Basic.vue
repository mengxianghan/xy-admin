<demo>
## 基础用法
告别手动添加分割线，一切都是因为懒。不信你看👇
</demo>

<!-- #region snippet -->
<script setup>
import { message } from 'ant-design-vue'

/**
 * 点击
 * @param {string} msg
 */
function handleClick(msg) {
  message.info(msg)
}
</script>

<template>
  <div>
    <x-action-button @click="handleClick('点击了编辑')">
      编辑
    </x-action-button>
    <x-action-button @click="handleClick('点击了删除')">
      删除
    </x-action-button>
    <x-action-button
      disabled
      @click="handleClick('点击了禁用')"
    >
      禁用
    </x-action-button>
  </div>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
