# useMenu

## 代码演示

### 设置徽标

```vue
<script setup>
import { useMenu } from '@/hooks'

const { setBadge } = useMenu()

function handleClick() {
  setBadge('home', 1)
}
</script>

<template>
  <div>
    <a-button
      type="primary"
      @click="handleClick"
    >
      设置徽标
    </a-button>
  </div>
</template>

<style lang="less" scoped></style>
```
