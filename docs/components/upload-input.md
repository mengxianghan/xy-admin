# UploadInput 上传文件

## 代码演示

### 基础用法

<<< @/../src/components/Upload/demo/Input.vue#snippet

## API

### 参数

| 名称                | 说明           | 类型      | 默认值     |
| ------------------- | -------------- | --------- | ---------- |
| modelValue(v-model) |                | `string`  | `-`        |
| text                | 按钮内容       | `string`  | `选择文件` |
| loading-text        | 上传中按钮内容 | `string`  | `上传中`   |
| allow-clear         | 允许清空       | `boolean` | `true`     |

### 事件

| 名称   | 说明         | 返回值       |
| ------ | ------------ | ------------ |
| change | 内容发生改变 | `modelValue` |
