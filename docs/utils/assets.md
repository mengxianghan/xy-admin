# assets

```js :no-line-numbers
assets(url)
```

获取正确的文件路径

## 参数

| 名称 | 说明                  | 类型     | 默认值 |
| ---- |---------------------| -------- | ------ |
| url  | 相对 `assets` 目录的文件地址 | `string` | `-`    |

## 示例

### 基础用法

```vue
<template>
    <div>
        <img
            :src="assets('test.jpg')"
            alt="" />
    </div>
</template>

<script setup>
import { assets } from '@/utils'
</script>

<style lang="less" scoped></style>
```
