# UploadInput 上传文件

## 示例

### 基础用法

```vue
<template>
    <x-upload-input v-model="content"></x-upload-input>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```


### 自定义按钮内容

```vue
<template>
    <x-upload-input v-model="content"
                    btn-text="浏览"
                    loading-btn-text="正在上传"></x-upload-input>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```

## API

### 参数

| 名称             | 说明      | 类型        | 默认值    |
|----------------|---------|-----------|--------|
| v-model        | 当前输入的值  | `string`  | `-`    |
| btnText        | 按钮内容    | `string`  | `选择文件` |
| loadingBtnText | 上传中按钮内容 | `string`  | `上传中`  |
| allowClear     | 允许清空    | `boolean` | `true` |

### 事件

| 名称     | 说明     | 返回值               |
|--------|--------|-------------------|
| change | 内容发生改变 | `function(value)` |
