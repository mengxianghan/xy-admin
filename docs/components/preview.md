# Preview 预览

## 示例

### 基础用法
---
<a-button type="primary" ghost @click="handlePreview">预览图片</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览图片</a-button>
    </div>
</template>

<script>
import { preview } from '@/components'

export default {
    setup() {

        function handlePreview() {
            preview('http://cdn.xuanyunet.com/test/1.jpeg')
        }

        return {
            handlePreview
        }
    }
}
</script>
```

:::

### 指定初始位置
---
<a-button type="primary" ghost @click="handlePreview2">预览图片</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览图片</a-button>
    </div>
</template>

<script>
import { preview } from '@/components'

export default {
    setup() {

        function handlePreview() {
            preview({
                urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/2.jpeg', 'http://cdn.xuanyunet.com/test/3.jpeg'],
                current: 1
            })
        }

        return {
            handlePreview
        }
    }
}
</script>
```

:::

### 多种格式文件预览
---
<a-button type="primary" ghost @click="handlePreview3">预览文件</a-button>

::: details 代码示例

```vue

<template>
    <div>
        <a-button type="primary" ghost @click="handlePreview">预览文件</a-button>
    </div>
</template>

<script>
import { preview } from '@/components'

export default {
    setup() {

        function handlePreview() {
            preview({
                urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/1.mp3', 'http://cdn.xuanyunet.com/test/1.mp4'],
            })
        }

        return {
            handlePreview
        }
    }
}
</script>
```

:::

## API

### 参数

| 名称      | 说明                                | 类型       | 默认值 |
|---------|-----------------------------------|----------|-----|
| urls    | url 数组，支持 `image/*` `.mp3` `.mp4` | `array`  | `-` |
| current | 预览起始位置索引                          | `number` | `0` |

<script setup>
import preview from '@/components/Preview';

function handlePreview(){
    preview('http://cdn.xuanyunet.com/test/1.jpeg')
}

function handlePreview2(){
    preview({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/2.jpeg', 'http://cdn.xuanyunet.com/test/3.jpeg'],
        current: 1
    })
}

function handlePreview3(){
    preview({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg', 'http://cdn.xuanyunet.com/test/1.mp3', 'http://cdn.xuanyunet.com/test/1.mp4'],
    })
}
</script>