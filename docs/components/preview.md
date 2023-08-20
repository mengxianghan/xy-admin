# Preview 预览

## 示例

### 基础用法

```vue
<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览图片</a-button>
    </div>
</template>

<script setup>
import { preview } from '@/components'

function handlePreview() {
    preview('http://cdn.xuanyunet.com/test/1.jpeg')
}
</script>
```

### 指定初始位置

```vue
<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览图片</a-button>
    </div>
</template>

<script setup>
import { preview } from '@/components'

function handlePreview() {
    preview({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/2.jpeg', 'http://cdn.xuanyunet.com/test/3.jpeg'],
        current: 1
    })
}
</script>
```

### 多种格式文件预览

```vue
<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览文件</a-button>
    </div>
</template>

<script setup>
import { preview } from '@/components'

function handlePreview() {
    preview({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/1.mp3', 'http://cdn.xuanyunet.com/test/1.mp4'],
    })
}
</script>
```

## API

### 参数

| 名称      | 说明                                | 类型       | 默认值 |
|---------|-----------------------------------|----------|-----|
| urls    | url 数组，支持 `image/*` `.mp3` `.mp4` | `array`  | `-` |
| current | 预览起始位置索引                          | `number` | `0` |
