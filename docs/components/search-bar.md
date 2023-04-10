# SearchBar 搜索条

## 示例

### 基础用法

```vue
<template>
    <x-search-bar>
        <a-form layout="inline">
            <a-row :gutter="16">
                <a-col :span="6">
                    <a-form-item label="关键字">
                        <a-input></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
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

<script>
export default {
    setup(){

        /**
         * 搜索
         */
        function handleSearch() {
            console.log('点击了搜索')
        }
        
        return {
            handleSearch
        }
    }
}
</script>
```

### 使用边框

```vue:line-numbers {2}
<template>
    <x-search-bar bordered>
        <a-form layout="inline">
            <a-row :gutter="16">
                <a-col :span="6">
                    <a-form-item label="关键字">
                        <a-input></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
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

<script>
export default {
    setup(){

        /**
         * 搜索
         */
        function handleSearch() {
            console.log('点击了搜索')
        }
        
        return {
            handleSearch
        }
    }
}
</script>
```

### 自定义样式

```vue
<template>
    <x-search-bar :body-style="{
        padding: '0'
    }">
        <a-form layout="inline">
            <a-row :gutter="16">
                <a-col :span="6">
                    <a-form-item label="关键字">
                        <a-input></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
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

<script>
export default {
    setup(){

        /**
         * 搜索
         */
        function handleSearch() {
            console.log('点击了搜索')
        }
        
        return {
            handleSearch
        }
    }
}
</script>
```


## API

### Props

| 名称        | 说明        | 类型                | 默认值       |
|-----------|-----------|-------------------|-----------|
| bodyStyle | 内容区域自定义样式 | `object`          | -         |
| bordered  | 是否有边框     | `boolean`         | `false`   | 
| size      | card 的尺寸  | `default`、`small` | `default` |

### Slots

| 名称      | 说明    | 参数  |
|---------|-------|-----|
| default | 自定义内容 | -   |
