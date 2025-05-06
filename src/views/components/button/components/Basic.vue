<demo>
## 按钮类型
除支持 `ant design vue` 官方示例以外，还支持以上配置
</demo>

<!-- #region snippet -->
<script setup></script>

<template>
  <a-space>
    <x-button type="primary">
      主要按钮
    </x-button>
    <x-button
      color="success"
      type="primary"
    >
      成功按钮
    </x-button>
    <x-button>默认按钮</x-button>
    <x-button
      color="error"
      type="primary"
    >
      危险按钮
    </x-button>
    <x-button
      color="warning"
      type="primary"
    >
      警告按钮
    </x-button>
    <x-button
      color="#7232dd"
      type="primary"
    >
      单色按钮
    </x-button>
    <x-button
      color="#7232dd"
      ghost
      type="primary"
    >
      单色按钮
    </x-button>
    <x-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      type="primary"
    >
      渐变色按钮
    </x-button>
    <x-button
      color="#67e8f9"
      color-text="#000"
      type="primary"
    >
      自定义文本颜色
    </x-button>
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
