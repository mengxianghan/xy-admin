# ActionButton 操作按钮

## 何时使用

- 表格中的操作按钮，中间可以自动生成分割线

## 示例

### 基础用法
---
<div>
    <x-action-button>编辑</x-action-button>
    <x-action-button>删除</x-action-button>
</div>

:::details 代码示例

```vue

<template>
    <div>
        <x-action-button>编辑</x-action-button>
        <x-action-button>删除</x-action-button>
    </div>
</template>

<script>
export default {
    setup() {
        return {}
    }
}
</script>
```

:::

### 自定义 `html` 标签
---
使用 span 标签渲染

<div>
    <x-action-button tag="span">编辑</x-action-button>
    <x-action-button tag="span">删除</x-action-button>
</div>

:::details 代码示例

```vue

<template>
    <div>
        <x-action-button tag="span">编辑</x-action-button>
        <x-action-button tag="span">删除</x-action-button>
    </div>
</template>

<script>
export default {
    setup() {
        return {}
    }
}
</script>
```

:::

## API

### 参数

| 参数  | 说明  | 类型       | 默认值 |
|-----|-----|----------|-----|
| tag | 标签  | `string` | `a` |

<script setup>
import XActionButton from '@/components/ActionButton.vue';
</script>