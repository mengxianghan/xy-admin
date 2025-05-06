# useConfigProvider

一个项目中多处使用 `createApp` 创建组件可保持风格统一。

## 代码演示

### 基础用法

```vue
<script setup>
import { useConfigProvider } from '@/hooks'

const { configProviderAttrs } = useConfigProvider()
</script>

<template>
  <a-config-provider v-bind="configProviderAttrs">
    <div />
  </a-config-provider>
</template>

<style lang="less" scoped></style>
```

## API

### 返回值

| 参数                | 说明                                                                                               | 类型                  |
| ------------------- | -------------------------------------------------------------------------------------------------- | --------------------- |
| configProviderAttrs | 配置信息，详见：[ConfigProvider 全局配置](https://www.antdv.com/components/config-provider-cn#api) | `ConfigProviderAttrs` |
