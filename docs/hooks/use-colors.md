# useColors

设定一个基础颜色，可以生成一个色板

## 代码演示

### 基础用法

```vue
<script setup>
import { useColors } from '@/hooks'

const { generate } = useColors()

const colors = generate('#1890ff')
console.log(colors) // ['#E6F7FF', '#BAE7FF', '#91D5FF', ''#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
</script>

<template>
  <div />
</template>

<style lang="less" scoped></style>
```

:::tip 提示
基于 `@ant-design/colors` 进行扩展，更多用法详见：[@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors)
:::

## API

### 返回值

| 参数     | 说明         | 类型                                   |
| -------- | ------------ | -------------------------------------- |
| generate | 生成色板函数 | `(color: string) => Array<string, 10>` |
