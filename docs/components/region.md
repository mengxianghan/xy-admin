# Region 地区联动

## 示例

### 基础用法
---
<x-region v-model="value"></x-region>

::: details 代码示例

```vue

<template>
    <x-region v-model="value"></x-region>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const value = ref([])

        return {
            value
        }
    }
}
</script>
```

:::

### 内容回填
---
<x-region v-model="value1"></x-region>

::: details 代码示例

```vue

<template>
    <x-region v-model="value"></x-region>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const value = ref([1, 11, 111])

        return {
            value
        }
    }
}
</script>
```

:::

## 接口接入
::: tip
1. 高亮部分为数据请求逻辑，根据实际情况做调整
2. `getData` 方法中可根据 `level` 实现不同层级请求不同的接口来填充数据
3. `getRegionList` 请求数据的接口返回一个 `Promise`。节点数据结构：`{ label: '', value: '' }`
:::

[//]: # (::: details 代码示例)

[//]: # (<<< @/../src/components/region.vue{71-132,138-188 vue})

[//]: # (:::)

## API

### 参数

| 参数                  | 说明   | 类型       | 默认值  |
|---------------------|------|----------|------|
| modelValue(v-model) | 内容   | `array`  | `[]` |
| placeholder         | 占位文本 | `string` | -    |

### 事件

| 事件名    | 说明     | 返回值                              |
|--------|--------|----------------------------------|
| change | 选项发生改变 | function(value, selectedOptions) |

<script setup>
import { ref } from 'vue';

const value = ref([]);
const value1 = ref([1, 11, 111])
</script>