# UploadImage 上传图片

## 代码演示

### 基础用法

<<< @/../src/views/components/upload/components/Basic.vue#snippet

### 自定义文案

<<< @/../src/views/components/upload/components/Text.vue#snippet

### 插槽

<<< @/../src/views/components/upload/components/Slot.vue#snippet

### 裁剪

<<< @/../src/views/components/upload/components/Cropper.vue#snippet

### 圆角

<<< @/../src/views/components/upload/components/Round.vue#snippet

### 批量上传

<<< @/../src/views/components/upload/components/Multiple.vue#snippet

## API

### Props

| 参数                 | 说明                                                          | 类型              | 默认值    |
| -------------------- | ------------------------------------------------------------- | ----------------- | --------- |
| model-value(v-model) | 当前输入的值                                                  | `string` `array`  | -         |
| multiple             | 批量上传                                                      | `boolean`         | `false`   |
| width                | 宽，单位：px                                                  | `number`          | `120`     |
| height               | 高，单位：px                                                  | `number`          | `120`     |
| text                 | 按钮文字                                                      | `string`          | -         |
| maxSize              | 最大限制                                                      | `string` `number` | `2M`      |
| accept               | 允许上传的文件类型                                            | `string`          | `image/*` |
| disabled             | 是否禁用，禁用后无法上传，可以正常回显                        | `boolean`         | `false`   |
| round                | 是否圆角                                                      | `boolean`         | `false`   |
| cropper              | 是否开启裁剪                                                  | `boolean`         | `false`   |
| aspectRatio          | 比例，开启裁剪时有效，详见 [Cropper](/components/cropper)     | `number`          | `0`       |
| quality              | 图片质量，开启裁剪时有效，详见 [Cropper](/components/cropper) | `number`          | `1`       |
| draggable            | 拖拽，批量上传有效                                            | `boolean`         | `false`   |

### Events

| 事件名 | 说明         | 回调参数     |
| ------ | ------------ | ------------ |
| change | 内容发生改变 | `modelValue` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 上传按钮 |
| icon    | 按钮图标 |
| text    | 按钮文字 |
