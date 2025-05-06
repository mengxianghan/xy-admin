<demo>
## 基础用法
通过设置 directions，可以指定四条边中的哪几条边可以进行伸缩
</demo>

<!-- #region snippet -->
<script setup></script>

<template>
  <x-resize-box
    :directions="['right', 'bottom']"
    :height="200"
    :style="{ textAlign: 'center' }"
    :width="500"
  >
    <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
    <a-divider />
    <a-typography-paragraph>
      ByteDance's content platforms enable people to enjoy content powered by AI technology. We inform, entertain,
      and inspire people across language, culture and geography.
    </a-typography-paragraph>
    <a-divider>ByteDance</a-divider>
    <a-typography-paragraph>Yiming Zhang is the founder and CEO of ByteDance.</a-typography-paragraph>
  </x-resize-box>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
