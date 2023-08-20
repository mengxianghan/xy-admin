# SearchBar 搜索条

## 示例

### 基础用法
```vue
<template>
    <x-search-bar bordered>
        <a-form layout="inline">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-form-item label="关键字">
                        <a-input></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="日期">
                        <a-date-picker></a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-button
                        type="primary"
                        ghost
                        @click="handleSearch">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </x-search-bar>
</template>

<script setup>
import { message } from 'ant-design-vue'
        
function handleSearch() {
    message.success('点击了搜索')
}
</script>
```

## API

### 参数

| 名称        | 说明        | 类型                | 默认值       |
|-----------|-----------|-------------------|-----------|
| bodyStyle | 内容区域自定义样式 | `object`          | -         |
| bordered  | 是否有边框     | `boolean`         | `false`   | 
| size      | card 的尺寸  | `default` `small` | `default` |

### 插槽

| 名称      | 说明    | 参数  |
|---------|-------|-----|
| default | 自定义内容 | -   |
