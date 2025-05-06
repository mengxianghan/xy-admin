# Editor 富文本编辑器

## 代码演示

### 基础用法

<<< @/../src/views/components/editor/components/Basic.vue#snippet

### 内联编辑器

<<< @/../src/views/components/editor/components/Inline.vue#snippet

### 更多用法

:::tip 提示
基于 `TinyMCE` 实现，更多使用方式请参考官方文档。[https://www.tiny.cloud/docs/tinymce/6/basic-setup/](https://www.tiny.cloud/docs/tinymce/6/basic-setup/)
:::

## API

### Props

| 名称                 | 说明     | 类型      | 默认值  |
| -------------------- | -------- | --------- | ------- |
| model-value(v-model) | 内容     | `string`  | -       |
| option               | 配置     | `object`  | `{}`    |
| height               | 高       | `number`  | `300`   |
| placeholder          | 占位文本 | `string`  | -       |
| disabled             | 禁用     | `boolean` | `false` |

### Events

| 事件名      | 说明       | 返回值   |
| ----------- | ---------- | -------- |
| initialized | 初始化完成 | `editor` |
