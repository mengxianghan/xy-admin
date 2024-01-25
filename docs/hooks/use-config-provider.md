# useConfigProvider

说它是个钩子，不如说它是个简易函数，没有入参，所有数据都是固定的，在使用 `createApp` 创建的组件时用它会更简单。

## 代码演示

### 基础用法

```vue
<template>
    <a-config-provider v-bind="configProviderAttrs">
        <div></div>
    </a-config-provider>
</template>

<script setup>
import { useConfigProvider } from '@/hooks'

const { configProviderAttrs } = useConfigProvider()
</script>

<style lang="less" scoped></style>
```
