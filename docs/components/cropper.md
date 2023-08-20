# Cropper 图片裁剪

## 示例

```vue
<template>
    <a-card>
        <x-cropper
            :src="cropperImg"
            :aspect-ratio="aspectRatio"
            :quality="quality"
            ref="cropperRef"/>
    </a-card>
    <a-card
        title="参数和方法"
        class="mt-8-2">
        <a-form layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="缩放比例">
                        <a-select v-model:value="aspectRatio">
                            <a-select-option :key="0">自由</a-select-option>
                            <a-select-option :key="1 / 1">1:1</a-select-option>
                            <a-select-option :key="4 / 3">4:3</a-select-option>
                            <a-select-option :key="16 / 9">16:9</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        label="图像压缩率"
                        extra="取值范围 0~1">
                        <a-select v-model:value="quality">
                            <a-select-option :key="0.1">0.1</a-select-option>
                            <a-select-option :key="0.5">0.5</a-select-option>
                            <a-select-option :key="1">1</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-space>
                        <a-button @click="handleBase64">Base64</a-button>
                        <a-button @click="handleBlob">Blob</a-button>
                        <a-button @click="handleFile">File</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-form>
    </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { notification } from 'ant-design-vue'
import cropperImg from '@/views/component/cropper/images/cropper.png'

const cropperRef = ref()
const aspectRatio = ref(0)
const quality = ref(1)

async function handleBase64() {
    const data = await cropperRef.value.getBase64()
    notification.success({
        message: '获取成功',
        description: '请打开控制台查看获取到的内容',
    })
    console.log(data)
}

async function handleBlob() {
    const data = await cropperRef.value.getBlob()
    notification.success({
        message: '获取成功',
        description: '请打开控制台查看获取到的内容',
    })
    console.log(URL.createObjectURL(data))
}

async function handleFile() {
    const data = await cropperRef.value.getFile('test.jpg')
    notification.success({
        message: '获取成功',
        description: '请打开控制台查看获取到的内容',
    })
    console.log(URL.createObjectURL(data))
}
</script>
```

## API

### 参数

| 名称          | 说明                           | 类型       | 默认值 |
|-------------|------------------------------|----------|-----|
| src         | 图片地址                         | `string` | -   |
| aspectRatio | 比例，例如：`0` `1/1` `4/3` `16/9` | `number` | `0` |
| quality     | 输出质量，取值范围：`0-1`              | `number` | `1` |

### 事件

| 名称    | 说明    | 返回值                 |
|-------|-------|---------------------|
| ready | 初始化完成 | `function(cropper)` |

### 方法

| 名称        | 说明            | 返回值       |
|-----------|---------------|-----------|
| getBase64 | 获取 base64 字符串 | `Promise` |
| getFile   | 获取 File 对象    | `Promise` |
| getBlob   | 获取二进制对象       | `Promise` |

::: tip
1. 基于 `cropperjs` 实现，更多参数：[https://www.npmjs.com/package/cropperjs](https://www.npmjs.com/package/cropperjs)
2. 可根据实际业务场景自行扩展。详见：`/src/components/Cropper.vue`
:::

::: warning
`Cropper` 被 `CropperDialog` 、 `UploadImage` 引用 ，自行扩展后请检查相关组件可用性
:::
