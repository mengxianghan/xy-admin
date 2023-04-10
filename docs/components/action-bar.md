# ActionBar 操作条

## 何时使用

- 当列表可以新增内容时
- 当列表需要简单搜索时

## 示例

### 基础用法
---
<x-action-bar>
    <a-button type="primary">
        <template #icon>
            <plus-outlined />
        </template>
        新增
    </a-button>
</x-action-bar>

:::details 代码示例

```vue

<template>
    <x-action-bar>
        <a-button type="primary">
            <template #icon>
                <plus-outlined/>
            </template>
            新增
        </a-button>
    </x-action-bar>
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

### 支持扩展内容
---
<x-action-bar>
    <a-button type="primary">
        <template #icon>
            <plus-outlined/>
        </template>
        新增
    </a-button>
    <template #extra>
        <a-input-search></a-input-search>
    </template>
</x-action-bar>

:::details 代码示例

```vue

<template>
    <x-action-bar>
        <a-button type="primary">
            <template #icon>
                <plus-outlined/>
            </template>
            新增
        </a-button>
        <template #extra>
            <a-input-search></a-input-search>
        </template>
    </x-action-bar>
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


### 卡片风格
---
<x-action-bar type="card" hoverable>
    <a-button type="primary">
        <template #icon>
            <plus-outlined/>
        </template>
        新增
    </a-button>
</x-action-bar>

:::details 代码示例

```vue

<template>
    <x-action-bar type="card" hoverable>
        <a-button type="primary">
            <template #icon>
                <plus-outlined/>
            </template>
            新增
        </a-button>
    </x-action-bar>
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

| 名称        | 说明                     | 类型        | 默认值       |
|-----------|------------------------|-----------|-----------|
| type      | 类型，可选：`default`、`card` | `string`  | `default` |
| hoverable | 鼠标移过时可浮起               | `boolean` | `false`   |
| bodyStyle | 内容区域自定义样式              | `object`  | `-`       |
| bordered  | 是否有边框，type='card' 时有效  | `boolean` | `true`    |

### 插槽

| 名称      | 说明         |
|---------|------------|
| default | 内容         |
| extra   | 扩展内容，显示在右侧 |

<script setup>
    import { PlusOutlined } from '@ant-design/icons-vue';
    import XActionBar from '@/components/ActionBar.vue';
</script>