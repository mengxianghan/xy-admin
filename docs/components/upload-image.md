# UploadImage 上传图片

## 示例

### 基础用法

```vue
<template>
    <x-upload-image v-model="content"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```


### 自定义按钮内容

```vue
<template>
    <x-upload-image
        v-model="content"
        text="自定义标题">
        <template #icon>
            <picture-outlined></picture-outlined>
        </template>
    </x-upload-image>
</template>

<script setup>
import { ref } from 'vue'
import { PictureOutlined } from '@ant-design/icons-vue'

const content = ref('')
</script>

<style lang="less" scoped>

</style>
```


### 使用插槽

```vue
<template>
    <x-upload-image
        v-model="content"
        :width="240">
        <div class="custom">自定义插槽</div>
    </x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>

<style lang="less" scoped>
.custom {
    width: 240px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: @color-border dashed 1px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        border-color: @color-primary;
        color: @color-primary;
    }
}
</style>
```


### 开启裁剪

```vue
<template>
    <x-upload-image v-model="content"
                    text="开启裁剪"
                    cropper
                    :aspect-ratio="1"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```

### 圆角

```vue
<template>
    <x-upload-image v-model="content"
                    round
                    text="圆角"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```

### 批量上传（支持拖拽排序）

```vue
<template>
    <x-upload-image v-model="content"
                    multiple
                    drag-sort></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const content = ref([])
</script>
```

### 在表单中使用

```vue
<template>
    <a-form
        :label-col="{ style: { width: '100px' } }"
        :model="formData"
        :rules="formRules"
        ref="formRef">
        <a-form-item
            label="身份证"
            class="mb-0"
            required>
            <a-row :gutter="16">
                <a-col>
                    <a-form-item name="field1">
                        <x-upload-image
                            v-model="formData.field1"
                            text="人像面"
                            :width="191"></x-upload-image>
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item name="field2">
                        <x-upload-image
                            v-model="formData.field2"
                            text="国徽面"
                            :width="191"></x-upload-image>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form-item>
        <a-form-item
            label="其他凭证"
            name="field3">
            <x-upload-image v-model="formData.field3"></x-upload-image>
        </a-form-item>
        <a-form-item
            label="日期"
            name="field4">
            <a-date-picker v-model:value="formData.field4"></a-date-picker>
        </a-form-item>
        <a-form-item :style="{ paddingLeft: '100px' }">
            <a-space>
                <a-button
                    type="primary"
                    @click="handleSubmit">
                    提交
                </a-button>
                <a-button @click="handleReset">重置</a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>

<script setup>
import useForm from '@/hooks/useForm'

const { formData, formRules, formRef, resetForm } = useForm()

formRules.value = {
    field1: { required: true, message: '请上传人像面' },
    field2: { required: true, message: '请上传国徽面' },
    field5: { required: true, message: '请上传文件' },
};

function handleSubmit() {
    formRef.value
        .validate()
        .then((values) => {
            console.log(values)
        })
        .catch(() => {
        })
}

function handleReset() {
    resetForm()
}
</script>
```

## API

### 参数

| 名称          | 说明                                             | 类型                | 默认值            |
|-------------|------------------------------------------------|-------------------|----------------|
| v-model     | 当前输入的值                                         | `string` `array`  | `-`            |
| multiple    | 批量上传                                           | `boolean`         | `false`        |
| width       | 宽，单位：px                                        | `number`          | `120`          |
| height      | 高，单位：px                                        | `number`          | `120`          |
| icon        | 按钮图标                                           | `string`          | `PlusOutlined` |
| text        | 按钮文字                                           | `string`          | `-`            |
| maxSize     | 最大限制                                           | `string` `number` | `2M`           |
| accept      | 允许上传的文件类型                                      | `string`          | `image/*`      |
| disabled    | 是否禁用，禁用后无法上传，可以正常回显                            | `boolean`         | `false`        |
| round       | 是否圆角                                           | `boolean`         | `false`        |
| cropper     | 是否开启裁剪                                         | `boolean`         | `false`        |
| aspectRatio | 比例，开启裁剪时有效，详见 [Cropper](/components/cropper)   | `number`          | `0`            |
| quality     | 图片质量，开启裁剪时有效，详见 [Cropper](/components/cropper) | `number`          | `1`            |
| dragSort    | 拖拽排序，批量上传有效                                    | `boolean`         | `false`        |

### 插槽

| 名称   | 说明   | 默认值 |
|------|------|-----|
| icon | 按钮图标 | -   |
| text | 按钮文字 | -   |