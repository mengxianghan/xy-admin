# CropperDialog 图片裁剪弹窗

## 示例

### 基础用法

```vue
<template>
    <a-button type="primary" 
              ghost @click="handleOpen">打开弹窗</a-button>
    <x-cropper-dialog ref="cropperDialogRef" 
                      @ok="onOk"
                      @cancel="onCancel"></x-cropper-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const cropperDialogRef = ref()

function handleOpen(){
    cropperDialogRef.value.handleOpen('/images/login.png')
}

function onOk(file){
    message.success('点击了确定按钮')
    console.log(file)
}

function onCancel(){
    message.warning('点击了取消按钮')
}
</script>
```

## API

### 参数

| 名称          | 说明                           | 类型       | 默认值 |
|-------------|------------------------------|----------|-----|
| aspectRatio | 比例，例如：`0` `1/1` `4/3` `16/9` | `number` | `0` |
| quality     | 输出质量，取值范围：`0-1`              | `number` | `1` |

### 事件

| 名称     | 说明  | 返回值              |
|--------|-----|------------------|
| ok     | 确定  | `function(file)` |
| cancel | 取消  | -                |

### 方法

| 名称         | 说明   | 参数            |
|------------|------|---------------|
| handleOpen | 打开弹窗 | `src: string` |
