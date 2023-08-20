# ActionBar 操作条

## 示例

### 基础用法

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

<script setup>
</script>
```

### 支持扩展内容

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

<script setup>
</script>
```

### 卡片风格

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

<script setup>
</script>
```

## API

### 参数

| 名称      | 说明                           | 类型      | 默认值    |
| --------- | ------------------------------ | --------- | --------- |
| type      | 类型，可选：`default` `card`   | `string`  | `default` |
| hoverable | 鼠标移过时可浮起               | `boolean` | `false`   |
| bodyStyle | 内容区域自定义样式             | `object`  | `-`       |
| bordered  | 是否有边框，type='card' 时有效 | `boolean` | `true`    |

### 插槽

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 内容                 |
| extra   | 扩展内容，显示在右侧 |