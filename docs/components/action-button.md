# ActionButton 操作按钮


## 示例

### 基础用法
---

```vue
<template>
    <div>
        <x-action-button>编辑</x-action-button>
        <x-action-button>删除</x-action-button>
    </div>
</template>

<script setup>
</script>
```

### 自定义 `html` 标签

使用 a 标签渲染

```vue
<template>
    <div>
        <x-action-button tag="a">编辑</x-action-button>
        <x-action-button tag="a">删除</x-action-button>
    </div>
</template>

<script setup>
</script>
```

## API

### 参数

| 参数      | 说明      | 类型        | 默认值     |
|---------|---------|-----------|---------|
| tag     | 标签      | `string`  | `span`     |
| divider | 是否显示分割线 | `boolean` | `true` |
